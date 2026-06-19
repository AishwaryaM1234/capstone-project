package com.wipro.finGenie.entity;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "fraud_alerts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class FraudAlert {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long fraudId;

    @Column
    private Double riskScore;

    @Column
    private String remarks;

    @Column
    private String status;

    @OneToOne
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;
}
