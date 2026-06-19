package com.wipro.finGenie.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.finGenie.dto.FraudAlertDTO;
import com.wipro.finGenie.service.FraudAlertService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/fraud")
@RequiredArgsConstructor
public class FraudAlertController {

    private final FraudAlertService fraudAlertService;

    @PostMapping
    public ResponseEntity<FraudAlertDTO> saveFraudAlert(@Valid @RequestBody FraudAlertDTO dto) {

        FraudAlertDTO savedAlert = fraudAlertService.saveFraudAlert(dto);

        return ResponseEntity.ok(savedAlert);
    }

    @GetMapping
    public ResponseEntity<List<FraudAlertDTO>> getAllFraudAlerts() {

        List<FraudAlertDTO> alertList = fraudAlertService.getAllFraudAlerts();

        return ResponseEntity.ok(alertList);
    }
}