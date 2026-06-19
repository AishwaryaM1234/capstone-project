package com.wipro.finGenie.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.finGenie.dto.AdminDTO;
import com.wipro.finGenie.dto.AdminLoginDTO;
import com.wipro.finGenie.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminService adminService;

    @PostMapping("/register")
    public ResponseEntity<AdminDTO> registerAdmin(@RequestBody AdminDTO dto) {

        AdminDTO registeredAdmin = adminService.registerAdmin(dto);

        return ResponseEntity.ok(registeredAdmin);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginAdmin(@RequestBody AdminLoginDTO dto) {

        String response = adminService.loginAdmin(dto);

        return ResponseEntity.ok(response);
    }
}
