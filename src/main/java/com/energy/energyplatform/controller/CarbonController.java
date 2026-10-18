package com.energy.energyplatform.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/carbon")
@CrossOrigin(origins = "*")
public class CarbonController {

    @GetMapping
    public Object getCarbonData() {

        String url =
            "https://api.carbonintensity.org.uk/intensity";

        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.getForObject(
                url,
                Object.class
        );
    }
}