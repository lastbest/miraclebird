package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.CommentDao;
import com.ssafy.miraclebird.dao.LandmarkDao;
import com.ssafy.miraclebird.dao.PostDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dto.LandmarkDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LandmarkServiceImpl implements LandmarkService {

    private final LandmarkDao landmarkDao;

    @Autowired
    public LandmarkServiceImpl(LandmarkDao landmarkDao) {
        this.landmarkDao = landmarkDao;
    }

    @Override
    @Transactional
    public LandmarkDto getLandmark(Long landmarkIdx) throws Exception{
        try {
            Landmark landmarkEntity = landmarkDao.getLandmark(landmarkIdx);
            LandmarkDto landmarkDto = LandmarkDto.of(landmarkEntity);
            landmarkDto.setUserIdx(landmarkEntity.getUser().getUserIdx());
            landmarkDto.setUserName(landmarkEntity.getUser().getName());
            landmarkDto.setUserImageUrl(landmarkEntity.getUser().getImageUrl());

            return landmarkDto;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

}