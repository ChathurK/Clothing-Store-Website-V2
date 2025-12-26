package com.bitz.integral.repository;

import com.bitz.integral.entity.UserEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface UserEventRepository extends JpaRepository<UserEvent, Long> {
    
    List<UserEvent> findByUserIdOrderByCreatedAtDesc(Long userId);
    
    @Query("SELECT COUNT(DISTINCT e.user.id) FROM UserEvent e WHERE e.eventType = 'SIGNUP' AND e.createdAt BETWEEN :start AND :end")
    Long countSignupsBetween(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
    
    @Query("SELECT e.product.id, COUNT(e) FROM UserEvent e WHERE e.eventType = 'PRODUCT_VIEW' AND e.createdAt BETWEEN :start AND :end GROUP BY e.product.id ORDER BY COUNT(e) DESC")
    List<Object[]> findMostViewedProducts(@Param("start") LocalDateTime start, @Param("end") LocalDateTime end);
}
