package com.bank.bankportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bank.bankportal.model.TransferRequest;
import com.bank.bankportal.model.Transaction;
import com.bank.bankportal.service.TransferService;
import com.bank.bankportal.repository.TransactionRepository;

import java.util.List;

@RestController
@RequestMapping("/api/transfer")
@CrossOrigin(origins = "http://localhost:3000")
public class TransferController {

    @Autowired
    private TransferService transferService;

    @Autowired
    private TransactionRepository transactionRepository;

    @PostMapping
    public String transfer(@RequestBody TransferRequest request) {
        return transferService.transferMoney(request);
    }

    @GetMapping("/{accountNumber}")
    public List<Transaction> getTransactions(@PathVariable String accountNumber) {
        return transactionRepository
                .findByFromAccountOrToAccount(accountNumber, accountNumber);
    }
}