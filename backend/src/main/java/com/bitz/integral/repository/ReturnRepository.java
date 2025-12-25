package com.bitz.integral.repository;

import com.bitz.integral.entity.Return;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReturnRepository extends JpaRepository<Return, Long> {
    
    List<Return> findByStatus(Return.ReturnStatus status);
}
