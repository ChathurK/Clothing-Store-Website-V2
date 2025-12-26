package com.bitz.integral.repository;

import com.bitz.integral.entity.UserAuthProvider;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserAuthProviderRepository extends JpaRepository<UserAuthProvider, Long> {
    
    Optional<UserAuthProvider> findByProviderAndProviderUserId(
        UserAuthProvider.AuthProvider provider, 
        String providerUserId
    );
}
