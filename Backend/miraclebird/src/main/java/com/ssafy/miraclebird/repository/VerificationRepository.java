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

    @Query(value = "SELECT u.name FROM (select  v.user_idx, COUNT(vl.verification_like_idx) as likes FROM verification v left outer join verification_like vl on v.verification_idx = vl.verification_idx WHERE v.approval != 2 GROUP BY vl.verification_idx) a join user u on a.user_idx = u.user_idx GROUP BY a.user_idx ORDER BY count(a.user_idx) DESC, SUM(likes) DESC limit 3;", nativeQuery = true)    //예전거 @Query(value = "SELECT u.name FROM verification v join user u on v.user_idx = u.user_idx GROUP BY v.user_idx order by count(*) desc limit 3", nativeQuery = true)
    List<String> getRankByCount();

    @Query(value = "SELECT u.name FROM (SELECT a.user_idx, MIN(a.regdate) from_dt, MAX(a.regdate) to_dt, DATEDIFF(MAX(a.regdate), MIN(a.regdate)) + 1  as streak, COUNT(*) cnt, DATE_FORMAT(NOW(),'%Y%m%d') as nowdate, SUM(a.likes) as likesum FROM (SELECT @ROWNUM \\:= @ROWNUM+1, v.verification_idx, v.user_idx, DATE_FORMAT(v.regtime,'%Y%m%d') AS regdate, approval, COUNT(vl.verification_like_idx) as likes FROM verification v left outer join verification_like vl on v.verification_idx = vl.verification_idx WHERE v.approval != 2 GROUP BY v.verification_idx ORDER BY user_idx, regdate DESC) a GROUP BY a.user_idx, @ROWNUM ORDER BY a.user_idx, from_dt) b join user u on b.user_idx = u.user_idx WHERE b.to_dt = b.nowdate or b.to_dt = b.nowdate-1 ORDER BY streak DESC, likesum DESC LIMIT 3;", nativeQuery = true)
    List<String> getRankByStreak();

    @Query(value = "SELECT streak FROM (SELECT a.user_idx, MIN(a.regdate) from_dt, MAX(a.regdate) to_dt, DATEDIFF(MAX(a.regdate), MIN(a.regdate)) + 1  as streak, DATE_FORMAT(NOW(),'%Y%m%d') as nowdate FROM (SELECT @ROWNUM \\:= @ROWNUM+1, v.verification_idx, v.user_idx, DATE_FORMAT(v.regtime,'%Y%m%d') AS regdate, approval FROM verification v WHERE v.approval != 2 AND v.user_idx =?1 ORDER BY user_idx, regdate DESC) a GROUP BY a.user_idx, @ROWNUM ORDER BY a.user_idx, from_dt) b WHERE b.to_dt = b.nowdate or b.to_dt = b.nowdate-1 ORDER BY streak DESC;", nativeQuery = true)
    List<Long> getStreakByUserIdx(Long userIdx);
}
