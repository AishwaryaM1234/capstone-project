package com.wipro.finGenie.serviceimpl;
 
import java.time.LocalDateTime;
 
import org.springframework.stereotype.Service;
 
import com.wipro.finGenie.dto.RegisterDTO;
import com.wipro.finGenie.entity.User;
import com.wipro.finGenie.repository.UserRepository;
import com.wipro.finGenie.security.JwtUtil;
import com.wipro.finGenie.service.AuthService;
 
import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
 
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;
 
    @Override
    public String register(RegisterDTO dto) {
     
        System.out.println("========== REGISTER REQUEST ==========");
        System.out.println("FULL NAME = " + dto.getFullName());
        System.out.println("EMAIL = " + dto.getEmail());
        System.out.println("PHONE = " + dto.getPhoneNumber());
        System.out.println("ROLE = " + dto.getRole());
     
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }
     
        User user = User.builder()
                .fullName(dto.getFullName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .phoneNumber(dto.getPhoneNumber())
                .role(dto.getRole())
                .active(true)
                .createdAt(LocalDateTime.now())
                .build();
     
        userRepository.save(user);
     
        return "User Registered Successfully";
    }
 
    @Override
    public String login(String email, String password) {
 
        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));
 
        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid Password");
        }
 
        return jwtUtil.generateToken(user.getEmail());
    }
}