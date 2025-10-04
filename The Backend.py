

# <<<<<database.py>>>>>

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "postgresql://user:password@localhost/flightdb"

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# <<<<<models.py>>>>>

from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime
from .db import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    auth0_id = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    preferences = relationship("FlightPreference", back_populates="owner")

class FlightPreference(Base):
    __tablename__ = "preferences"
    id = Column(Integer, primary_key=True, index=True)
    origin = Column(String)
    destination = Column(String)
    date = Column(String)
    seat_class = Column(String)
    budget = Column(Float)
    user_id = Column(Integer, ForeignKey("users.id"))

    owner = relationship("User", back_populates="preferences")


# <<<<<schemas.py>>>>>


from pydantic import BaseModel
from typing import Optional

class PreferenceBase(BaseModel):
    origin: str
    destination: str
    date: str
    seat_class: str
    budget: float

class PreferenceCreate(PreferenceBase):
    pass

class Preference(PreferenceBase):
    id: int
    user_id: int

    class Config:
        orm_mode = True

# <<<<<auth.py>>>>>

from fastapi import Depends, HTTPException, Security
from fastapi.security import HTTPBearer
from jose import jwt
import requests
import os

AUTH0_DOMAIN = os.getenv("AUTH0_DOMAIN")
API_AUDIENCE = os.getenv("AUTH0_AUDIENCE")
ALGORITHMS = ["RS256"]

token_auth_scheme = HTTPBearer()

def verify_jwt(token: str = Security(token_auth_scheme)):
    try:
        unverified_header = jwt.get_unverified_header(token.credentials)
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token header")

    jwks_url = f"https://{AUTH0_DOMAIN}/.well-known/jwks.json"
    jwks = requests.get(jwks_url).json()
    rsa_key = {}
    for key in jwks["keys"]:
        if key["kid"] == unverified_header["kid"]:
            rsa_key = {
                "kty": key["kty"],
                "kid": key["kid"],
                "use": key["use"],
                "n": key["n"],
                "e": key["e"],
            }
    if rsa_key:
        try:
            payload = jwt.decode(
                token.credentials,
                rsa_key,
                algorithms=ALGORITHMS,
                audience=API_AUDIENCE,
                issuer=f"https://{AUTH0_DOMAIN}/"
            )
            return payload
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail="Token expired")
        except jwt.JWTClaimsError:
            raise HTTPException(status_code=401, detail="Invalid claims")
        except Exception:
            raise HTTPException(status_code=401, detail="Invalid token")
    raise HTTPException(status_code=401, detail="Unable to find appropriate key")


# <<<<<routes/prefrences.py>>>>>

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from .. import models, schemas, db, auth

router = APIRouter(prefix="/preferences", tags=["preferences"])

@router.post("/", response_model=schemas.Preference)
def create_preference(pref: schemas.PreferenceCreate, 
                      user=Depends(auth.verify_jwt),
                      database: Session = Depends(db.get_db)):
    new_pref = models.FlightPreference(**pref.dict(), user_id=user["sub"])
    database.add(new_pref)
    database.commit()
    database.refresh(new_pref)
    return new_pref

# <<<<<main.py>>>>>

from fastapi import FastAPI
from .db import Base, engine
from .routes import preferences

# Create DB tables
Base.metadata.create_all(bind=engine)

app = FastAPI()

app.include_router(preferences.router)

@app.get("/")
def root():
    return {"message": "Flight Tracker API is running 🚀"}


