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
@Table(name = "newsletter_subscriptions", indexes = @Index(name = "idx_email", columnList = "email"))
public class NewsletterSubscription {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @CreationTimestamp
    @Column(name = "subscribed_at", nullable = false, updatable = false)
    private LocalDateTime subscribedAt;
    
    @Column(name = "is_active")
    private Boolean isActive = true;
    
    @Column(name = "unsubscribed_at")
    private LocalDateTime unsubscribedAt;
}
