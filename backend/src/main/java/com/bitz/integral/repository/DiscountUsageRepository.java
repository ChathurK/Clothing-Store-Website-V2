package com.bitz.integral.repository;

import com.bitz.integral.entity.DiscountUsage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscountUsageRepository extends JpaRepository<DiscountUsage, Long> {
    
    long countByDiscountIdAndUserId(Long discountId, Long userId);
    
    long countByDiscountId(Long discountId);
}
