package com.bank.bankportal.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String type;
    private String fromAccount;
    private String toAccount;
    private double amount;

    private LocalDateTime dateTime;

    public Transaction() {}

    public Long getId() { return id; }

    // ✅ TYPE
    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    // ✅ FROM
    public String getFromAccount() { return fromAccount; }
    public void setFromAccount(String fromAccount) { this.fromAccount = fromAccount; }

    // ✅ TO
    public String getToAccount() { return toAccount; }
    public void setToAccount(String toAccount) { this.toAccount = toAccount; }

    // ✅ AMOUNT
    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    // ✅ DATETIME
    public LocalDateTime getDateTime() { return dateTime; }
    public void setDateTime(LocalDateTime dateTime) { this.dateTime = dateTime; }
}