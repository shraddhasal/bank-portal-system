package com.bank.bankportal.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.bank.bankportal.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

}