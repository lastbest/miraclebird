package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Post;

import java.util.List;

public interface LandmarkDao {
    Landmark getLandmark(Long landmarkIdx) throws Exception;
    void saveLandmark(Landmark landmark) throws Exception;
}