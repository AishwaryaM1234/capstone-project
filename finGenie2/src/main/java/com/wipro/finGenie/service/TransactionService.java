package com.wipro.finGenie.service;
 
import java.util.List;
import com.wipro.finGenie.dto.TransactionDTO;
 
public interface TransactionService {
 
    TransactionDTO createTransaction(TransactionDTO dto);
 
    TransactionDTO getTransactionById(Long id);
 
    List<TransactionDTO> getAllTransactions();
}