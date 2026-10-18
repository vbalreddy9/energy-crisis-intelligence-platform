package com.energy.energyplatform.service;

import com.energy.energyplatform.model.PredictionRequest;
import com.energy.energyplatform.model.PredictionResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class PredictionService {

    @Autowired
    private RestTemplate restTemplate;

    private final String FASTAPI_URL =
            "http://127.0.0.1:8000/predict";

    public PredictionResponse getPrediction(
            double demand,
            double supply
    ) {

        PredictionRequest request =
                new PredictionRequest();

        request.setDemand(demand);
        request.setSupply(supply);

        PredictionResponse response =
                restTemplate.postForObject(
                        FASTAPI_URL,
                        request,
                        PredictionResponse.class
                );

        return response;
    }
}