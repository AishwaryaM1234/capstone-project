package com.wipro.finGenie.dto;
 
import lombok.Data;
 
@Data
public class AdminDTO {
 
    private Long adminId;
    private String adminName;
    private String email;
    private String password;
}
