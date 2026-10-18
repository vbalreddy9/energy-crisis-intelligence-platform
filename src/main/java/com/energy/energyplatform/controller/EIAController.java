package com.energy.energyplatform.controller;

import com.energy.energyplatform.service.EIAService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/eia")
@CrossOrigin(origins = "*")
public class EIAController {

    @Value("${eia.api.key}")
    private String apiKey;

    @Autowired
    private EIAService eiaService;

    @GetMapping("/test")
    public String testAPI() {
        return "EIA Key Loaded Successfully: "
                + apiKey.substring(0, 5) + "...";
    }

    @GetMapping("/brent")
    public String getBrentData() {
        return eiaService.getBrentCrudeData();
    }

    @GetMapping("/natural-gas-price")
    public String getNaturalGasPrice() {
        return eiaService.getNaturalGasData();
    }
}