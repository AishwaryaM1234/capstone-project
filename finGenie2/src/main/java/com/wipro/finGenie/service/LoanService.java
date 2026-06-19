package com.wipro.finGenie.service;
 
import java.util.List;
import com.wipro.finGenie.dto.LoanDTO;
 
public interface LoanService {
 
    LoanDTO applyLoan(LoanDTO loanDTO);
 
    LoanDTO getLoanById(Long loanId);
 
    List<LoanDTO> getAllLoans();
}
