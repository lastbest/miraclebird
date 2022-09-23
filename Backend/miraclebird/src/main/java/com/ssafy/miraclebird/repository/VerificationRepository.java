package com.ssafy.miraclebird.repository;


import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface VerificationRepository extends JpaRepository<Verification,Long> {
//    Optional<Verification> findBy
    List<Verification> findByUserAndRegtimeBetween(User user, LocalDateTime startDate, LocalDateTime endDate);
    @Query(value = "SELECT u.name FROM verification v join user u on v.user_idx = u.user_idx GROUP BY v.user_idx order by count(*) desc limit 3", nativeQuery = true)    //예전거 list<long> SELECT user_idx FROM verification GROUP BY user_idx order by count(*) desc limit 3
    List<String> getRankByCount();

    @Query(value = "SELECT u.name FROM verification v join user u on v.user_idx = u.user_idx GROUP BY v.user_idx order by count(*) desc limit 3", nativeQuery = true)
    List<String> getRankByStreak();
}
