package com.wipro.finGenie.util;

public class LoanPredictionEngine {

    private static LoanPredictionEngine instance;

    private LoanPredictionEngine() {
        // private constructor to prevent instantiation
    }

    public static synchronized LoanPredictionEngine getInstance() {

        if (instance == null) {
            instance = new LoanPredictionEngine();
        }

        return instance;
    }

    public String predictLoan(double salary, int creditScore) {

        String result;

        if (salary > 50000 && creditScore > 700) {
            result = "APPROVED";
        } else {
            result = "REJECTED";
        }

        return result;
    }
}
