package com.bitz.integral.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_auth_providers", 
    uniqueConstraints = @UniqueConstraint(name = "unique_provider_user", columnNames = {"provider", "provider_user_id"}),
    indexes = @Index(name = "idx_user_id", columnList = "user_id")
)
public class UserAuthProvider {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AuthProvider provider;
    
    @Column(name = "provider_user_id")
    private String providerUserId;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    public enum AuthProvider {
        EMAIL, GOOGLE, APPLE
    }
}
