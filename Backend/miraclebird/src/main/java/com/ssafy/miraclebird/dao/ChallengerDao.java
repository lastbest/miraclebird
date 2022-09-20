package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Challenger;

import java.util.List;

public interface ChallengerDao {
    List<Challenger> getChallengerALL();
    Challenger getChallengerById(long challengerIdx);
}
