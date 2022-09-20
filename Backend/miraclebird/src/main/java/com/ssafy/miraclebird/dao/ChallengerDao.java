package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Challenger;

import java.util.List;

public interface ChallengerDao {
    List<Challenger> getChallengerALL();
    Challenger getChallengerById(long challengerIdx);
    Challenger approveChallenger(long challengerIdx, long updateApproval) throws Exception;
    void deleteChallengerInfo(long challengerIdx, long userIdx) throws Exception;

}
