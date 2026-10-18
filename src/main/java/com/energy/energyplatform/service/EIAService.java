package com.energy.energyplatform.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EIAService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${eia.api.key}")
    private String apiKey;

    public String getBrentCrudeData() {

        String url =
                "https://api.eia.gov/v2/petroleum/pri/spt/data/?api_key="
                        + apiKey;

        return restTemplate.getForObject(url, String.class);
    }

    public String getNaturalGasData() {

        String url =
                "https://api.eia.gov/v2/natural-gas/pri/fut/data/"
                        + "?api_key=" + apiKey
                        + "&frequency=weekly"
                        + "&data[0]=value"
                        + "&facets[series][]=RNGWHHD"
                        + "&sort[0][column]=period"
                        + "&sort[0][direction]=desc"
                        + "&offset=0"
                        + "&length=1";

        return restTemplate.getForObject(url, String.class);
    }
}