package com.wipro.finGenie.exception;
 
public class DuplicateRecordException
        extends RuntimeException {
 
    public DuplicateRecordException(String message) {
        super(message);
    }
}
