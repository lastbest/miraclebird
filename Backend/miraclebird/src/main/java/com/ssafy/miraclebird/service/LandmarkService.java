package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.LandmarkDto;
import com.ssafy.miraclebird.dto.PostDto;

import java.util.List;

public interface LandmarkService {
    LandmarkDto getLandmark(Long landmarkIdx) throws Exception;
    void updateLandmarkSell(LandmarkDto landmarkDto, Long userIdx) throws Exception;
}