package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.ChallengerDto;

import java.util.List;

public interface ChallengerService {
    List<ChallengerDto> getChallengerALL();
    ChallengerDto getChallengerById(long challengerId);
}
