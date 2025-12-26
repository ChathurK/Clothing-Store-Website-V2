package com.bitz.integral.repository;

import com.bitz.integral.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface DiscountRepository extends JpaRepository<Discount, Long> {
    
    Optional<Discount> findByCodeAndIsActiveTrue(String code);
    
    Optional<Discount> findByCodeAndIsActiveTrueAndValidFromBeforeAndValidToAfter(
        String code, 
        LocalDateTime now1, 
        LocalDateTime now2
    );
}
