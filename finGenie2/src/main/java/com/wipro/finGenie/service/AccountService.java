package com.wipro.finGenie.service;
 
import java.util.List;
import com.wipro.finGenie.dto.AccountDTO;
 
public interface AccountService {
 
    AccountDTO createAccount(AccountDTO accountDTO);
 
    AccountDTO getAccountById(Long accountId);
 
    List<AccountDTO> getAllAccounts();
    
    AccountDTO updateAccount(Long accountId,AccountDTO accountDTO);
 
    void deleteAccount(Long accountId);
}
