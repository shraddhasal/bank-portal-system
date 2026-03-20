package com.bank.bankportal.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.bankportal.model.Account;
import com.bank.bankportal.model.MyAccountDTO;
import com.bank.bankportal.model.User;
import com.bank.bankportal.repository.AccountRepository;
import com.bank.bankportal.repository.UserRepository;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private UserRepository userRepository;

    public Account createAccount(Account account){

        Account existing = accountRepository.findFirstByEmail(account.getEmail()).orElse(null);

        if(existing != null){
            throw new RuntimeException("Account already exists for this user");
        }

        return accountRepository.save(account);
    }

    public List<Account> getAccounts(){
        return accountRepository.findAll();
    }

    public Optional<Account> getAccountByEmail(String email){
        return accountRepository.findFirstByEmail(email);
    }

    public MyAccountDTO getMyAccount(String email){

        User user = userRepository.findByEmail(email).orElse(null);
        Account account = accountRepository.findFirstByEmail(email).orElse(null);

        if(user == null || account == null){
            return null;
        }

        return new MyAccountDTO(
                user.getName(),
                user.getEmail(),
                account.getAccountNumber(),
                account.getAccountType(),
                account.getBalance()
        );
    }
}