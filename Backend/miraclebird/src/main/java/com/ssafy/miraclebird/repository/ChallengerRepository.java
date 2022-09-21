package com.ssafy.miraclebird.repository;


import com.ssafy.miraclebird.entity.Challenger;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChallengerRepository extends JpaRepository<Challenger,Long> {

}
