package com.bank.bankportal.service;

import com.bank.bankportal.model.Recharge;
import com.bank.bankportal.model.Account;
import com.bank.bankportal.model.Transaction;
import com.bank.bankportal.repository.RechargeRepository;
import com.bank.bankportal.repository.AccountRepository;
import com.bank.bankportal.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class RechargeService {

    @Autowired
    private RechargeRepository rechargeRepo;

    @Autowired
    private AccountRepository accountRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    public String doRecharge(Recharge recharge) {

        Optional<Account> optionalAccount =
                accountRepo.findByAccountNumber(recharge.getAccountNumber());

        if (optionalAccount.isEmpty()) {
            return "Account not found!";
        }

        Account account = optionalAccount.get();

        if (account.getBalance() < recharge.getAmount()) {
            return "Insufficient Balance!";
        }

        // 💰 Deduct balance
        account.setBalance(account.getBalance() - recharge.getAmount());
        accountRepo.save(account);

        // 📱 Save recharge
        recharge.setDateTime(LocalDateTime.now());
        rechargeRepo.save(recharge);

        // 🔥 Save in transactions
        Transaction txn = new Transaction();
        txn.setType("DEBIT");
        txn.setFromAccount(recharge.getAccountNumber());
        txn.setToAccount(recharge.getMobileNumber());
        txn.setAmount(recharge.getAmount());
        txn.setDateTime(LocalDateTime.now());

        transactionRepo.save(txn);

        return "Recharge Successful!";
    }
}