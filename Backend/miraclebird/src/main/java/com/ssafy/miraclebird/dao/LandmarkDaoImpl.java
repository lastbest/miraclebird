package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.repository.LandmarkRepository;
import com.ssafy.miraclebird.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class LandmarkDaoImpl implements LandmarkDao {

    private final LandmarkRepository landmarkRepository;

    @Autowired
    public LandmarkDaoImpl(LandmarkRepository landmarkRepository) {
        this.landmarkRepository = landmarkRepository;
    }

    @Override
    public Landmark getLandmark(Long landmarkIdx) throws Exception {
        Landmark landmarkEntity = landmarkRepository.getById(landmarkIdx);

        if(landmarkEntity == null) {
            System.out.println("있는데 뭐야??????????????");
            throw new Exception();}

        return landmarkEntity;
    }
}
