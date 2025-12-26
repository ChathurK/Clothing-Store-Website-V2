package com.bitz.integral.repository;

import com.bitz.integral.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    
    List<OrderItem> findByOrderId(Long orderId);
    
    @Query("SELECT oi.variant.product.id, SUM(oi.quantity) as totalSold " +
           "FROM OrderItem oi " +
           "JOIN oi.order o " +
           "WHERE o.paymentStatus = 'COMPLETED' AND o.createdAt BETWEEN :start AND :end " +
           "GROUP BY oi.variant.product.id " +
           "ORDER BY totalSold DESC")
    List<Object[]> findTopSellingProducts(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
