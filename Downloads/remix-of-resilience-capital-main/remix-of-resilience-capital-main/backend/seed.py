from database import SessionLocal, init_db, County, Vendor

def seed_data():
    init_db()
    db = SessionLocal()
    
    # Check if seeded
    if db.query(County).first():
        print("Database already seeded.")
        return
        
    print("Seeding database...")
    
    # Add Counties
    turkana = County(name="Turkana", drought_risk_score=0.73, climate_zone="Arid", historical_default_rate=0.25)
    kisumu = County(name="Kisumu", drought_risk_score=0.23, climate_zone="Tropical", historical_default_rate=0.12)
    nairobi = County(name="Nairobi", drought_risk_score=0.15, climate_zone="Temperate", historical_default_rate=0.10)
    
    db.add_all([turkana, kisumu, nairobi])
    db.commit()
    
    # Add Vendors
    james = Vendor(
        name="James Ochieng", business_name="Solar Solutions Turkana", 
        phone="+254700000001", mpesa_number="+254700000001",
        lat=3.119, lon=36.081, county_id=turkana.id,
        years_in_business=3.0, monthly_revenue=2500, shop_size_sqm=40
    )
    
    amina = Vendor(
        name="Amina Hassan", business_name="Lake Basin Solar", 
        phone="+254700000002", mpesa_number="+254700000002",
        lat=-0.102, lon=34.761, county_id=kisumu.id,
        years_in_business=5.0, monthly_revenue=4000, shop_size_sqm=80
    )
    
    declined_vendor = Vendor(
        name="Peter Njoroge", business_name="Nairobi Electronics", 
        phone="+254700000003", mpesa_number="+254700000003",
        lat=-1.292, lon=36.821, county_id=nairobi.id,
        years_in_business=0.5, monthly_revenue=300, shop_size_sqm=10
    )
    
    db.add_all([james, amina, declined_vendor])
    db.commit()
    
    print("Seeding complete.")

if __name__ == "__main__":
    seed_data()
