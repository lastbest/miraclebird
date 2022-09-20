package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.ChallengerDao;
import com.ssafy.miraclebird.dto.ChallengerDto;
import com.ssafy.miraclebird.entity.Challenger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChallengerServiceImpl implements ChallengerService{
    private final ChallengerDao challengerDao;

    @Autowired
    public ChallengerServiceImpl(ChallengerDao challengerDao) {
        this.challengerDao = challengerDao;
    }

    @Override
    @Transactional
    public List<ChallengerDto> getChallengerALL() {
        List<Challenger> challengerEntity = challengerDao.getChallengerALL();
        List<ChallengerDto> challengerDtos = new ArrayList<>();
        for (int i = 0; i < challengerEntity.size(); i++) {
            challengerDtos.add(ChallengerDto.of(challengerEntity.get(i)));
        }
        return challengerDtos;
    }

    @Override
    @Transactional
    public ChallengerDto getChallengerById(long challengerId) {
        Challenger challengerEntity = challengerDao.getChallengerById(challengerId);
        ChallengerDto challengerDto = ChallengerDto.of(challengerEntity);
        return challengerDto;
    }
}
