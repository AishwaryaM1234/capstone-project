package com.wipro.finGenie.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;
 
import com.wipro.finGenie.entity.Transaction;
 
public interface TransactionRepository
        extends JpaRepository<Transaction, Long> {
 
    List<Transaction> findByAccountAccountId(Long accountId);
}
