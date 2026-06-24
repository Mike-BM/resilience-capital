from sqlalchemy import create_engine, Column, Integer, String, Float, DateTime, ForeignKey, JSON
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime
import os

DATABASE_URL = "sqlite:///./resilience.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

class County(Base):
    __tablename__ = "counties"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    country = Column(String, default="Kenya")
    drought_risk_score = Column(Float)
    climate_zone = Column(String)
    historical_default_rate = Column(Float)

class Vendor(Base):
    __tablename__ = "vendors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    business_name = Column(String)
    phone = Column(String)
    mpesa_number = Column(String)
    farmer_id = Column(String)
    national_id = Column(String)
    lat = Column(Float)
    lon = Column(Float)
    county_id = Column(Integer, ForeignKey("counties.id"))
    years_in_business = Column(Float)
    monthly_revenue = Column(Float)
    shop_size_sqm = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    county = relationship("County")

class LoanApplication(Base):
    __tablename__ = "loan_applications"
    id = Column(Integer, primary_key=True, index=True)
    vendor_id = Column(Integer, ForeignKey("vendors.id"))
    amount_requested = Column(Float)
    purpose = Column(String)
    status = Column(String) # approved, review, declined
    risk_score = Column(Float)
    climate_adjustment_factor = Column(Float)
    approved_at = Column(DateTime, nullable=True)
    disbursed_at = Column(DateTime, nullable=True)

    vendor = relationship("Vendor")

class RepaymentSchedule(Base):
    __tablename__ = "repayment_schedules"
    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, ForeignKey("loan_applications.id"))
    month_number = Column(Integer)
    due_date = Column(DateTime)
    base_amount = Column(Float)
    climate_adjustment = Column(Float)
    final_amount = Column(Float)
    status = Column(String, default="pending")
    climate_forecast_at_creation = Column(JSON)

class ClimateDataCache(Base):
    __tablename__ = "climate_data_cache"
    id = Column(Integer, primary_key=True, index=True)
    county_id = Column(Integer, ForeignKey("counties.id"))
    forecast_date = Column(DateTime)
    drought_probability = Column(Float)
    rainfall_mm_predicted = Column(Float)
    soil_moisture_index = Column(Float)
    vegetation_index = Column(Float)
    cached_at = Column(DateTime, default=datetime.utcnow)

class AdjustmentLog(Base):
    __tablename__ = "adjustment_logs"
    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, ForeignKey("loan_applications.id"))
    reason = Column(String)
    amount_shifted = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

class ParametricPayout(Base):
    __tablename__ = "parametric_payouts"
    id = Column(Integer, primary_key=True, index=True)
    loan_id = Column(Integer, ForeignKey("loan_applications.id"))
    trigger_reason = Column(String)
    payout_amount = Column(Float)
    timestamp = Column(DateTime, default=datetime.utcnow)

def init_db():
    Base.metadata.create_all(bind=engine)
