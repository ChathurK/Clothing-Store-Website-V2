package com.bitz.integral.repository;

import com.bitz.integral.entity.RecommendationClick;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendationClickRepository extends JpaRepository<RecommendationClick, Long> {
    
    @Query("SELECT COUNT(rc) FROM RecommendationClick rc WHERE rc.purchased = true")
    Long countConvertedRecommendations();
    
    @Query("SELECT COUNT(rc) FROM RecommendationClick rc")
    Long countTotalClicks();
}
