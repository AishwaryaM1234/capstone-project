package com.wipro.finGenie.service;
 
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;
 
import java.util.Optional;
 
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
 
import com.wipro.finGenie.entity.User;
import com.wipro.finGenie.repository.UserRepository;
import com.wipro.finGenie.serviceimpl.AuthServiceImpl;
 
@ExtendWith(MockitoExtension.class)
public class AuthServiceImplTest {
 
    @Mock
    private UserRepository userRepository;
 
    @InjectMocks
    private AuthServiceImpl authService;
 
    @Test
    void testFindUserByEmail() {
 
        User user = new User();
        user.setEmail("test@gmail.com");
 
        when(userRepository.findByEmail("test@gmail.com"))
                .thenReturn(Optional.of(user));
 
        Optional<User> result =
                userRepository.findByEmail("test@gmail.com");
 
        assertNotNull(result);
    }
}
