from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
import random
import uuid
import requests
from typing import Optional

from database import SessionLocal, init_db, Vendor, County, LoanApplication, RepaymentSchedule, ClimateDataCache, AdjustmentLog, ParametricPayout

app = FastAPI(title="Resilience Capital API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.on_event("startup")
def on_startup():
    init_db()

# --- Pydantic Models ---

class RiskCalculateRequest(BaseModel):
    vendor_id: Optional[int] = None
    lat: float
    lon: float
    business_data: dict

class ClimateForecastRequest(BaseModel):
    county_id: int
    days: int = 90

class LoanPricingRequest(BaseModel):
    principal: float
    interest_rate: float
    vendor_location: dict
    start_date: str

class DisburseRequest(BaseModel):
    loan_id: int
    amount: float
    mpesa_number: str

class RecalculateRequest(BaseModel):
    updated_drought_prob: float
    current_month: int = 3  # Default to March for demo

# --- Endpoints ---

@app.post("/api/v1/risk/calculate")
def calculate_risk(req: RiskCalculateRequest, db: Session = Depends(get_db)):
    vendor = None
    if req.vendor_id:
        vendor = db.query(Vendor).filter(Vendor.id == req.vendor_id).first()
        if not vendor:
            raise HTTPException(status_code=404, detail="Vendor not found")
    
    if vendor:
        business_score = min(vendor.years_in_business / 5.0, 1.0) * 30 + \
                         min(vendor.monthly_revenue / 1000.0, 1.0) * 40 + \
                         min(vendor.shop_size_sqm / 50.0, 1.0) * 30
    else:
        business_score = 75.0
    
    try:
        end_date = datetime.now().date()
        start_date = end_date - timedelta(days=90)
        url = f"https://archive-api.open-meteo.com/v1/archive?latitude={req.lat}&longitude={req.lon}&start_date={start_date.isoformat()}&end_date={end_date.isoformat()}&daily=precipitation_sum,soil_moisture_0_to_7cm&timezone=auto"
        res = requests.get(url, timeout=5)
        if res.status_code == 200:
            data = res.json()
            precip = data.get("daily", {}).get("precipitation_sum", [])
            soil = data.get("daily", {}).get("soil_moisture_0_to_7cm", [])
            avg_precip = sum([p for p in precip if p is not None]) / max(len(precip), 1)
            avg_soil = sum([s for s in soil if s is not None]) / max(len(soil), 1)
            climate_score = min(max((avg_precip * 5) + (avg_soil * 100), 40), 95)
        else:
            climate_score = 70.0
    except Exception:
        climate_score = 70.0
        
    trust_score = 82.0
    resilience_score = (business_score * 0.40) + (climate_score * 0.35) + (trust_score * 0.25)
    
    decision = "approve" if resilience_score >= 75 else "review" if resilience_score >= 50 else "decline"
    
    return {
        "score": round(resilience_score, 1),
        "decision": decision,
        "max_loan": req.business_data.get("requested_amount", 2000),
        "breakdown": {
            "business": round(business_score, 1),
            "climate": round(climate_score, 1),
            "trust": round(trust_score, 1)
        }
    }

@app.post("/api/v1/climate/forecast")
def climate_forecast(req: ClimateForecastRequest, db: Session = Depends(get_db)):
    county = db.query(County).filter(County.id == req.county_id).first()
    if not county:
        raise HTTPException(status_code=404, detail="County not found")
        
    lat = -1.2921 if county.name == "Nairobi" else 3.119 if county.name == "Turkana" else -0.1022 if county.name == "Kisumu" else 0.0
    lon = 36.8219 if county.name == "Nairobi" else 35.597 if county.name == "Turkana" else 34.7617 if county.name == "Kisumu" else 37.0
    
    try:
        url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&daily=precipitation_sum&forecast_days={req.days}&timezone=auto"
        res = requests.get(url, timeout=5)
        if res.status_code == 200:
            data = res.json()
            precip = data.get("daily", {}).get("precipitation_sum", [])
            total_precip = sum([p for p in precip if p is not None])
            drought_prob = max(0.0, 1.0 - (total_precip / (req.days * 2.0))) # simple heuristic
            risk_level = "critical" if drought_prob > 0.6 else "moderate" if drought_prob > 0.3 else "low"
            return {
                "drought_probability": round(drought_prob, 2),
                "risk_level": risk_level,
                "rainfall_predicted": round(total_precip, 1),
                "forecast_period": f"{req.days} days"
            }
    except Exception:
        pass
        
    return {
        "drought_probability": county.drought_risk_score,
        "risk_level": "moderate",
        "rainfall_predicted": 100.0,
        "forecast_period": f"{req.days} days"
    }

@app.post("/api/v1/loans/pricing")
def loan_pricing(req: LoanPricingRequest):
    # Simulated Adaptive Pricing Engine
    total_repayment = req.principal * (1 + req.interest_rate)
    base_monthly = total_repayment / 12
    
    schedule = []
    start_date = datetime.strptime(req.start_date, "%Y-%m-%d")
    
    for i in range(12):
        month_date = start_date + timedelta(days=30*i)
        
        # Simulate drought Jan-Feb, rainy Mar-May
        month_num = month_date.month
        
        if month_num in [1, 2]: # Jan, Feb
            adjustment = -0.30
            forecast = {"risk_level": "critical", "drought_probability": 0.73}
        elif month_num in [3, 4, 5]: # Mar, Apr, May
            adjustment = 0.40
            forecast = {"risk_level": "low", "drought_probability": 0.10}
        else:
            adjustment = 0.0
            forecast = {"risk_level": "moderate", "drought_probability": 0.30}
            
        adjusted_amount = base_monthly * (1 + adjustment)
        
        schedule.append({
            "month_number": i + 1,
            "due_date": month_date.strftime("%Y-%m-%d"),
            "base_amount": round(base_monthly, 2),
            "climate_adjustment": round(adjusted_amount - base_monthly, 2),
            "final_amount": round(adjusted_amount, 2),
            "climate_forecast": forecast,
            "status": "pending"
        })
        
    # Fix rounding errors on the last month to ensure exact sum
    total_adjusted = sum(m["final_amount"] for m in schedule)
    difference = total_repayment - total_adjusted
    schedule[-1]["final_amount"] = round(schedule[-1]["final_amount"] + difference, 2)
    schedule[-1]["climate_adjustment"] = round(schedule[-1]["climate_adjustment"] + difference, 2)
    
    return {"schedule": schedule, "total_repayment": round(total_repayment, 2)}

@app.post("/api/v1/payments/disburse")
def disburse_funds(req: DisburseRequest):
    # Simulated M-Pesa B2C
    tx_id = f"RC-{datetime.now().year}-{random.randint(100000, 999999)}"
    return {
        "transaction_id": tx_id,
        "status": "success",
        "timestamp": datetime.utcnow().isoformat(),
        "amount_disbursed": req.amount,
        "recipient": req.mpesa_number,
        "message": "Funds disbursed successfully via M-Pesa"
    }

@app.post("/api/v1/payments/collect")
def collect_payment(loan_id: int, amount: float):
    # Simulated auto-debit
    return {
        "status": "success",
        "message": f"Successfully collected {amount} for loan {loan_id}"
    }

@app.get("/api/v1/payments/status/{transaction_id}")
def check_status(transaction_id: str):
    return {
        "transaction_id": transaction_id,
        "status": "completed",
        "verified_at": datetime.utcnow().isoformat()
    }

@app.post("/api/v1/loans/{loan_id}/recalculate")
def recalculate_loan(loan_id: int, req: RecalculateRequest, db: Session = Depends(get_db)):
    # This is a simulated endpoint tailored for the hackathon demo flow.
    # In production, this would dynamically update the RepaymentSchedule rows.
    
    # 1. Recalculate next 3 months (March, April, May)
    # The prompt explicitly specifies these new values:
    march_original = 280
    march_new = 160
    april_original = 280
    april_new = 340
    may_original = 280
    may_new = 260
    
    amount_shifted = march_original - march_new
    
    # Simulate logging the adjustment
    adj_log = AdjustmentLog(
        loan_id=loan_id,
        reason=f"March drought probability increased to {int(req.updated_drought_prob * 100)}%",
        amount_shifted=amount_shifted
    )
    db.add(adj_log)
    
    # Check if cumulative adjustment > 15% of original total (Assume total is $2000)
    total_loan = 2000
    cumulative_adjustment = amount_shifted # simplified for demo
    
    parametric_triggered = False
    if cumulative_adjustment > (total_loan * 0.15) or amount_shifted >= 300: # Threshold
        payout = ParametricPayout(
            loan_id=loan_id,
            trigger_reason="Cumulative shift exceeded 15% tolerance",
            payout_amount=150.0
        )
        db.add(payout)
        parametric_triggered = True
        
    db.commit()
    
    sms_payload = "Forecast changed. March payment reduced. Total unchanged."
    
    return {
        "status": "success",
        "message": "Loan schedule recalculated dynamically.",
        "adjustments": [
            {"month": "March", "original": march_original, "new": march_new},
            {"month": "April", "original": april_original, "new": april_new},
            {"month": "May", "original": may_original, "new": may_new}
        ],
        "sms_sent": sms_payload,
        "parametric_triggered": parametric_triggered
    }

@app.post("/api/v1/data/update_manual")
def update_manual_data(db: Session = Depends(get_db)):
    # Hackathon endpoint for manual data update/sync
    # We'll just return a success to trigger UI refresh or log a fake sync.
    return {
        "status": "success",
        "message": "Data manually synchronized from external sources.",
        "timestamp": datetime.utcnow().isoformat()
    }

class STKPushRequest(BaseModel):
    phone_number: str
    amount: float
    account_reference: str = "ResilienceCapital"
    transaction_desc: str = "Loan Repayment"

@app.post("/api/v1/payments/stkpush")
def initiate_stk_push(req: STKPushRequest):
    # Simulated M-Pesa Daraja STK Push for Hackathon Demo
    # In a real scenario, this would call the Safaricom Daraja API
    checkout_request_id = f"ws_CO_{datetime.now().strftime('%d%m%Y%H%M%S')}{random.randint(100, 999)}"
    
    return {
        "status": "success",
        "MerchantRequestID": f"req_{random.randint(10000, 99999)}",
        "CheckoutRequestID": checkout_request_id,
        "ResponseCode": "0",
        "ResponseDescription": "Success. Request accepted for processing",
        "CustomerMessage": f"STK Push sent to {req.phone_number} for KES {req.amount}. Please enter PIN to process payment."
    }

@app.post("/api/v1/payments/stkpush/callback")
def stk_push_callback(payload: dict):
    # This is where M-Pesa would post the result of the STK push
    print("STK Push Callback Received:", payload)
    return {"ResultCode": 0, "ResultDesc": "Accepted"}
