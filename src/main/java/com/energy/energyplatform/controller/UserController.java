package com.energy.energyplatform.controller;

import com.energy.energyplatform.model.LoginResponse;
import com.energy.energyplatform.model.User;
import com.energy.energyplatform.security.JwtUtil;
import com.energy.energyplatform.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    // USER REGISTER API
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {

        // Default USER role
        user.setRole("USER");

        return userService.registerUser(user);
    }

    // ADMIN REGISTER API
    @PostMapping("/register-admin")
    public User registerAdmin(@RequestBody User user) {

        // ADMIN role
        user.setRole("ADMIN");

        return userService.registerUser(user);
    }

    // LOGIN API WITH JWT
    @PostMapping("/login")
    public LoginResponse loginUser(@RequestBody User user) {

        User loggedInUser = userService.loginUser(
                user.getEmail(),
                user.getPassword()
        );

        String token = jwtUtil.generateToken(loggedInUser.getEmail());

        return new LoginResponse(
                token,
                loggedInUser.getRole(),
                loggedInUser.getEmail()
        );
    }
}