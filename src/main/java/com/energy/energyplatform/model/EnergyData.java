package com.energy.energyplatform.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class EnergyData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String region;

    private double energyConsumption;

    private double fuelPrice;

    private double demand;

    private double supply;

    private String crisisSeverity;

    private LocalDateTime timestamp;

    public EnergyData() {
    }

    public Long getId() {
        return id;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }

    public double getEnergyConsumption() {
        return energyConsumption;
    }

    public void setEnergyConsumption(double energyConsumption) {
        this.energyConsumption = energyConsumption;
    }

    public double getFuelPrice() {
        return fuelPrice;
    }

    public void setFuelPrice(double fuelPrice) {
        this.fuelPrice = fuelPrice;
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

    public String getCrisisSeverity() {
        return crisisSeverity;
    }

    public void setCrisisSeverity(String crisisSeverity) {
        this.crisisSeverity = crisisSeverity;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
