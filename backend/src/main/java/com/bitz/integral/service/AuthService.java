package com.bitz.integral.service;

import com.bitz.integral.dto.request.LoginRequest;
import com.bitz.integral.dto.request.RegisterRequest;
import com.bitz.integral.dto.response.AuthResponse;
import com.bitz.integral.entity.User;
import com.bitz.integral.entity.UserAuthProvider;
import com.bitz.integral.entity.UserEvent;
import com.bitz.integral.exception.BadRequestException;
import com.bitz.integral.exception.UnauthorizedException;
import com.bitz.integral.repository.UserAuthProviderRepository;
import com.bitz.integral.repository.UserEventRepository;
import com.bitz.integral.repository.UserRepository;
import com.bitz.integral.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final UserAuthProviderRepository authProviderRepository;
    private final UserEventRepository userEventRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtTokenProvider jwtTokenProvider;
    private final AuthenticationManager authenticationManager;
    
    @Transactional
    public AuthResponse register(RegisterRequest request) {
        // Check if user already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new BadRequestException("Email is already registered");
        }
        
        // Create new user
        User user = User.builder()
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phone(request.getPhone())
                .isActive(true)
                .build();
        
        user = userRepository.save(user);
        
        // Create auth provider record for email
        UserAuthProvider authProvider = UserAuthProvider.builder()
                .user(user)
                .provider(UserAuthProvider.AuthProvider.EMAIL)
                .providerUserId(request.getEmail())
                .build();
        
        authProviderRepository.save(authProvider);
        
        // Log signup event
        logUserEvent(user, UserEvent.EventType.SIGNUP, null);
        
        // Generate tokens
        String token = jwtTokenProvider.generateToken(user.getEmail());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());
        
        return AuthResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .type("Bearer")
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }
    
    @Transactional
    public AuthResponse login(LoginRequest request) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            request.getEmail(),
                            request.getPassword()
                    )
            );
            
            // Get user
            User user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UnauthorizedException("Invalid credentials"));
            
            if (!user.getIsActive()) {
                throw new UnauthorizedException("Account is deactivated");
            }
            
            // Update last login
            user.setLastLoginAt(LocalDateTime.now());
            userRepository.save(user);
            
            // Log login event
            logUserEvent(user, UserEvent.EventType.LOGIN, null);
            
            // Generate tokens
            String token = jwtTokenProvider.generateToken(user.getEmail());
            String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());
            
            return AuthResponse.builder()
                    .token(token)
                    .refreshToken(refreshToken)
                    .type("Bearer")
                    .userId(user.getId())
                    .email(user.getEmail())
                    .firstName(user.getFirstName())
                    .lastName(user.getLastName())
                    .build();
            
        } catch (AuthenticationException e) {
            throw new UnauthorizedException("Invalid email or password");
        }
    }
    
    @Transactional
    public AuthResponse googleLogin(String email, String googleId, String firstName, String lastName) {
        // Check if user exists with this Google ID
        UserAuthProvider authProvider = authProviderRepository
                .findByProviderAndProviderUserId(UserAuthProvider.AuthProvider.GOOGLE, googleId)
                .orElse(null);
        
        User user;
        
        if (authProvider != null) {
            // Existing Google user
            user = authProvider.getUser();
            user.setLastLoginAt(LocalDateTime.now());
            userRepository.save(user);
        } else {
            // Check if email exists (user might have registered with email)
            user = userRepository.findByEmail(email).orElse(null);
            
            if (user != null) {
                // Link Google account to existing user
                UserAuthProvider newAuthProvider = UserAuthProvider.builder()
                        .user(user)
                        .provider(UserAuthProvider.AuthProvider.GOOGLE)
                        .providerUserId(googleId)
                        .build();
                authProviderRepository.save(newAuthProvider);
            } else {
                // Create new user
                user = User.builder()
                        .email(email)
                        .firstName(firstName)
                        .lastName(lastName)
                        .isActive(true)
                        .emailVerifiedAt(LocalDateTime.now())
                        .build();
                
                user = userRepository.save(user);
                
                // Create Google auth provider
                UserAuthProvider newAuthProvider = UserAuthProvider.builder()
                        .user(user)
                        .provider(UserAuthProvider.AuthProvider.GOOGLE)
                        .providerUserId(googleId)
                        .build();
                authProviderRepository.save(newAuthProvider);
                
                // Log signup event
                logUserEvent(user, UserEvent.EventType.SIGNUP, null);
            }
        }
        
        // Log login event
        logUserEvent(user, UserEvent.EventType.LOGIN, null);
        
        // Generate tokens
        String token = jwtTokenProvider.generateToken(user.getEmail());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getEmail());
        
        return AuthResponse.builder()
                .token(token)
                .refreshToken(refreshToken)
                .type("Bearer")
                .userId(user.getId())
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();
    }
    
    private void logUserEvent(User user, UserEvent.EventType eventType, String sessionToken) {
        try {
            if (sessionToken == null) {
                sessionToken = UUID.randomUUID().toString();
            }
            
            UserEvent event = UserEvent.builder()
                    .user(user)
                    .sessionToken(sessionToken)
                    .eventType(eventType)
                    .build();
            
            userEventRepository.save(event);
        } catch (Exception e) {
            log.error("Failed to log user event", e);
        }
    }
}
