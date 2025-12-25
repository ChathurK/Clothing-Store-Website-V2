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
@Table(name = "addresses", indexes = {
    @Index(name = "idx_user_id", columnList = "user_id"),
    @Index(name = "idx_default", columnList = "user_id, is_default")
})
public class Address {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(name = "full_name", nullable = false, length = 200)
    private String fullName;
    
    @Column(nullable = false, length = 20)
    private String phone;
    
    @Column(name = "address_line1", nullable = false)
    private String addressLine1;
    
    @Column(name = "address_line2")
    private String addressLine2;
    
    @Column(nullable = false, length = 100)
    private String city;
    
    @Column(nullable = false, length = 100)
    private String state;
    
    @Column(name = "postal_code", nullable = false, length = 20)
    private String postalCode;
    
    @Column(nullable = false, length = 100)
    private String country = "USA";
    
    @Column(name = "is_default")
    private Boolean isDefault = false;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
