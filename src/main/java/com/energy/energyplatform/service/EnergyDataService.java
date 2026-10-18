package com.energy.energyplatform.service;

import com.energy.energyplatform.model.EnergyData;
import com.energy.energyplatform.repository.EnergyDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnergyDataService {

    @Autowired
    private EnergyDataRepository energyDataRepository;

    // SAVE DATA
    public EnergyData saveEnergyData(EnergyData energyData) {
        return energyDataRepository.save(energyData);
    }

    // GET ALL DATA
    public List<EnergyData> getAllEnergyData() {
        return energyDataRepository.findAll();
    }

    // DELETE DATA
    public void deleteEnergyData(Long id) {
        energyDataRepository.deleteById(id);
    }

    // UPDATE DATA
    public EnergyData updateEnergyData(Long id, EnergyData updatedEnergyData) {

        EnergyData existingData = energyDataRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Energy Data Not Found"));

        existingData.setRegion(updatedEnergyData.getRegion());
        existingData.setEnergyConsumption(updatedEnergyData.getEnergyConsumption());
        existingData.setFuelPrice(updatedEnergyData.getFuelPrice());
        existingData.setDemand(updatedEnergyData.getDemand());
        existingData.setSupply(updatedEnergyData.getSupply());
        existingData.setCrisisSeverity(updatedEnergyData.getCrisisSeverity());

        return energyDataRepository.save(existingData);
    }
}