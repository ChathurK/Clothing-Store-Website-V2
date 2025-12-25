package com.bitz.integral.repository;

import com.bitz.integral.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    
    @Query("SELECT ci FROM CartItem ci " +
           "JOIN FETCH ci.variant v " +
           "JOIN FETCH v.product " +
           "JOIN FETCH v.size " +
           "WHERE ci.cart.id = :cartId")
    List<CartItem> findByCartIdWithDetails(@Param("cartId") Long cartId);
    
    Optional<CartItem> findByCartIdAndVariantId(Long cartId, Long variantId);
    
    void deleteByCartId(Long cartId);
}
