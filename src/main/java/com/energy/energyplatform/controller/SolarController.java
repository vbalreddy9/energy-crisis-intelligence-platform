package com.energy.energyplatform.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/solar")
@CrossOrigin(origins = "*")
public class SolarController {

    @GetMapping("/{city}")
    public Object getSolarData(@PathVariable String city) {

        double latitude;
        double longitude;

        switch (city.toLowerCase()) {

            case "hyderabad":
                latitude = 17.3850;
                longitude = 78.4867;
                break;

            case "warangal":
                latitude = 17.9689;
                longitude = 79.5941;
                break;

            case "delhi":
                latitude = 28.6139;
                longitude = 77.2090;
                break;

            case "mumbai":
                latitude = 19.0760;
                longitude = 72.8777;
                break;

            case "bangalore":
                latitude = 12.9716;
                longitude = 77.5946;
                break;

            case "kolkata":
    latitude = 22.5726;
    longitude = 88.3639;
    break;

case "pune":
    latitude = 18.5204;
    longitude = 73.8567;
    break;

case "ahmedabad":
    latitude = 23.0225;
    longitude = 72.5714;
    break;

case "jaipur":
    latitude = 26.9124;
    longitude = 75.7873;
    break;

case "lucknow":
    latitude = 26.8467;
    longitude = 80.9462;
    break;

case "bhopal":
    latitude = 23.2599;
    longitude = 77.4126;
    break;

case "patna":
    latitude = 25.5941;
    longitude = 85.1376;
    break;

case "visakhapatnam":
    latitude = 17.6868;
    longitude = 83.2185;
    break;

case "kochi":
    latitude = 9.9312;
    longitude = 76.2673;
    break;

            default:
                latitude = 17.3850;
                longitude = 78.4867;
        }

        String url =
                "https://api.open-meteo.com/v1/forecast"
                + "?latitude=" + latitude
                + "&longitude=" + longitude
                + "&hourly=shortwave_radiation";

        RestTemplate restTemplate = new RestTemplate();

        return restTemplate.getForObject(
                url,
                Object.class
        );
    }
}