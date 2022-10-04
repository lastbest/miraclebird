package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Wallet;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WalletRepository extends JpaRepository<Wallet,Long>{
    boolean existsByUser(User user);
}
