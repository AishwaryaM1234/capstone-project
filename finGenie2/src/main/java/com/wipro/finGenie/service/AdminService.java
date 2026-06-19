package com.wipro.finGenie.service;
 
import com.wipro.finGenie.dto.AdminDTO;
import com.wipro.finGenie.dto.AdminLoginDTO;
 
public interface AdminService {
 
    AdminDTO registerAdmin(AdminDTO dto);
 
    String loginAdmin(AdminLoginDTO dto);
}
