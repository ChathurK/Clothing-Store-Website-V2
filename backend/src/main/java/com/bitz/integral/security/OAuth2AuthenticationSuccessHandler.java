package com.bitz.integral.security;

import com.bitz.integral.dto.response.AuthResponse;
import com.bitz.integral.service.AuthService;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

@Component
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    
    private final AuthService authService;
    private final ObjectMapper objectMapper;
    
    @Value("${app.frontend.url}")
    private String frontendUrl;
    
    public OAuth2AuthenticationSuccessHandler(@Lazy AuthService authService, ObjectMapper objectMapper) {
        this.authService = authService;
        this.objectMapper = objectMapper;
    }
    
    @Override
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException, ServletException {
        
        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect.");
            return;
        }
        
        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        
        // Extract user info from OAuth2User
        String email = oAuth2User.getAttribute("email");
        String googleId = oAuth2User.getAttribute("sub");
        String firstName = oAuth2User.getAttribute("given_name");
        String lastName = oAuth2User.getAttribute("family_name");
        
        // Process Google login
        AuthResponse authResponse = authService.googleLogin(email, googleId, firstName, lastName);
        
        // Create JSON response for the token
        String tokenJson = objectMapper.writeValueAsString(authResponse);
        
        // Redirect to frontend home page with token as URL-encoded JSON
        // The frontend will check for token on any page load
        String redirectUrl = String.format("%s/?token=%s",
                frontendUrl,
                URLEncoder.encode(tokenJson, StandardCharsets.UTF_8)
        );
        
        getRedirectStrategy().sendRedirect(request, response, redirectUrl);
    }
}
