package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Post;

import java.util.List;

public interface LandmarkDao {
    List<Landmark> getLandmarkAll(Long userIdx) throws Exception;
    Landmark getLandmark(Long landmarkIdx) throws Exception;
    Landmark getLandmark(Long starForce, Long landmarkInfoIdx) throws Exception;
    void saveLandmark(Landmark landmark) throws Exception;
}