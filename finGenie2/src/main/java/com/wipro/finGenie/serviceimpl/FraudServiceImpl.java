package com.wipro.finGenie.serviceimpl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.wipro.finGenie.dto.FraudAlertDTO;
import com.wipro.finGenie.entity.FraudAlert;
import com.wipro.finGenie.entity.Transaction;
import com.wipro.finGenie.repository.FraudAlertRepository;
import com.wipro.finGenie.repository.TransactionRepository;
import com.wipro.finGenie.service.FraudAlertService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FraudServiceImpl implements FraudAlertService {

    private final FraudAlertRepository fraudAlertRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public FraudAlertDTO saveFraudAlert(FraudAlertDTO dto) {

        Transaction txn = transactionRepository.findById(dto.getTransactionId())
                .orElseThrow(() -> new RuntimeException("Transaction not found"));

        FraudAlert entity = FraudAlert.builder()
                .riskScore(dto.getRiskScore())
                .remarks(dto.getRemarks())
                .status(dto.getStatus())
                .transaction(txn)
                .build();

        FraudAlert savedEntity = fraudAlertRepository.save(entity);

        dto.setFraudId(savedEntity.getFraudId());

        return dto;
    }

    @Override
    public List<FraudAlertDTO> getAllFraudAlerts() {

        List<FraudAlert> alertList = fraudAlertRepository.findAll();

        return alertList.stream()
                .map(alert -> {
                    FraudAlertDTO response = new FraudAlertDTO();

                    response.setFraudId(alert.getFraudId());
                    response.setRiskScore(alert.getRiskScore());
                    response.setRemarks(alert.getRemarks());
                    response.setStatus(alert.getStatus());

                    if (alert.getTransaction() != null) {
                        response.setTransactionId(
                                alert.getTransaction().getTransactionId());
                    }

                    return response;
                })
                .toList();
    }
}