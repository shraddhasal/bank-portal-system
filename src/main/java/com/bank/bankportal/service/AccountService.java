package com.bank.bankportal.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;
import com.bank.bankportal.model.Account;
import com.bank.bankportal.repository.AccountRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    public Account createAccount(Account account){
        return accountRepository.save(account);
    }

    public List<Account> getAccounts(){
        return accountRepository.findAll();
    }

     public Optional<Account> getAccountByEmail(String email){
        return accountRepository.findByEmail(email);
    }
}