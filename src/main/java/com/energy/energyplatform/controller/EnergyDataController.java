package com.energy.energyplatform.controller;

import com.energy.energyplatform.model.EnergyData;
import com.energy.energyplatform.model.PredictionResponse;
import com.energy.energyplatform.repository.EnergyDataRepository;
import com.energy.energyplatform.service.PredictionService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/energy")
@CrossOrigin(origins = "*")
public class EnergyDataController {

    @Autowired
    private EnergyDataRepository repository;

    @Autowired
    private PredictionService predictionService;

    // ADD ENERGY DATA + AI PREDICTION
    @PostMapping("/add")
    public Map<String, Object> addEnergyData(
            @RequestBody EnergyData energyData
    ) {

        // SAVE TO DATABASE
        EnergyData savedData =
                repository.save(energyData);

        // GET AI PREDICTION
        PredictionResponse prediction =
                predictionService.getPrediction(
                        energyData.getDemand(),
                        energyData.getSupply()
                );

        // FINAL RESPONSE
        Map<String, Object> response =
                new HashMap<>();

        response.put("saved_data", savedData);

        response.put(
                "predicted_consumption",
                prediction.getPredicted_consumption()
        );

        response.put(
                "crisis_severity",
                prediction.getCrisis_severity()
        );

        return response;
    }

    // GET ALL ENERGY DATA
    @GetMapping("/all")
    public List<EnergyData> getAllData() {
        return repository.findAll();
    }
}