package com.bank.bankportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bank.bankportal.model.Transaction;
import com.bank.bankportal.repository.TransactionRepository;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @GetMapping("/{accountNumber}")
    public List<Transaction> getTransactions(@PathVariable String accountNumber) {
        return transactionRepository
                .findByFromAccountOrToAccount(accountNumber, accountNumber);
    }
}