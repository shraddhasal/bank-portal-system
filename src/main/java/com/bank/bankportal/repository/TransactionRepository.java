package com.bank.bankportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bank.bankportal.model.Transaction;
import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByFromAccountOrToAccount(String from, String to);
}