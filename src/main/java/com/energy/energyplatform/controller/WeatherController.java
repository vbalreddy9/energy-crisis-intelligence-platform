package com.energy.energyplatform.controller;

import com.energy.energyplatform.service.WeatherService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/weather")
@CrossOrigin(origins = "*")
public class WeatherController {

    @Autowired
    private WeatherService weatherService;

    @GetMapping("/{city}")
    public String getWeather(
            @PathVariable String city
    ) {
        return weatherService.getWeather(city);
    }

    @GetMapping("/forecast/{city}")
    public String getForecast(
            @PathVariable String city
    ) {
        return weatherService.getForecast(city);
    }
}