package com.bank.bankportal.controller;

import java.util.Map;

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

    // ================= REGISTER =================
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // default role USER
        if(user.getRole() == null){
            user.setRole("USER");
        }

        return userRepository.save(user);
    }

    // ================= USER LOGIN =================
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody User user){

        try {

            if(user.getEmail() == null || user.getPassword() == null){
                return Map.of("error", "Email or Password missing");
            }

            User existingUser = userRepository.findByEmail(user.getEmail()).orElse(null);

            if(existingUser == null){
                return Map.of("error", "User not found");
            }

            boolean isMatch = passwordEncoder.matches(
                    user.getPassword(),
                    existingUser.getPassword()
            );

            if(!isMatch){
                return Map.of("error", "Invalid password");
            }

            String token = JwtUtil.generateToken(existingUser.getEmail());

            return Map.of(
                    "token", token,
                    "email", existingUser.getEmail(),
                    "role", existingUser.getRole()
            );

        } catch (Exception e) {

            e.printStackTrace();

            return Map.of("error", "Server error: " + e.getMessage());
        }
    }

    // ================= ADMIN LOGIN =================
    @PostMapping("/admin-login")
    public Map<String, String> adminLogin(@RequestBody User loginUser){

        User user = userRepository.findByEmail(loginUser.getEmail()).orElse(null);

        if(user == null){
            return Map.of("error", "Admin not found");
        }

        boolean isMatch = passwordEncoder.matches(
                loginUser.getPassword(),
                user.getPassword()
        );

        if(!isMatch){
            return Map.of("error", "Invalid password");
        }

        if(!"ADMIN".equals(user.getRole())){
            return Map.of("error", "Not an admin");
        }

        return Map.of("message", "ADMIN_SUCCESS");
    }
}