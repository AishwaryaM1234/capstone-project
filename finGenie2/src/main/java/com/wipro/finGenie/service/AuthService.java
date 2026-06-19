package com.wipro.finGenie.service;
 
import com.wipro.finGenie.dto.RegisterDTO;
 
public interface AuthService {
 
    String login(String email, String password);
 
    String register(RegisterDTO dto);
}