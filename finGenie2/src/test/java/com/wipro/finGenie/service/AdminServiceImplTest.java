
package com.wipro.finGenie.service;
 
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
 
import java.util.Optional;
 
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
 
import com.wipro.finGenie.dto.AdminDTO;
import com.wipro.finGenie.dto.AdminLoginDTO;
import com.wipro.finGenie.entity.Admin;
import com.wipro.finGenie.repository.AdminRepository;
import com.wipro.finGenie.security.JwtUtil;
import com.wipro.finGenie.serviceimpl.AdminServiceImpl;
 
@ExtendWith(MockitoExtension.class)
class AdminServiceImplTest {
 
    @Mock
    private AdminRepository adminRepository;
 
    @Mock
    private JwtUtil jwtUtil;
 
    @InjectMocks
    private AdminServiceImpl adminService;
 
    @Test
    void registerAdmin_ShouldRegisterAdminSuccessfully() {
 
        AdminDTO dto = new AdminDTO();
        dto.setAdminName("Super Admin");
        dto.setEmail("admin@test.com");
        dto.setPassword("admin123");
 
        Admin savedAdmin = Admin.builder()
                .adminId(1L)
                .adminName("Super Admin")
                .email("admin@test.com")
                .password("admin123")
                .build();
 
        when(adminRepository.save(any(Admin.class)))
                .thenReturn(savedAdmin);
 
        AdminDTO result = adminService.registerAdmin(dto);
 
        assertNotNull(result);
        assertEquals(1L, result.getAdminId());
        assertEquals("Super Admin", result.getAdminName());
 
        verify(adminRepository, times(1))
                .save(any(Admin.class));
    }
 
    @Test
    void loginAdmin_ShouldReturnToken_WhenCredentialsValid() {
 
        Admin admin = Admin.builder()
                .adminId(1L)
                .adminName("Super Admin")
                .email("admin@test.com")
                .password("admin123")
                .build();
 
        AdminLoginDTO loginDTO = new AdminLoginDTO();
        loginDTO.setEmail("admin@test.com");
        loginDTO.setPassword("admin123");
 
        when(adminRepository.findByEmail("admin@test.com"))
                .thenReturn(Optional.of(admin));
 
        when(jwtUtil.generateToken("admin@test.com"))
                .thenReturn("jwt-token");
 
        String token =
                adminService.loginAdmin(loginDTO);
 
        assertEquals("jwt-token", token);
 
        verify(jwtUtil, times(1))
                .generateToken("admin@test.com");
    }
 
    @Test
    void loginAdmin_ShouldThrowException_WhenAdminNotFound() {
 
        AdminLoginDTO loginDTO = new AdminLoginDTO();
        loginDTO.setEmail("admin@test.com");
        loginDTO.setPassword("admin123");
 
        when(adminRepository.findByEmail("admin@test.com"))
                .thenReturn(Optional.empty());
 
        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> adminService.loginAdmin(loginDTO));
 
        assertEquals(
                "Admin not found",
                exception.getMessage());
    }
 
    @Test
    void loginAdmin_ShouldThrowException_WhenPasswordInvalid() {
 
        Admin admin = Admin.builder()
                .adminId(1L)
                .adminName("Super Admin")
                .email("admin@test.com")
                .password("correctPassword")
                .build();
 
        AdminLoginDTO loginDTO = new AdminLoginDTO();
        loginDTO.setEmail("admin@test.com");
        loginDTO.setPassword("wrongPassword");
 
        when(adminRepository.findByEmail("admin@test.com"))
                .thenReturn(Optional.of(admin));
 
        RuntimeException exception =
                assertThrows(RuntimeException.class,
                        () -> adminService.loginAdmin(loginDTO));
 
        assertEquals(
                "Invalid Password",
                exception.getMessage());
    }
}