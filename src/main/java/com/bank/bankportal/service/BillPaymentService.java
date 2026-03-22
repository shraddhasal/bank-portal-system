package com.bank.bankportal.service;

import com.bank.bankportal.model.BillPayment;
import com.bank.bankportal.model.Account;
import com.bank.bankportal.model.Transaction;
import com.bank.bankportal.repository.BillPaymentRepository;
import com.bank.bankportal.repository.AccountRepository;
import com.bank.bankportal.repository.TransactionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BillPaymentService {

    @Autowired
    private BillPaymentRepository billRepo;

    @Autowired
    private AccountRepository accountRepo;

    @Autowired
    private TransactionRepository transactionRepo;

    // ✅ Pay Bill
    public String payBill(BillPayment bill) {

        Optional<Account> optionalAccount =
                accountRepo.findByAccountNumber(bill.getAccountNumber());

        if (optionalAccount.isEmpty()) {
            return "Account not found!";
        }

        Account account = optionalAccount.get();

        if (account.getBalance() < bill.getAmount()) {
            return "Insufficient Balance!";
        }

        // 💰 Deduct balance
        account.setBalance(account.getBalance() - bill.getAmount());
        accountRepo.save(account);

        // 📅 Save bill
        bill.setPaymentDate(LocalDateTime.now());
        billRepo.save(bill);

        // 🔥 Save transaction
        Transaction txn = new Transaction();
        txn.setType("DEBIT");
        txn.setFromAccount(bill.getAccountNumber());
        txn.setToAccount("BILL_PAYMENT");
        txn.setAmount(bill.getAmount());
        txn.setDateTime(LocalDateTime.now());

        transactionRepo.save(txn);

        return "Bill Paid Successfully!";
    }

    // ✅ History
    public List<BillPayment> getHistory(String accountNumber) {
        return billRepo.findByAccountNumber(accountNumber);
    }
}