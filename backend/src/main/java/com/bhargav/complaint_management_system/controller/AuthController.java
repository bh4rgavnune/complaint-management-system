package com.bhargav.complaint_management_system.controller;

import com.bhargav.complaint_management_system.model.User;
import com.bhargav.complaint_management_system.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        System.out.println("Login attempt: " + user.getUsername());

        if (user.getUsername() == null || user.getPassword() == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());

        // Check if user exists
        if (existingUser.isEmpty()) {
            return ResponseEntity.status(401).body("User not found");
        }

        // Check password safely
        if (!user.getPassword().equals(existingUser.get().getPassword())) {
            return ResponseEntity.status(401).body("Invalid password");
        }

        // Success
        return ResponseEntity.ok(existingUser.get());
    }
}
