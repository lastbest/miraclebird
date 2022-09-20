package com.ssafy.miraclebird.dao;


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
    public Challenger approveChallenger(long challengerIdx, long updateApproval) throws Exception {
        Challenger challengerEntity = challengerRepository.getById(challengerIdx);

        if(challengerEntity != null) {
            challengerEntity.setApproval(updateApproval);
            challengerRepository.save(challengerEntity);
            return challengerEntity;
        }
        else {
            throw new Exception();
        }
    }

    public void deleteChallengerInfo(long challengerIdx, long userIdx) throws Exception {
        //userIdx 비교 필요!!!!!!
        try {
            challengerRepository.deleteById(challengerIdx);
        } catch (Exception e) {
            throw new Exception();
        }
    }


}
