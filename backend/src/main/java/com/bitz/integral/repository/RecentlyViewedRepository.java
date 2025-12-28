package com.bitz.integral.repository;

import com.bitz.integral.entity.RecentlyViewed;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RecentlyViewedRepository extends JpaRepository<RecentlyViewed, Long> {
    
    @Query("SELECT rv FROM RecentlyViewed rv JOIN FETCH rv.product WHERE rv.user.id = :userId ORDER BY rv.viewedAt DESC")
    List<RecentlyViewed> findTop20ByUserIdOrderByViewedAtDesc(@Param("userId") Long userId);
}
