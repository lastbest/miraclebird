package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.VerificationLikeDto;
import com.ssafy.miraclebird.service.VerificationLikeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/verificationLike")
@Api("챌린지 인증샷 좋아요 관련 REST V1")
public class VerificationLikeController {
    private final VerificationLikeService verificationLikeService;

    @Autowired
    public VerificationLikeController(VerificationLikeService verificationLikeService) {
        this.verificationLikeService = verificationLikeService;
    }

//    @ApiOperation(value = "모든 verificationLike의 정보를 반환한다.", response = VerificationLikeDto.class)
//    @GetMapping("/")
//    public ResponseEntity<List<VerificationLikeDto>> getVerificationLikeALL() throws Exception {
//        try{
//            List<VerificationLikeDto> result = verificationLikeService.getVerificationLikeALL();
//
//            return ResponseEntity.status(HttpStatus.OK).body(result);
//        }
//            catch (Exception e) {
//            throw new Exception();
//        }
//    }

//    @ApiOperation(value = "특정 verificationLike의 정보를 반환한다.", response = VerificationLikeDto.class)
//    @GetMapping("/verificationLikeidx/{verificationLike_idx}")
//    public ResponseEntity<VerificationLikeDto> getVerificationLikeById(@PathVariable("verificationLike_idx") Long verificationLikeIdx) {
//        VerificationLikeDto result = verificationLikeService.getVerificationLikeById(verificationLikeIdx);
//
//        return ResponseEntity.status(HttpStatus.OK).body(result);
//    }

    @ApiOperation(value = "특정 유저가 게시물에 좋아요를 눌렀는지 여부를 반환한다.", response = VerificationLikeDto.class)
    @GetMapping("/{verification_idx}")
    public ResponseEntity getVerificationLikeByUser(@PathVariable("verification_idx") Long verificationIdx, @RequestParam("user_idx") Long userIdx) {
        if(verificationLikeService.getVerificationLikeByUser(verificationIdx, userIdx))
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(null);
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }

    @ApiOperation(value = "특정 게시물에 좋아요를 누른다.", response = VerificationLikeDto.class)
    @PostMapping("/{verification_idx}")
    public ResponseEntity<String> createVerificationLike(@PathVariable("verification_idx") Long verificationIdx, @RequestParam("user_idx") Long userIdx) {
        try{
            verificationLikeService.createVerificationLike(verificationIdx, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @ApiOperation(value = "특정 게시물에 좋아요를 취소한다.", response = VerificationLikeDto.class)
    @DeleteMapping("/{verification_idx}")
    public ResponseEntity<String> removeVerificationLike(@PathVariable("verification_idx") Long verificationIdx, @RequestParam("user_idx") Long userIdx) {
        try{
            verificationLikeService.deleteVerificationLike(verificationIdx, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }
}
