package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.ChallengerDto;

import java.util.List;

public interface ChallengerService {
    List<ChallengerDto> getChallengerALL();
    ChallengerDto getChallengerById(long challengerId);
    ChallengerDto approveChallenger(long challengerId, long updateApproval) throws Exception;
    void deleteChallengerInfo(long challengerId, long userId) throws Exception;
}
