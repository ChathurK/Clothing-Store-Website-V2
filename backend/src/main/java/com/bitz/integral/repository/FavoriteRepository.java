package com.bitz.integral.repository;

import com.bitz.integral.entity.Favorite;
import com.bitz.integral.entity.FavoriteId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoriteRepository extends JpaRepository<Favorite, FavoriteId> {
    
    @Query("SELECT f FROM Favorite f JOIN FETCH f.product WHERE f.userId = :userId ORDER BY f.createdAt DESC")
    List<Favorite> findByUserIdWithProduct(@Param("userId") Long userId);
    
    boolean existsByUserIdAndProductId(Long userId, Long productId);
}
