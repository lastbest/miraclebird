package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.*;
import com.ssafy.miraclebird.dto.LandmarkDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Landmark_Info;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.DataFormatException;

@Service
public class LandmarkServiceImpl implements LandmarkService {

    private final LandmarkDao landmarkDao;
    private final LandmarkInfoDao landmarkInfoDao;
    private final UserDao userDao;

    @Autowired
    public LandmarkServiceImpl(LandmarkDao landmarkDao, LandmarkInfoDao landmarkInfoDao, UserDao userDao) {
        this.landmarkDao = landmarkDao;
        this.landmarkInfoDao = landmarkInfoDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public List<LandmarkDto> getLandmarkAll() throws Exception {
        try {
            List<Landmark> landmarkList = landmarkDao.getLandmarkAll();
            List<LandmarkDto> landmarkDtoList = landmarkList.stream().map(entity -> LandmarkDto.of(entity)).collect(Collectors.toList());

            for (LandmarkDto landmarkDto : landmarkDtoList) {
                Landmark_Info landmarkInfoEntity = landmarkInfoDao.getLandmarkInfo(landmarkDto.getLandmarkInfoIdx());
                landmarkDto.setProvince(landmarkInfoEntity.getProvince());
                landmarkDto.setCity(landmarkInfoEntity.getCity());
                landmarkDto.setDongCode(landmarkInfoEntity.getDongCode());
                landmarkDto.setTitle(landmarkInfoEntity.getTitle());
                landmarkDto.setContent(landmarkInfoEntity.getContent());
            }

            return landmarkDtoList;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public List<LandmarkDto> getLandmarkAllByDongCode(Long dongCode) throws Exception {
        try {
            List<Landmark> landmarkList = landmarkDao.getLandmarkAllByDongCode(dongCode);
            List<LandmarkDto> landmarkDtoList = landmarkList.stream().map(entity -> LandmarkDto.of(entity)).collect(Collectors.toList());

            for (LandmarkDto landmarkDto : landmarkDtoList) {
                Landmark_Info landmarkInfoEntity = landmarkInfoDao.getLandmarkInfo(landmarkDto.getLandmarkInfoIdx());
                landmarkDto.setProvince(landmarkInfoEntity.getProvince());
                landmarkDto.setCity(landmarkInfoEntity.getCity());
                landmarkDto.setDongCode(landmarkInfoEntity.getDongCode());
                landmarkDto.setTitle(landmarkInfoEntity.getTitle());
                landmarkDto.setContent(landmarkInfoEntity.getContent());
            }

            return landmarkDtoList;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public List<LandmarkDto> getLandmarkAllByUser(Long userIdx) throws Exception {
        try {
            List<Landmark> landmarkList = landmarkDao.getLandmarkAllByUser(userIdx);
            List<LandmarkDto> landmarkDtoList = landmarkList.stream().map(entity -> LandmarkDto.of(entity)).collect(Collectors.toList());

            for (LandmarkDto landmarkDto : landmarkDtoList) {
                Landmark_Info landmarkInfoEntity = landmarkInfoDao.getLandmarkInfo(landmarkDto.getLandmarkInfoIdx());
                landmarkDto.setProvince(landmarkInfoEntity.getProvince());
                landmarkDto.setCity(landmarkInfoEntity.getCity());
                landmarkDto.setDongCode(landmarkInfoEntity.getDongCode());
                landmarkDto.setTitle(landmarkInfoEntity.getTitle());
                landmarkDto.setContent(landmarkInfoEntity.getContent());
            }

            return landmarkDtoList;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public LandmarkDto getLandmark(Long landmarkIdx) throws Exception{
        try {
            Landmark landmarkEntity = landmarkDao.getLandmark(landmarkIdx);
            LandmarkDto landmarkDto = LandmarkDto.of(landmarkEntity);
            landmarkDto.setTitle(landmarkEntity.getLandmarkInfo().getTitle());
            landmarkDto.setContent(landmarkEntity.getLandmarkInfo().getContent());
            landmarkDto.setProvince(landmarkEntity.getLandmarkInfo().getProvince());
            landmarkDto.setCity(landmarkEntity.getLandmarkInfo().getCity());
            landmarkDto.setDongCode(landmarkEntity.getLandmarkInfo().getDongCode());
            landmarkDto.setUserIdx(landmarkEntity.getUser().getUserIdx());
            landmarkDto.setUserName(landmarkEntity.getUser().getName());
            landmarkDto.setUserImageUrl(landmarkEntity.getUser().getImageUrl());

            return landmarkDto;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public List<LandmarkDto> getLandmarkAllByLandmarkInfoIdx(Long landmarkInfoIdx) throws Exception {
        try {
            List<Landmark> landmarkList = landmarkDao.getLandmarkAllByLandmarkInfoIdx(landmarkInfoIdx);
            List<LandmarkDto> landmarkDtoList = landmarkList.stream().map(entity -> LandmarkDto.of(entity)).collect(Collectors.toList());

            for (LandmarkDto landmarkDto : landmarkDtoList) {
                Landmark_Info landmarkInfoEntity = landmarkInfoDao.getLandmarkInfo(landmarkDto.getLandmarkInfoIdx());
                landmarkDto.setProvince(landmarkInfoEntity.getProvince());
                landmarkDto.setCity(landmarkInfoEntity.getCity());
                landmarkDto.setDongCode(landmarkInfoEntity.getDongCode());
                landmarkDto.setTitle(landmarkInfoEntity.getTitle());
                landmarkDto.setContent(landmarkInfoEntity.getContent());
            }

            return landmarkDtoList;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public LandmarkDto createLandmark(LandmarkDto landmarkDto, Long userIdx) throws Exception {
        try {
            Landmark landmarkEntity = new Landmark();
            landmarkEntity.setHash(landmarkDto.getHash());
            landmarkEntity.setSelling(true);
            landmarkEntity.setSellPrice(landmarkDto.getSellPrice());
            landmarkEntity.setStarForce(landmarkDto.getStarForce());
            landmarkEntity.setTokenId(landmarkDto.getTokenId());
            landmarkEntity.setJsonPath(landmarkDto.getJsonPath());
            landmarkEntity.setImagePath(landmarkDto.getImagePath());
            landmarkEntity.setLandmarkInfo(landmarkInfoDao.getLandmarkInfo(landmarkDto.getLandmarkInfoIdx()));
            landmarkEntity.setUser(userDao.getUserById(userIdx));
            landmarkEntity = landmarkDao.saveLandmark(landmarkEntity);
            landmarkDto = LandmarkDto.of(landmarkEntity);

            return landmarkDto;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void updateLandmark(LandmarkDto landmarkDto, Long userIdx) throws Exception {
        Landmark landmarkEntity = landmarkDao.getLandmark(landmarkDto.getLandmarkIdx());

        if (landmarkEntity.getUser().getUserIdx() == userIdx && landmarkEntity.getStarForce() == landmarkDto.getStarForce()) {
            landmarkEntity.setSelling(landmarkDto.getSelling());
            landmarkEntity.setSellPrice(landmarkDto.getSellPrice());
            landmarkDao.saveLandmark(landmarkEntity);
        }
        else if (landmarkEntity.getUser().getUserIdx() != userIdx && landmarkEntity.getStarForce() == landmarkDto.getStarForce() && landmarkEntity.getSelling() == true) {
            landmarkEntity.setSelling(false);
            landmarkEntity.setUser(userDao.getUserById(userIdx));
            landmarkDao.saveLandmark(landmarkEntity);
            System.out.println("///////////////////////////////////////////////////1번");

            List<Landmark> landmarkList = landmarkDao.getLandmarkAllByLandmarkInfoIdx(landmarkEntity.getLandmarkInfo().getLandmarkInfoIdx());
            System.out.println("///////////////////////////////////////////////////2번");

            for (Landmark landmark : landmarkList) {
                System.out.println("///////////////////////////////////////////////////3번");

                landmark.setSellPrice(landmarkEntity.getSellPrice());
                System.out.println("///////////////////////////////////////////////////4번");

                landmarkDao.saveLandmark(landmark);
                System.out.println("///////////////////////////////////////////////////5번");

            }
        }
        else if (landmarkEntity.getUser().getUserIdx() == userIdx && landmarkEntity.getStarForce() != landmarkDto.getStarForce()) {
            landmarkEntity.setSelling(false);
            landmarkEntity.setUser(userDao.getUserById((long)1));
            landmarkDao.saveLandmark(landmarkEntity);

            landmarkEntity = landmarkDao.getLandmark(landmarkDto.getStarForce(), landmarkEntity.getLandmarkInfo().getLandmarkInfoIdx());
            landmarkEntity.setSelling(false);
            landmarkEntity.setUser(userDao.getUserById(userIdx));
            landmarkDao.saveLandmark(landmarkEntity);
        }
        else {
            throw new Exception();
        }
    }
}