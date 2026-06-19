package com.wipro.finGenie.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.finGenie.dto.*;
import com.wipro.finGenie.service.*;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {

    private final UserService userService;
    private final AccountService accountService;
    private final TransactionService transactionService;
    private final LoanService loanService;
    private final InvestmentService investmentService;
    private final FraudAlertService fraudAlertService;

    @GetMapping("/users")
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        List<UserDTO> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/accounts")
    public ResponseEntity<List<AccountDTO>> getAllAccounts() {
        List<AccountDTO> accounts = accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/transactions")
    public ResponseEntity<List<TransactionDTO>> getAllTransactions() {
        List<TransactionDTO> transactions = transactionService.getAllTransactions();
        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/loans")
    public ResponseEntity<List<LoanDTO>> getAllLoans() {
        List<LoanDTO> loans = loanService.getAllLoans();
        return ResponseEntity.ok(loans);
    }

    @GetMapping("/investments")
    public ResponseEntity<List<InvestmentDTO>> getAllInvestments() {
        List<InvestmentDTO> investments = investmentService.getAllInvestments();
        return ResponseEntity.ok(investments);
    }

    @GetMapping("/fraud-alerts")
    public ResponseEntity<List<FraudAlertDTO>> getAllFraudAlerts() {
        List<FraudAlertDTO> alerts = fraudAlertService.getAllFraudAlerts();
        return ResponseEntity.ok(alerts);
    }
}