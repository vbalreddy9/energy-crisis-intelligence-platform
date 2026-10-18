package com.energy.energyplatform.model;

public class PredictionResponse {

    private double predicted_consumption;
    private String crisis_severity;

    public PredictionResponse() {
    }

    public double getPredicted_consumption() {
        return predicted_consumption;
    }

    public void setPredicted_consumption(double predicted_consumption) {
        this.predicted_consumption = predicted_consumption;
    }

    public String getCrisis_severity() {
        return crisis_severity;
    }

    public void setCrisis_severity(String crisis_severity) {
        this.crisis_severity = crisis_severity;
    }
}