from fastapi import FastAPI
from pydantic import BaseModel
from sklearn.ensemble import RandomForestRegressor
import numpy as np

app = FastAPI()

# TRAINING DATA
X = np.array([
    [500, 300],
    [700, 400],
    [900, 500],
    [1200, 700],
    [1500, 900]
])

y = np.array([200, 300, 400, 500, 600])

# TRAIN MODEL
model = RandomForestRegressor()
model.fit(X, y)

# REQUEST MODEL
class EnergyInput(BaseModel):
    demand: float
    supply: float

# HOME API
@app.get("/")
def home():
    return {
        "message": "AI Prediction Service Running"
    }

# PREDICTION API
@app.post("/predict")
def predict(data: EnergyInput):

    prediction = model.predict([
        [data.demand, data.supply]
    ])

    predicted_consumption = float(prediction[0])

    crisis = "LOW"

    if data.demand > data.supply:
        crisis = "HIGH"

    return {
        "predicted_consumption": predicted_consumption,
        "crisis_severity": crisis
    }