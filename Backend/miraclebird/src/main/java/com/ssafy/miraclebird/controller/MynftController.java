package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.MynftDto;
import com.ssafy.miraclebird.service.MynftService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mynft")
@Api("게시판 관련 REST V1")
public class MynftController {

    private final MynftService mynftService;

    @Autowired
    public MynftController(MynftService mynftService) {
        this.mynftService = mynftService;
    }

    @ApiOperation(value = "NFT를 소유목록에 등록한다.", response = String.class)
    @PostMapping
    public ResponseEntity<String> createMynft(@RequestBody MynftDto mynftDto, @RequestParam("user_idx") Long userIdx) {
        try {
            mynftService.createMynft(mynftDto, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @ApiOperation(value = "특정 유저가 소유한 NFT 목록을 반환한다.", response = MynftDto.class)
    @GetMapping("/{user_idx}")
    public ResponseEntity<List<MynftDto>> getMynft(@PathVariable("user_idx") Long userIdx) {
        List<MynftDto> result = null;

        try {
            result = mynftService.getMynft(userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "mynft_idx 에 해당하는 소유목록 삭제한다.", response = String.class)
    @DeleteMapping("/{mynft_idx}")
    public ResponseEntity<String> deleteMynft(@PathVariable("mynft_idx") Long mynftIdx, @RequestParam("user_idx") Long userIdx) {
        try {
            mynftService.deleteMynft(mynftIdx, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }

    @ApiOperation(value = "landmark_idx 에 해당하는 소유권을 user_idx로 변경한다.", response = String.class)
    @PutMapping("/{landmark_idx}")
    public ResponseEntity<String> updateMynft(@PathVariable("landmark_idx") Long landmarkIdx, @RequestParam("user_idx") Long userIdx) {
        try {
            mynftService.updateMynft(landmarkIdx, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
}