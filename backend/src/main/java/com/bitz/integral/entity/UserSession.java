package com.bitz.integral.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_sessions", 
    uniqueConstraints = @UniqueConstraint(name = "unique_session_token", columnNames = "session_token"),
    indexes = {
        @Index(name = "idx_session_token", columnList = "session_token"),
        @Index(name = "idx_user_id", columnList = "user_id"),
        @Index(name = "idx_started_at", columnList = "started_at")
    }
)
public class UserSession {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
    
    @Column(name = "session_token", unique = true, nullable = false)
    private String sessionToken;
    
    @CreationTimestamp
    @Column(name = "started_at", nullable = false, updatable = false)
    private LocalDateTime startedAt;
    
    @UpdateTimestamp
    @Column(name = "last_activity")
    private LocalDateTime lastActivity;
    
    @Column(name = "ended_at")
    private LocalDateTime endedAt;
    
    @Column(name = "signup_started")
    private Boolean signupStarted = false;
    
    @Column(name = "signup_completed")
    private Boolean signupCompleted = false;
    
    @Column(name = "checkout_started")
    private Boolean checkoutStarted = false;
    
    @Column(name = "checkout_completed")
    private Boolean checkoutCompleted = false;
}
