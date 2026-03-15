package com.bank.bankportal.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import com.bank.bankportal.security.JwtUtil;
import com.bank.bankportal.model.User;
import com.bank.bankportal.repository.UserRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }
    @PostMapping("/login")
public String login(@RequestBody User user){

    User existingUser = userRepository.findByEmail(user.getEmail()).orElse(null);

    if(existingUser == null){
        return "User not found";
    }

    BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    if(!encoder.matches(user.getPassword(), existingUser.getPassword())){
        return "Invalid password";
    }

    return JwtUtil.generateToken(existingUser.getEmail());
}
}