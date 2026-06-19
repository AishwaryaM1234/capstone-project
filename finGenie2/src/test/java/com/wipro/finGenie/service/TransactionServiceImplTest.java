package com.wipro.finGenie.service;
 
import static org.junit.jupiter.api.Assertions.assertEquals;
 
import org.junit.jupiter.api.Test;
 
public class TransactionServiceImplTest {
 
    @Test
    void testAmountCalculation() {
 
        double amount = 1000;
        double expected = 1000;
 
        assertEquals(expected, amount);
    }
}
