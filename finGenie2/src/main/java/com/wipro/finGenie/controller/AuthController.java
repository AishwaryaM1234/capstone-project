package com.wipro.finGenie.controller;
 
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
 
import com.wipro.finGenie.dto.AuthResponseDTO;
import com.wipro.finGenie.dto.LoginDTO;
import com.wipro.finGenie.dto.RegisterDTO;
import com.wipro.finGenie.service.AuthService;
 
import lombok.RequiredArgsConstructor;
 
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
 
    private final AuthService authService;
 
    @PostMapping("/register")
    public ResponseEntity<String> register(
            @RequestBody RegisterDTO dto) {
 
        return ResponseEntity.ok(
                authService.register(dto));
    }
 
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @RequestBody LoginDTO loginDTO) {
 
        String token = authService.login(
                loginDTO.getEmail(),
                loginDTO.getPassword());
 
        AuthResponseDTO response =
                new AuthResponseDTO();
 
        response.setToken(token);
 
        return ResponseEntity.ok(response);
    }
}