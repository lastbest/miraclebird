package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.ChallengerDto;

import java.util.List;

public interface ChallengerService {
    List<ChallengerDto> getChallengerALL();
    ChallengerDto getChallengerById(long challengerId);
    void addChallenger(ChallengerDto challengerDto) throws Exception;
    void deleteChallenger(ChallengerDto challengerDto) throws Exception;
}
