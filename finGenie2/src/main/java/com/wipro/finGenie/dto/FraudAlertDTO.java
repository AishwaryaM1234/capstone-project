package com.wipro.finGenie.dto;

import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;

@Data
public class FraudAlertDTO {

    private Long fraudId;

    @PositiveOrZero(message = "Risk score must be zero or positive")
    private Double riskScore;

    private String remarks;

    private String status;

    private Long transactionId;
}