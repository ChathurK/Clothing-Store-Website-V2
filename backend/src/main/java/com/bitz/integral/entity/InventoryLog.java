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
@Table(name = "inventory_logs", indexes = {
    @Index(name = "idx_variant_id", columnList = "variant_id"),
    @Index(name = "idx_created_at", columnList = "created_at")
})
public class InventoryLog {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "variant_id", nullable = false)
    private ProductVariant variant;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "change_type", nullable = false)
    private ChangeType changeType;
    
    @Column(name = "quantity_change", nullable = false)
    private Integer quantityChange;
    
    @Column(name = "stock_after", nullable = false)
    private Integer stockAfter;
    
    private String notes;
    
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    public enum ChangeType {
        SALE, RESTOCK, ADJUSTMENT, RETURN
    }
}
