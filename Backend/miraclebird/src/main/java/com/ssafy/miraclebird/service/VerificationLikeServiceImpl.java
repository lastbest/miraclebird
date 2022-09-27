package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.VerificationLikeDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dao.VerificationDao;
import com.ssafy.miraclebird.dto.VerificationLikeDto;
import com.ssafy.miraclebird.entity.VerificationLike;
import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VerificationLikeServiceImpl implements VerificationLikeService{
    private final VerificationLikeDao verificationLikeDao;
    private final UserDao userDao;
    private final VerificationDao verificationDao;

    @Autowired
    public VerificationLikeServiceImpl(VerificationLikeDao verificationLikeDao, UserDao userDao, VerificationDao verificationDao) {
        this.verificationLikeDao = verificationLikeDao;
        this.userDao = userDao;
        this.verificationDao = verificationDao;
    }

//    @Override
//    @Transactional
//    public List<VerificationLikeDto> getVerificationLikeALL() throws Exception {
//        try {
//            List<VerificationLike> verificationLikeList = verificationLikeDao.getVerificationLikeALL();
//            List<VerificationLikeDto> verificationLikeDtoList = verificationLikeList.stream().map(entity -> VerificationLikeDto.of(entity)).collect(Collectors.toList());
//            for (VerificationLikeDto verificationLikeDto : verificationLikeDtoList) {
//                User user = userDao.getUserById(verificationLikeDto.getUserIdx());
//                Verification verification = verificationDao.getVerificationById(verificationLikeDto.getVerificationIdx());
//                verificationLikeDto.setVerificationLikeerName(user.getName());
//                verificationLikeDto.setSuspectName(verification.getUser().getName());
//            }
//            return verificationLikeDtoList;
//            }
//        catch (Exception e) {
//            throw new Exception();
//        }
//    }

    @Override
    @Transactional
    public VerificationLikeDto getVerificationLikeById(long verificationLikeId) {
        VerificationLike verificationLikeEntity = verificationLikeDao.getVerificationLikeById(verificationLikeId);
        VerificationLikeDto verificationLikeDto = VerificationLikeDto.of(verificationLikeEntity);
        return verificationLikeDto;
    }

    @Override
    @Transactional
    public boolean getVerificationLikeByUser(long verificationId, long userId) {
        boolean result = verificationLikeDao.getVerificationLikeByUser(verificationId, userId);
        return result;
    }

    @Override
    @Transactional
    public void createVerificationLike(VerificationLikeDto verificationLikeDto) throws Exception {
        try {
            VerificationLike verificationLikeEntity = new VerificationLike();

            User user = userDao.getUserById(verificationLikeDto.getUserIdx());
            Verification verification = verificationDao.getVerificationById(verificationLikeDto.getVerificationIdx());

            verificationLikeEntity.setUser(user);
            verificationLikeEntity.setVerification(verification);

            verificationLikeDao.saveVerificationLike(verificationLikeEntity);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
