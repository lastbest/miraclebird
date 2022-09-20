package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.ChallengerDto;
import com.ssafy.miraclebird.service.ChallengerService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/challenger")
@Api("챌린지 미션 관련 REST V1")
public class ChallengerController {
    private final ChallengerService challengerService;

    @Autowired
    public ChallengerController(ChallengerService challengerService) {
        this.challengerService = challengerService;
    }

    @ApiOperation(value = "모든 챌린지인증샷의 정보를 반환한다.", response = ChallengerDto.class)
    @GetMapping("/")
    public ResponseEntity<List<ChallengerDto>> getChallengerALL() {
        List<ChallengerDto> result = challengerService.getChallengerALL();

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "특정 챌린지인증샷의 정보를 반환한다.", response = ChallengerDto.class)
    @GetMapping("/{challenger_idx}")
    public ResponseEntity<ChallengerDto> getChallengerById(@PathVariable("challenger_idx") Long challengerIdx) {
        ChallengerDto result = challengerService.getChallengerById(challengerIdx);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "특정 챌린지 인증샷을 승인한다.", response = ChallengerDto.class)
    @GetMapping("/approve/{challenger_idx}")
    public ResponseEntity<ChallengerDto> approveChallenger(@PathVariable("challenger_idx") Long challengerIdx) throws Exception {
        ChallengerDto result = challengerService.approveChallenger(challengerIdx, 1);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "특정 챌린지 인증샷을 거절한다.", response = ChallengerDto.class)
    @GetMapping("/decline/{challenger_idx}")
    public ResponseEntity<ChallengerDto> declineChallenger(@PathVariable("challenger_idx") Long challengerIdx) throws Exception {
        ChallengerDto result = challengerService.approveChallenger(challengerIdx, 2);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "특정 챌린지 인증샷을 삭제한다.", response = ChallengerDto.class)
    @DeleteMapping("/{challenger_idx}")
    public ResponseEntity deleteChallengerInfo(@PathVariable("challenger_idx") Long challengerIdx, @RequestParam("user_idx") Long userIdx) throws Exception {
        try {
            challengerService.deleteChallengerInfo(challengerIdx, userIdx);
        } catch (Exception e){
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("challenger delete success", HttpStatus.OK);
    }
}
