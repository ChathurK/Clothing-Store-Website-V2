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
@Table(name = "favorites", indexes = @Index(name = "idx_created_at", columnList = "created_at"))
@IdClass(FavoriteId.class)
public class Favorite {
    
    @Id
    @Column(name = "user_id")
    private Long userId;
    
    @Id
    @Column(name = "product_id")
    private Long productId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", insertable = false, updatable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", insertable = false, updatable = false)
    private Product product;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "added_via")
    private AddedVia addedVia = AddedVia.BROWSE;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    public enum AddedVia {
        BROWSE, RECOMMENDATION, OTHER
    }
}
