package com.bank.bankportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bank.bankportal.model.Recharge;

import java.util.List;

public interface RechargeRepository extends JpaRepository<Recharge, Long> {

    List<Recharge> findByAccountNumber(String accountNumber);
}