package com.wipro.finGenie.serviceimpl;
 
import org.springframework.stereotype.Service;
 
import com.wipro.finGenie.dto.AdminDTO;
import com.wipro.finGenie.dto.AdminLoginDTO;
import com.wipro.finGenie.entity.Admin;
import com.wipro.finGenie.repository.AdminRepository;
import com.wipro.finGenie.security.JwtUtil;
import com.wipro.finGenie.service.AdminService;
 
import lombok.RequiredArgsConstructor;
 
@Service
@RequiredArgsConstructor
public class AdminServiceImpl
        implements AdminService {
 
    private final AdminRepository adminRepository;
    private final JwtUtil jwtUtil;
 
    @Override
    public AdminDTO registerAdmin(AdminDTO dto) {
 
        Admin admin = Admin.builder()
                .adminName(dto.getAdminName())
                .email(dto.getEmail())
                .password(dto.getPassword())
                .build();
 
        Admin saved =
                adminRepository.save(admin);
 
        dto.setAdminId(saved.getAdminId());
 
        return dto;
    }
 
    @Override
    public String loginAdmin(
            AdminLoginDTO dto) {
 
        Admin admin =
                adminRepository.findByEmail(
                        dto.getEmail())
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Admin not found"));
 
        if (!admin.getPassword()
                .equals(dto.getPassword())) {
 
            throw new RuntimeException(
                    "Invalid Password");
        }
 
        return jwtUtil.generateToken(
                admin.getEmail());
    }
}
