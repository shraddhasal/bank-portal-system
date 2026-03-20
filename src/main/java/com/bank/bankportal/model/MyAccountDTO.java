package com.bank.bankportal.model;

public class MyAccountDTO {

    private String name;
    private String email;
    private String accountNumber;
    private String accountType;
    private double balance;

    public MyAccountDTO(String name,String email,String accountNumber,String accountType,double balance){
        this.name=name;
        this.email=email;
        this.accountNumber=accountNumber;
        this.accountType=accountType;
        this.balance=balance;
    }

    public String getName(){ return name; }
    public String getEmail(){ return email; }
    public String getAccountNumber(){ return accountNumber; }
    public String getAccountType(){ return accountType; }
    public double getBalance(){ return balance; }

}