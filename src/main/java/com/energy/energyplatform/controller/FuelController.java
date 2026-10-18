package com.energy.energyplatform.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/fuel")
@CrossOrigin(origins = "*")
public class FuelController {

    private static final String API_KEY =
            "sk-live-O70D5VrzQtV8JmFA1bqC4DtLP3hpb7CeiWqWlOb9";

    @GetMapping("/cities")
    public Object getCities() {

        String url =
                "https://fuel.indianapi.in/cities";

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", API_KEY);

        HttpEntity<String> entity =
                new HttpEntity<>(headers);

        RestTemplate restTemplate =
                new RestTemplate();

        ResponseEntity<Object> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        Object.class
                );

        return response.getBody();
    }

    @GetMapping("/petrol/{city}")
    public Object getPetrolPrice(
            @PathVariable String city) {

        String url =
                "https://fuel.indianapi.in/live_fuel_price"
                        + "?fuel_type=petrol"
                        + "&location_type=city"
                        + "&location=" + city;

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", API_KEY);

        HttpEntity<String> entity =
                new HttpEntity<>(headers);

        RestTemplate restTemplate =
                new RestTemplate();

        ResponseEntity<List> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        List.class
                );

        List<Map<String, Object>> cities =
                response.getBody();

        if (cities == null) {
            return null;
        }

        for (Map<String, Object> item : cities) {

            String cityName =
                    item.get("city").toString();

           if (cityName.toLowerCase().contains(
        city.toLowerCase())) {

    return item;
}
        }

        return null;
    }

    @GetMapping("/diesel/{city}")
    public Object getDieselPrice(
            @PathVariable String city) {

        String url =
                "https://fuel.indianapi.in/live_fuel_price"
                        + "?fuel_type=diesel"
                        + "&location_type=city"
                        + "&location=" + city;

        HttpHeaders headers = new HttpHeaders();
        headers.set("x-api-key", API_KEY);

        HttpEntity<String> entity =
                new HttpEntity<>(headers);

        RestTemplate restTemplate =
                new RestTemplate();

        ResponseEntity<List> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        entity,
                        List.class
                );

        List<Map<String, Object>> cities =
                response.getBody();

        if (cities == null) {
            return null;
        }

        for (Map<String, Object> item : cities) {

            String cityName =
                    item.get("city").toString();

           if (cityName.toLowerCase().contains(
        city.toLowerCase())) {

    return item;
}
        }

        return null;
    }
}