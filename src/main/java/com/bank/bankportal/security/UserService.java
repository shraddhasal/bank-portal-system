package com.bank.bankportal.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.bankportal.model.User;
import com.bank.bankportal.repository.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User updateUser(User user){

        User existingUser = userRepository.findByEmail(user.getEmail()).orElse(null);

        if(existingUser == null){
            return null;
        }

        existingUser.setName(user.getName());

        if(user.getPassword() != null && !user.getPassword().isEmpty()){
            existingUser.setPassword(user.getPassword());
        }

        return userRepository.save(existingUser);
    }
}