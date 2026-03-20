package com.bank.bankportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bank.bankportal.model.Account;
import com.bank.bankportal.model.TransferRequest;
import com.bank.bankportal.model.Transaction;
import com.bank.bankportal.repository.AccountRepository;
import com.bank.bankportal.repository.TransactionRepository;

import java.time.LocalDateTime;

@Service
public class TransferService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Transactional   // 🔥 VERY IMPORTANT
    public String transferMoney(TransferRequest request) {

        System.out.println("STEP 1: Transfer started");

        Account sender = accountRepository
                .findByAccountNumber(request.getFromAccount())
                .orElseThrow(() -> new RuntimeException("Sender not found"));

        Account receiver = accountRepository
                .findByAccountNumber(request.getToAccount())
                .orElseThrow(() -> new RuntimeException("Receiver not found"));

        if (request.getFromAccount().equals(request.getToAccount())) {
            throw new RuntimeException("Cannot transfer to same account");
        }

        if (sender.getBalance() < request.getAmount()) {
            throw new RuntimeException("Insufficient balance");
        }

        // 💸 Update balances
        sender.setBalance(sender.getBalance() - request.getAmount());
        receiver.setBalance(receiver.getBalance() + request.getAmount());

        accountRepository.save(sender);
        accountRepository.save(receiver);

        System.out.println("STEP 2: Saving transaction...");

        // 💾 Save transaction
        Transaction txn = new Transaction();
        txn.setFromAccount(request.getFromAccount());
        txn.setToAccount(request.getToAccount());
        txn.setAmount(request.getAmount());
        txn.setDateTime(LocalDateTime.now());

        transactionRepository.save(txn);

        System.out.println("STEP 3: Saved successfully");

        return "Money transferred successfully!";
    }
}