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
    List<Verification> findByUser(User user);

    @Query(value = "SELECT u.name FROM (select  v.user_idx, COUNT(vl.verification_like_idx) as likes FROM verification v left outer join verification_like vl on v.verification_idx = vl.verification_idx GROUP BY vl.verification_idx) a join user u on a.user_idx = u.user_idx GROUP BY a.user_idx ORDER BY count(a.user_idx) DESC, SUM(likes) DESC limit 3;", nativeQuery = true)    //예전거 @Query(value = "SELECT u.name FROM verification v join user u on v.user_idx = u.user_idx GROUP BY v.user_idx order by count(*) desc limit 3", nativeQuery = true)
    List<String> getRankByCount();

    @Query(value = "SELECT u.name FROM verification v join user u on v.user_idx = u.user_idx GROUP BY v.user_idx order by count(*) desc limit 3", nativeQuery = true)
    List<String> getRankByStreak();
}
