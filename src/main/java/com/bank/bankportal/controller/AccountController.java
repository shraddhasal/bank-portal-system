package com.bank.bankportal.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bank.bankportal.model.Account;
import com.bank.bankportal.service.AccountService;
import com.bank.bankportal.model.MyAccountDTO;

@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    @Autowired
    private AccountService accountService;

    @PostMapping("/create")
    public Account createAccount(@RequestBody Account account){
        return accountService.createAccount(account);
    }

    @GetMapping
    public List<Account> getAccounts(){
        return accountService.getAccounts();
    }

    // ⭐ Put this FIRST
    @GetMapping("/myaccount/{email}")
    public MyAccountDTO getMyAccount(@PathVariable String email){
        return accountService.getMyAccount(email);
    }

    // ⭐ Put this LAST
    @GetMapping("/{email}")
    public Account getAccount(@PathVariable String email){
        return accountService.getAccountByEmail(email).orElse(null);
    }

}