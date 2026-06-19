package com.wipro.finGenie.repository;
 
import org.springframework.data.jpa.repository.JpaRepository;
 
import com.wipro.finGenie.entity.FraudAlert;
 
public interface FraudAlertRepository
        extends JpaRepository<FraudAlert, Long> {
 
}
