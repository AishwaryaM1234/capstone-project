package com.wipro.finGenie.service;
 
import java.util.List;
import com.wipro.finGenie.dto.FraudAlertDTO;
 
public interface FraudAlertService {
 
    FraudAlertDTO saveFraudAlert(
            FraudAlertDTO dto);
 
    List<FraudAlertDTO> getAllFraudAlerts();
}