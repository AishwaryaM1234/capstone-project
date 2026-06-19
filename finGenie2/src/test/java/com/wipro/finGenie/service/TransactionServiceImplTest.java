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
 
import com.wipro.finGenie.dto.TransactionDTO;
import com.wipro.finGenie.entity.Account;
import com.wipro.finGenie.entity.Transaction;
import com.wipro.finGenie.repository.AccountRepository;
import com.wipro.finGenie.repository.FraudAlertRepository;
import com.wipro.finGenie.repository.TransactionRepository;
import com.wipro.finGenie.serviceimpl.TransactionServiceImpl;
 
@ExtendWith(MockitoExtension.class)
public class TransactionServiceImplTest {
 
    @Mock
    private TransactionRepository transactionRepository;
 
    @Mock
    private AccountRepository accountRepository;
 
    @Mock
    private FraudAlertRepository fraudAlertRepository;
 
    @InjectMocks
    private TransactionServiceImpl transactionService;
 
    private Account account;
    private Transaction transaction;
    private TransactionDTO transactionDTO;
 
    @BeforeEach
    void setUp() {
 
        account = new Account();
        account.setAccountId(1L);
 
        transactionDTO = new TransactionDTO();
        transactionDTO.setAccountId(1L);
        transactionDTO.setAmount(1000.0);
        transactionDTO.setTransactionType("DEPOSIT");
        transactionDTO.setDescription("Test Deposit");
 
        transaction = new Transaction();
        transaction.setTransactionId(100L);
        transaction.setAmount(1000.0);
        transaction.setTransactionType("DEPOSIT");
        transaction.setDescription("Test Deposit");
        transaction.setAccount(account);
    }
 
    @Test
    void testCreateTransaction() {
 
        when(accountRepository.findById(1L))
                .thenReturn(Optional.of(account));
 
        when(transactionRepository.save(any(Transaction.class)))
                .thenReturn(transaction);
 
        TransactionDTO result =
                transactionService.createTransaction(transactionDTO);
 
        assertEquals(100L,
                result.getTransactionId());
    }
 
    @Test
    void testGetTransactionById() {
 
        when(transactionRepository.findById(100L))
                .thenReturn(Optional.of(transaction));
 
        TransactionDTO result =
                transactionService.getTransactionById(100L);
 
        assertEquals(100L,
                result.getTransactionId());
 
        assertEquals("DEPOSIT",
                result.getTransactionType());
    }
 
    @Test
    void testGetAllTransactions() {
 
        when(transactionRepository.findAll())
                .thenReturn(Arrays.asList(transaction));
 
        List<TransactionDTO> result =
                transactionService.getAllTransactions();
 
        assertEquals(1,
                result.size());
 
        assertEquals("DEPOSIT",
                result.get(0).getTransactionType());
    }
}
