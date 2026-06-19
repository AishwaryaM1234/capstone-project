package com.wipro.finGenie.service;
 
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
 
import java.util.Optional;
 
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
 
import com.wipro.finGenie.dto.RegisterDTO;
import com.wipro.finGenie.entity.User;
import com.wipro.finGenie.repository.UserRepository;
import com.wipro.finGenie.security.JwtUtil;
import com.wipro.finGenie.serviceimpl.AuthServiceImpl;
 
@ExtendWith(MockitoExtension.class)
public class AuthServiceImplTest {
 
    @Mock
    private UserRepository userRepository;
 
    @Mock
    private JwtUtil jwtUtil;
 
    @InjectMocks
    private AuthServiceImpl authService;
 
    private User user;
    private RegisterDTO registerDTO;
 
    @BeforeEach
    void setUp() {
 
        registerDTO = new RegisterDTO();
        registerDTO.setFullName("Aishwarya");
        registerDTO.setEmail("aishu@gmail.com");
        registerDTO.setPassword("12345");
        registerDTO.setPhoneNumber("9876543210");
        registerDTO.setRole("USER");
 
        user = new User();
        user.setUserId(1L);
        user.setFullName("Aishwarya");
        user.setEmail("aishu@gmail.com");
        user.setPassword("12345");
        user.setPhoneNumber("9876543210");
        user.setRole("USER");
    }
 
    @Test
    void testRegister() {
 
        when(userRepository.existsByEmail(
                registerDTO.getEmail()))
                .thenReturn(false);
 
        when(userRepository.save(any(User.class)))
                .thenReturn(user);
 
        String result =
                authService.register(registerDTO);
 
        assertEquals(
                "User Registered Successfully",
                result);
    }
 
    @Test
    void testLogin() {
 
        when(userRepository.findByEmail(
                "aishu@gmail.com"))
                .thenReturn(Optional.of(user));
 
        when(jwtUtil.generateToken(
                "aishu@gmail.com"))
                .thenReturn("jwt-token");
 
        String token =
                authService.login(
                        "aishu@gmail.com",
                        "12345");
 
        assertEquals(
                "jwt-token",
                token);
    }
 
    @Test
    void testLoginInvalidPassword() {
 
        when(userRepository.findByEmail(
                "aishu@gmail.com"))
                .thenReturn(Optional.of(user));
 
        RuntimeException exception =
                assertThrows(
                        RuntimeException.class,
                        () -> authService.login(
                                "aishu@gmail.com",
                                "wrongpassword"));
 
        assertEquals(
                "Invalid Password",
                exception.getMessage());
    }
}