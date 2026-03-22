package com.bank.bankportal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "bill_payments")
public class BillPayment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    private String billType; 
    // Example: Electricity, Water, Gas

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private String providerName;

    private LocalDateTime paymentDate;

    // 🔹 Default Constructor
    public BillPayment() {
    }

    // 🔹 Parameterized Constructor
    public BillPayment(String accountNumber, String billType, double amount, String providerName, LocalDateTime paymentDate) {
        this.accountNumber = accountNumber;
        this.billType = billType;
        this.amount = amount;
        this.providerName = providerName;
        this.paymentDate = paymentDate;
    }

    // 🔹 Getters and Setters

    public Long getId() {
        return id;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public String getBillType() {
        return billType;
    }

    public void setBillType(String billType) {
        this.billType = billType;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getProviderName() {
        return providerName;
    }

    public void setProviderName(String providerName) {
        this.providerName = providerName;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }
}