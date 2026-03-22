package com.bank.bankportal.controller;

import com.bank.bankportal.model.Recharge;
import com.bank.bankportal.service.RechargeService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recharge")
@CrossOrigin(origins = "*")
public class RechargeController {

    @Autowired
    private RechargeService service;

    @PostMapping("/do")
    public String recharge(@RequestBody Recharge recharge) {
        return service.doRecharge(recharge);
    }
}