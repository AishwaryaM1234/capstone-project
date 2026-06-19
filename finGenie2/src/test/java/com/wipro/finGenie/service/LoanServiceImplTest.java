package com.wipro.finGenie.service;
 
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
 
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
 
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
 
import com.wipro.finGenie.dto.LoanDTO;
import com.wipro.finGenie.entity.Loan;
import com.wipro.finGenie.entity.User;
import com.wipro.finGenie.repository.LoanRepository;
import com.wipro.finGenie.repository.UserRepository;
import com.wipro.finGenie.serviceimpl.LoanServiceImpl;
 
@ExtendWith(MockitoExtension.class)
public class LoanServiceImplTest {
 
    @Mock
    private LoanRepository loanRepository;
 
    @Mock
    private UserRepository userRepository;
 
    @InjectMocks
    private LoanServiceImpl loanService;
 
    private User user;
    private Loan loan;
    private LoanDTO loanDTO;
 
    @BeforeEach
    void setUp() {
 
        user = new User();
        user.setUserId(1L);
 
        loanDTO = new LoanDTO();
        loanDTO.setUserId(1L);
        loanDTO.setLoanType("Home Loan");
        loanDTO.setAmount(500000.0);
        loanDTO.setSalary(50000.0);
        loanDTO.setCreditScore(750);
 
        loan = new Loan();
        loan.setLoanId(100L);
        loan.setLoanType("Home Loan");
        loan.setAmount(500000.0);
        loan.setSalary(50000.0);
        loan.setCreditScore(750);
        loan.setStatus("APPROVED");
        loan.setUser(user);
    }
 
    @Test
    void testApplyLoan() {
 
        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));
 
        when(loanRepository.save(any(Loan.class)))
                .thenReturn(loan);
 
        LoanDTO result = loanService.applyLoan(loanDTO);
 
        assertEquals(100L, result.getLoanId());
        assertEquals("APPROVED", result.getStatus());
    }
 
    @Test
    void testGetLoanById() {
 
        when(loanRepository.findById(100L))
                .thenReturn(Optional.of(loan));
 
        LoanDTO result = loanService.getLoanById(100L);
 
        assertEquals(100L, result.getLoanId());
        assertEquals("Home Loan", result.getLoanType());
        assertEquals("APPROVED", result.getStatus());
    }
 
    @Test
    void testGetAllLoans() {
 
        when(loanRepository.findAll())
                .thenReturn(Arrays.asList(loan));
 
        List<LoanDTO> result = loanService.getAllLoans();
 
        assertEquals(1, result.size());
        assertEquals("Home Loan",
                result.get(0).getLoanType());
    }
}
