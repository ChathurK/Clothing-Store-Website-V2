package com.bitz.integral.repository;

import com.bitz.integral.entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    
    Page<Order> findByUserIdOrderByCreatedAtDesc(Long userId, Pageable pageable);
    
    List<Order> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    @Query("SELECT AVG(o.totalAmount) FROM Order o WHERE o.paymentStatus = 'COMPLETED'")
    BigDecimal calculateAverageOrderValue();
    
    @Query("SELECT COUNT(o) FROM Order o WHERE o.createdAt BETWEEN :start AND :end")
    Long countOrdersBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
    @Query("SELECT SUM(o.totalAmount) FROM Order o WHERE o.paymentStatus = 'COMPLETED' AND o.createdAt BETWEEN :start AND :end")
    BigDecimal sumTotalAmountBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
