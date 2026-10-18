package com.energy.energyplatform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class WeatherService {

    @Autowired
    private RestTemplate restTemplate;

    private final String API_KEY = "571f1ef061c6e91875164167b2094e11";

    public String getWeather(String city) {

        String url =
                "https://api.openweathermap.org/data/2.5/weather?q="
                        + city
                        + "&appid="
                        + API_KEY
                        + "&units=metric";

        return restTemplate.getForObject(url, String.class);
    }

    public String getForecast(String city) {

        String url =
                "https://api.openweathermap.org/data/2.5/forecast?q="
                        + city
                        + "&appid="
                        + API_KEY
                        + "&units=metric";

        return restTemplate.getForObject(url, String.class);
    }
}