package com.bitz.integral.repository;

import com.bitz.integral.entity.SizeDemand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SizeDemandRepository extends JpaRepository<SizeDemand, Long> {
    
    @Query("SELECT sd FROM SizeDemand sd JOIN FETCH sd.variant v JOIN FETCH v.size ORDER BY sd.purchasedCount DESC")
    List<SizeDemand> findTopDemandedSizes();
}
