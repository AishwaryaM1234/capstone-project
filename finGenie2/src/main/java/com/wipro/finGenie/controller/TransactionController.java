package com.wipro.finGenie.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.finGenie.dto.TransactionDTO;
import com.wipro.finGenie.service.TransactionService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping
    public ResponseEntity<TransactionDTO> saveTransaction(
            @Valid @RequestBody TransactionDTO dto) {

        TransactionDTO transaction = transactionService.createTransaction(dto);

        return ResponseEntity.ok(transaction);
    }

    @GetMapping
    public ResponseEntity<List<TransactionDTO>> getTransactions() {

        List<TransactionDTO> transactions = transactionService.getAllTransactions();

        return ResponseEntity.ok(transactions);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TransactionDTO> getTransactionById(
            @PathVariable Long id) {

        TransactionDTO transaction = transactionService.getTransactionById(id);

        return ResponseEntity.ok(transaction);
    }
}