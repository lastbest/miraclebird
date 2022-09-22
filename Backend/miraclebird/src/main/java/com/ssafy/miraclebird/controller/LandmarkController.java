package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.LandmarkDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.service.LandmarkService;
import com.ssafy.miraclebird.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/landmark")
@Api("NFT랜드마크 관련 REST V1")
public class LandmarkController {

    private final LandmarkService landmarkService;

    @Autowired
    public LandmarkController(LandmarkService landmarkService) {
        this.landmarkService = landmarkService;
    }

    @ApiOperation(value = "landmark_idx에 해당하는 NFT랜드마크 정보를 반환한다.", response = LandmarkDto.class)
    @GetMapping("/{landmark_idx}")
    public ResponseEntity<LandmarkDto> getLandmark(@PathVariable("landmark_idx") Long landmarkIdx) {
        LandmarkDto result = null;

        try {
            result = landmarkService.getLandmark(landmarkIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}