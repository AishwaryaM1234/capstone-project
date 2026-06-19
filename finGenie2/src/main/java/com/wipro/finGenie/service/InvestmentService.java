package com.wipro.finGenie.service;
 
import java.util.List;
 
import com.wipro.finGenie.dto.InvestmentDTO;
 
public interface InvestmentService {
 
    InvestmentDTO saveInvestment(
            InvestmentDTO dto);
 
    InvestmentDTO getInvestmentById(
            Long investmentId);
 
    List<InvestmentDTO> getAllInvestments();
 
    InvestmentDTO updateInvestment(
            Long investmentId,
            InvestmentDTO dto);
 
    void deleteInvestment(
            Long investmentId);
}