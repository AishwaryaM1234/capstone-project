package com.wipro.finGenie.repository;
 
import java.util.List;
 
import org.springframework.data.jpa.repository.JpaRepository;
 
import com.wipro.finGenie.entity.ChatHistory;
 
public interface ChatHistoryRepository
        extends JpaRepository<ChatHistory, Long> {
 
    List<ChatHistory> findByUserUserId(Long userId);
}
