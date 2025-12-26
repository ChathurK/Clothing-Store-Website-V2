package com.bitz.integral.repository;

import com.bitz.integral.entity.AdminActivityLog;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminActivityLogRepository extends JpaRepository<AdminActivityLog, Long> {
    
    Page<AdminActivityLog> findByAdminIdOrderByCreatedAtDesc(Long adminId, Pageable pageable);
    
    Page<AdminActivityLog> findByEntityTypeAndEntityIdOrderByCreatedAtDesc(String entityType, Long entityId, Pageable pageable);
}
