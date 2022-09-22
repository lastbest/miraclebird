package com.ssafy.miraclebird.repository;


import com.ssafy.miraclebird.entity.Verification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VerificationRepository extends JpaRepository<Verification,Long> {
//    Optional<Verification> findBy
}
