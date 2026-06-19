package com.wipro.finGenie.exception;
 
public class LoanNotEligibleException extends RuntimeException {
 
    public LoanNotEligibleException(String message) {
        super(message);
    }
}