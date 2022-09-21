package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.VerificationDao;
import com.ssafy.miraclebird.dto.VerificationDto;
import com.ssafy.miraclebird.entity.Verification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class VerificationServiceImpl implements VerificationService {
    private final VerificationDao verificationDao;

    @Autowired
    public VerificationServiceImpl(VerificationDao verificationDao) {
        this.verificationDao = verificationDao;
    }

    @Override
    @Transactional
    public List<VerificationDto> getVerificationALL() {
        List<Verification> verificationEntity = verificationDao.getVerificationALL();
        List<VerificationDto> verificationDtos = new ArrayList<>();
        for (int i = 0; i < verificationEntity.size(); i++) {
            verificationDtos.add(VerificationDto.of(verificationEntity.get(i)));
        }
        return verificationDtos;
    }

    @Override
    @Transactional
    public VerificationDto getVerificationById(long verificationId) {
        Verification verificationEntity = verificationDao.getVerificationById(verificationId);
        VerificationDto verificationDto = VerificationDto.of(verificationEntity);
        return verificationDto;
    }

    @Override
    @Transactional
    public VerificationDto approveVerification(long verificationId, long updateApproval) throws Exception {
        Verification verificationEntity = verificationDao.approveVerification(verificationId, updateApproval);
        VerificationDto verificationDto = VerificationDto.of(verificationEntity);
        return verificationDto;
    }

    @Override
    @Transactional
    public void deleteVerificationInfo(long verificationId, long userId) throws Exception {
        verificationDao.deleteVerificationInfo(verificationId, userId);
//        VerificationDto verificationDto = VerificationDto.of(verificationEntity);
//        return verificationDto;
        return;
    }


}
