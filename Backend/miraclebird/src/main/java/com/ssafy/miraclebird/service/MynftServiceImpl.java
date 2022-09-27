package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.*;
import com.ssafy.miraclebird.dto.MynftDto;
import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Mynft;
import com.ssafy.miraclebird.entity.Wallet;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class MynftServiceImpl implements MynftService {

    private final MynftDao mynftDao;
    private final LandmarkDao landmarkDao;
    private final WalletDao walletDao;

    @Autowired
    public MynftServiceImpl(MynftDao mynftDao, LandmarkDao landmarkDao, WalletDao walletDao) {
        this.mynftDao = mynftDao;
        this.landmarkDao = landmarkDao;
        this.walletDao = walletDao;
    }

    @Override
    @Transactional
    public MynftDto getMynft(Long mynftIdx) throws Exception{
        try {
            Mynft mynftEntity = mynftDao.getMynft(mynftIdx);
            MynftDto mynftDto = MynftDto.of(mynftEntity);

            return mynftDto;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void createMynft(MynftDto mynftDto, Long userIdx) throws Exception {
        try {
            Mynft mynftEntity = new Mynft();
            Landmark landmarkEntity = landmarkDao.getLandmark(mynftDto.getLandmarkIdx());
            Wallet walletEntity = walletDao.getWalletById(mynftDto.getWalletIdx());

            if(walletEntity.getUser().getUserIdx() == userIdx) {
                mynftEntity.setLandmark(landmarkEntity);
                mynftEntity.setWallet(walletEntity);
                mynftDao.saveMynft(mynftEntity);
            }
            else throw new Exception();
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void deleteMynft(Long mynftIdx, Long userIdx) throws Exception {
        Mynft mynftEntity = mynftDao.getMynft(mynftIdx);
        Wallet walletEntity = mynftEntity.getWallet();

        if (walletEntity.getUser().getUserIdx() == userIdx) {
            mynftDao.deleteMynft(mynftIdx);
        }
        else {
            throw new Exception();
        }
    }
}