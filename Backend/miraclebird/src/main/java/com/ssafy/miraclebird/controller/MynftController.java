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

    @ApiOperation(value = "mynft_id에 해당하는 게시글 정보를 반환한다.", response = MynftDto.class)
    @GetMapping("/{mynft_idx}")
    public ResponseEntity<MynftDto> getMynft(@PathVariable("mynft_idx") Long mynftIdx) {
        MynftDto result = null;

        try {
            result = mynftService.getMynft(mynftIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "mynft_idx에 해당하는 게시글 정보를 삭제한다.", response = String.class)
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
}