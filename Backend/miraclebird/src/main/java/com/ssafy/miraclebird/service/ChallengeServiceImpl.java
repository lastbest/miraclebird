package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.ChallengeDao;
import com.ssafy.miraclebird.entity.Challenge;
import com.ssafy.miraclebird.dto.ChallengeDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChallengeServiceImpl implements ChallengeService{
    private final ChallengeDao challengeDao;

    @Autowired
    public ChallengeServiceImpl(ChallengeDao challengeDao) {
        this.challengeDao = challengeDao;
    }

    @Override
    @Transactional
    public List<ChallengeDto> getChallengeALL() {
        List<Challenge> challengeEntity = challengeDao.getChallengeALL();
        List<ChallengeDto> challengeDtos = new ArrayList<>();
        for (int i = 0; i < challengeEntity.size(); i++) {
            challengeDtos.add(ChallengeDto.of(challengeEntity.get(i)));
        }
        return challengeDtos;
    }

    @Override
    @Transactional
    public ChallengeDto getChallengeById(long challengeId) {
        Challenge challengeEntity = challengeDao.getChallengeById(challengeId);
        ChallengeDto challengeDto = ChallengeDto.of(challengeEntity);
        return challengeDto;
    }
}
