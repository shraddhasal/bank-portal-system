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

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }
@PostMapping("/login")
public Map<String, Object> login(@RequestBody User user){

    try {

        // ✅ Check input
        if(user.getEmail() == null || user.getPassword() == null){
            return Map.of("error", "Email or Password missing");
        }

        User existingUser = userRepository.findByEmail(user.getEmail()).orElse(null);

        if(existingUser == null){
            return Map.of("error", "User not found");
        }

        if(existingUser.getPassword() == null){
            return Map.of("error", "Stored password is invalid");
        }

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        boolean isMatch = encoder.matches(user.getPassword(), existingUser.getPassword());

        if(!isMatch){
            return Map.of("error", "Invalid password");
        }

        String token = JwtUtil.generateToken(existingUser.getEmail());

        return Map.of(
                "token", token,
                "email", existingUser.getEmail()
        );

    } catch (Exception e) {

        e.printStackTrace(); // 🔥 VERY IMPORTANT

        return Map.of("error", "Server error: " + e.getMessage());
    }
}
}