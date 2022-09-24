package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.dto.ChallengerDto;
import com.ssafy.miraclebird.entity.Challenger;

import java.util.List;

public interface ChallengerDao {
    List<Challenger> getChallengerALL();
    Challenger getChallengerById(long challengerIdx);
    void addChallenger(Challenger challenger) throws Exception;
    void deleteChallenger(Challenger challenger) throws Exception;
}
