package com.bitz.integral.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "size_demand", indexes = {
    @Index(name = "idx_viewed", columnList = "viewed_count"),
    @Index(name = "idx_purchased", columnList = "purchased_count")
})
public class SizeDemand {
    
    @Id
    @Column(name = "variant_id")
    private Long variantId;
    
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "variant_id")
    private ProductVariant variant;
    
    @Column(name = "viewed_count")
    private Integer viewedCount = 0;
    
    @Column(name = "purchased_count")
    private Integer purchasedCount = 0;
    
    @Column(name = "added_to_cart_count")
    private Integer addedToCartCount = 0;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}
