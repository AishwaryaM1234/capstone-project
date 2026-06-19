package com.wipro.finGenie.service;
 
import java.util.List;
import com.wipro.finGenie.dto.UserDTO;
 
public interface UserService {
 
    UserDTO registerUser(UserDTO userDTO);
 
    UserDTO getUserById(Long userId);
 
    List<UserDTO> getAllUsers();
 
    UserDTO updateUser(Long userId, UserDTO userDTO);
 
    void deleteUser(Long userId);
}
