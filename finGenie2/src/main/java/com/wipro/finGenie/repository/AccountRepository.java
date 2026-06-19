package com.wipro.finGenie.repository;
 
import java.util.Optional;
 
import org.springframework.data.jpa.repository.JpaRepository;
 
import com.wipro.finGenie.entity.Account;
 
public interface AccountRepository
        extends JpaRepository<Account, Long> {
 
    Optional<Account> findByAccountNumber(String accountNumber);
}