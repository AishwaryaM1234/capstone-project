package com.wipro.finGenie.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;
 
import com.wipro.finGenie.entity.Investment;
 
public interface InvestmentRepository
        extends JpaRepository<Investment, Long> {
 
    List<Investment> findByUserUserId(Long userId);
}
