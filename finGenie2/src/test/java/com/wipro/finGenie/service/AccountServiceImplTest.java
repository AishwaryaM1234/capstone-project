package com.wipro.finGenie.service;
 
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
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
 
import com.wipro.finGenie.dto.AccountDTO;
import com.wipro.finGenie.entity.Account;
import com.wipro.finGenie.entity.User;
import com.wipro.finGenie.repository.AccountRepository;
import com.wipro.finGenie.repository.UserRepository;
import com.wipro.finGenie.serviceimpl.AccountServiceImpl;
 
@ExtendWith(MockitoExtension.class)
public class AccountServiceImplTest {
 
    @Mock
    private AccountRepository accountRepository;
 
    @Mock
    private UserRepository userRepository;
 
    @InjectMocks
    private AccountServiceImpl accountService;
 
    private User user;
    private Account account;
    private AccountDTO accountDTO;
 
    @BeforeEach
    void setUp() {
 
        user = new User();
        user.setUserId(1L);
 
        accountDTO = new AccountDTO();
        accountDTO.setUserId(1L);
        accountDTO.setAccountType("Savings");
        accountDTO.setBalance(5000.0);
 
        account = new Account();
        account.setAccountId(100L);
        account.setAccountNumber("ACC123");
        account.setAccountType("Savings");
        account.setBalance(5000.0);
        account.setUser(user);
    }
 
    @Test
    void testCreateAccount() {
 
        when(userRepository.findById(1L))
                .thenReturn(Optional.of(user));
 
        when(accountRepository.save(any(Account.class)))
                .thenReturn(account);
 
        AccountDTO result =
                accountService.createAccount(accountDTO);
 
        assertEquals("Savings",
                result.getAccountType());
 
        assertEquals(5000.0,
                result.getBalance());
 
        assertEquals(1L,
                result.getUserId());
    }
 
    @Test
    void testGetAccountById() {
 
        when(accountRepository.findById(100L))
                .thenReturn(Optional.of(account));
 
        AccountDTO result =
                accountService.getAccountById(100L);
 
        assertEquals(100L,
                result.getAccountId());
 
        assertEquals("Savings",
                result.getAccountType());
 
        assertEquals(5000.0,
                result.getBalance());
    }
 
    @Test
    void testGetAllAccounts() {
 
        List<Account> accounts =
                Arrays.asList(account);
 
        when(accountRepository.findAll())
                .thenReturn(accounts);
 
        List<AccountDTO> result =
                accountService.getAllAccounts();
 
        assertEquals(1,
                result.size());
 
        assertEquals("Savings",
                result.get(0).getAccountType());
    }
 
    @Test
    void testDeleteAccount() {
 
        when(accountRepository.findById(100L))
                .thenReturn(Optional.of(account));
 
        accountService.deleteAccount(100L);
 
        verify(accountRepository)
                .delete(account);
    }
 
    @Test
    void testUpdateAccount() {
 
        AccountDTO updateDTO =
                new AccountDTO();
 
        updateDTO.setAccountType("Current");
        updateDTO.setBalance(10000.0);
 
        when(accountRepository.findById(100L))
                .thenReturn(Optional.of(account));
 
        Account updated = new Account();
        updated.setAccountId(100L);
        updated.setAccountNumber("ACC123");
        updated.setAccountType("Current");
        updated.setBalance(10000.0);
        updated.setUser(user);
 
        when(accountRepository.save(any(Account.class)))
                .thenReturn(updated);
 
        AccountDTO result =
                accountService.updateAccount(
                        100L,
                        updateDTO);
 
        assertEquals("Current",
                result.getAccountType());
 
        assertEquals(10000.0,
                result.getBalance());
 
        assertEquals(1L,
                result.getUserId());
    }
}