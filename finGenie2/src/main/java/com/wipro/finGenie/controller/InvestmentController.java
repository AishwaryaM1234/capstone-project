package com.wipro.finGenie.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.wipro.finGenie.dto.InvestmentDTO;
import com.wipro.finGenie.service.InvestmentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/investments")
@RequiredArgsConstructor
public class InvestmentController {

    private final InvestmentService investmentService;

    @PostMapping
    public ResponseEntity<InvestmentDTO> saveInvestment(@Valid @RequestBody InvestmentDTO dto) {

        InvestmentDTO savedInvestment = investmentService.saveInvestment(dto);

        return ResponseEntity.ok(savedInvestment);
    }

    @GetMapping
    public ResponseEntity<List<InvestmentDTO>> getAllInvestments() {

        List<InvestmentDTO> investments = investmentService.getAllInvestments();

        return ResponseEntity.ok(investments);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InvestmentDTO> getInvestmentById(@PathVariable Long id) {

        InvestmentDTO investment = investmentService.getInvestmentById(id);

        return ResponseEntity.ok(investment);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InvestmentDTO> updateInvestment(
            @PathVariable Long id,
            @RequestBody InvestmentDTO dto) {

        InvestmentDTO updatedInvestment = investmentService.updateInvestment(id, dto);

        return ResponseEntity.ok(updatedInvestment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInvestment(@PathVariable Long id) {

        investmentService.deleteInvestment(id);

        String message = "Investment deleted successfully";

        return ResponseEntity.ok(message);
    }
}