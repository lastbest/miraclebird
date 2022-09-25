package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.ChallengerDto;

import java.util.List;

public interface ChallengerService {
    List<ChallengerDto> getChallengerALL();
    ChallengerDto getChallengerById(long challengerId);
    Long getIdByEntities(long challengeId, long userId);
    void addChallenger(ChallengerDto challengerDto) throws Exception;
    void deleteChallenger(Long challengerIdx) throws Exception;
}
