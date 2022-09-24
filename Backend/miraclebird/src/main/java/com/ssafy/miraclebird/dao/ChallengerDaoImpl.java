package com.ssafy.miraclebird.dao;


import com.ssafy.miraclebird.dto.ChallengerDto;
import com.ssafy.miraclebird.entity.Challenger;
import com.ssafy.miraclebird.repository.ChallengerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class ChallengerDaoImpl implements ChallengerDao {
    private final ChallengerRepository challengerRepository;

    @Autowired
    public ChallengerDaoImpl(ChallengerRepository challengerRepository){
        this.challengerRepository = challengerRepository;
    }

    @Override
    public List<Challenger> getChallengerALL() {
        List<Challenger> challengerEntity = challengerRepository.findAll();
        return challengerEntity;
    }

    @Override
    public Challenger getChallengerById(long challengerIdx) {
        Challenger challengerEntity = challengerRepository.getById(challengerIdx);
        return challengerEntity;
    }

    @Override
    public void addChallenger(Challenger challenger) throws Exception {
        try {
            challengerRepository.save(challenger);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    public void deleteChallenger(Challenger challenger) throws Exception {
        try {
            challengerRepository.delete(challenger);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
