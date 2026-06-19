package com.wipro.finGenie.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.finGenie.dto.LoanDTO;
import com.wipro.finGenie.service.LoanService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/loans")
@RequiredArgsConstructor
public class LoanController {

    private final LoanService loanService;

    @PostMapping("/apply")
    public ResponseEntity<LoanDTO> applyLoan(@Valid @RequestBody LoanDTO dto) {

        LoanDTO appliedLoan = loanService.applyLoan(dto);

        return ResponseEntity.ok(appliedLoan);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LoanDTO> getLoanById(@PathVariable Long id) {

        LoanDTO loan = loanService.getLoanById(id);

        return ResponseEntity.ok(loan);
    }

    @GetMapping
    public ResponseEntity<List<LoanDTO>> getAllLoans() {

        List<LoanDTO> loanList = loanService.getAllLoans();

        return ResponseEntity.ok(loanList);
    }
}