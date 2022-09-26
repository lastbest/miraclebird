package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.LandmarkDto;
import com.ssafy.miraclebird.dto.PostDto;

import java.util.List;

public interface LandmarkService {
    List<LandmarkDto> getLandmarkAll(Long userIdx) throws Exception;
    LandmarkDto getLandmark(Long landmarkIdx) throws Exception;
    void createLandmark(LandmarkDto landmarkDto, Long userIdx) throws Exception;
    void updateLandmark(LandmarkDto landmarkDto, Long userIdx) throws Exception;
}