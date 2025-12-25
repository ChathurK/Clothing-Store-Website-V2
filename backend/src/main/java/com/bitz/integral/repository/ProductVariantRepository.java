package com.bitz.integral.repository;

import com.bitz.integral.entity.ProductVariant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductVariantRepository extends JpaRepository<ProductVariant, Long> {
    
    List<ProductVariant> findByProductId(Long productId);
    
    Optional<ProductVariant> findBySku(String sku);
    
    @Query("SELECT pv FROM ProductVariant pv " +
           "JOIN FETCH pv.product " +
           "JOIN FETCH pv.size " +
           "LEFT JOIN FETCH Inventory i ON i.variantId = pv.id " +
           "WHERE pv.product.id = :productId")
    List<ProductVariant> findByProductIdWithInventory(@Param("productId") Long productId);
}
