package com.energy.energyplatform.model;

public class PredictionRequest {

    private double demand;
    private double supply;

    public PredictionRequest() {
    }

    public double getDemand() {
        return demand;
    }

    public void setDemand(double demand) {
        this.demand = demand;
    }

    public double getSupply() {
        return supply;
    }

    public void setSupply(double supply) {
        this.supply = supply;
    }
}