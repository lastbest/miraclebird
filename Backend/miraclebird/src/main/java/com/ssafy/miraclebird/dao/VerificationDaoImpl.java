package com.ssafy.miraclebird.dao;


import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.repository.VerificationRepository;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.securityOauth.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class VerificationDaoImpl implements VerificationDao {
    private final VerificationRepository verificationRepository;
    private final UserRepository userRepository;

    @Autowired
    public VerificationDaoImpl(VerificationRepository verificationRepository, UserRepository userRepository){
        this.verificationRepository = verificationRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Verification> getVerificationALL() {
        List<Verification> verificationEntity = verificationRepository.findAll();
        return verificationEntity;
    }

    @Override
    public Verification getVerificationById(long verificationIdx) {
        Verification verificationEntity = verificationRepository.getById(verificationIdx);
        return verificationEntity;
    }

    @Override
    public void saveVerification(Verification verification) throws Exception {
        try {
            verificationRepository.save(verification);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    public Verification approveVerification(long verificationIdx, long updateApproval) throws Exception {
        Verification verificationEntity = verificationRepository.getById(verificationIdx);

        if(verificationEntity != null) {
            verificationEntity.setApproval(updateApproval);
            verificationRepository.save(verificationEntity);
            return verificationEntity;
        }
        else {
            throw new Exception();
        }
    }

    public void deleteVerificationInfo(long verificationIdx, long userIdx) throws Exception {
        //userIdx 비교 필요!!!!!!
        try {
            verificationRepository.deleteById(verificationIdx);
        } catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    public List<Verification> getVerificationByPeriod(Long userIdx, LocalDateTime startDate, LocalDateTime endDate) {
        User user = userRepository.getById(userIdx);
        List<Verification> verificationEntity = verificationRepository.findByUserAndRegtimeBetween(user,startDate,endDate);
        return verificationEntity;
    }

    @Override
    public List<String> getRankByCount() {
        List<String> stringEntity = verificationRepository.getRankByCount();
        return stringEntity;
    }
    @Override
    public List<String> getRankByStreak() {
        List<String> stringEntity = verificationRepository.getRankByStreak();
        return stringEntity;
    }
}
