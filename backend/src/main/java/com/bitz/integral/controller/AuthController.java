package com.bitz.integral.controller;

import com.bitz.integral.dto.request.LoginRequest;
import com.bitz.integral.dto.request.RegisterRequest;
import com.bitz.integral.dto.response.ApiResponse;
import com.bitz.integral.dto.response.AuthResponse;
import com.bitz.integral.service.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(ApiResponse.success("Registration successful", response));
    }
    
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@Valid @RequestBody LoginRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }
    
    @GetMapping("/google/callback")
    public ResponseEntity<ApiResponse> googleCallback(
            @RequestParam String email,
            @RequestParam String googleId,
            @RequestParam(required = false) String firstName,
            @RequestParam(required = false) String lastName
    ) {
        AuthResponse response = authService.googleLogin(email, googleId, firstName, lastName);
        return ResponseEntity.ok(ApiResponse.success("Google login successful", response));
    }
}
