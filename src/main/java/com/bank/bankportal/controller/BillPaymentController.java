package com.bank.bankportal.controller;

import com.bank.bankportal.model.BillPayment;
import com.bank.bankportal.service.BillPaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bill")
@CrossOrigin(origins = "*") // allow React frontend
public class BillPaymentController {

    @Autowired
    private BillPaymentService service;

    // ✅ Pay Bill API
    @PostMapping("/pay")
    public String payBill(@RequestBody BillPayment bill) {
        return service.payBill(bill);
    }

    // ✅ Get Payment History API
    @GetMapping("/history/{accountNumber}")
    public List<BillPayment> getHistory(@PathVariable String accountNumber) {
        return service.getHistory(accountNumber);
    }
}