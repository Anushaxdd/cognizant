package com.cognizant.spring_learn.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cognizant.spring_learn.Country;

@Service
public class CountryService {

    public Country getCountry(String code) {

        List<Country> countries = Arrays.asList(
                new Country("IN", "India"),
                new Country("US", "United States"),
                new Country("DE", "Germany"),
                new Country("JP", "Japan")
        );

        for (Country country : countries) {
            if (country.getCode().equalsIgnoreCase(code)) {
                return country;
            }
        }

        return null;
    }
}