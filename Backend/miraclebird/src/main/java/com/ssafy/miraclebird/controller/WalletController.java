package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.WalletDto;
import com.ssafy.miraclebird.service.WalletService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/wallet")
@Api("지갑 관련 REST V0.9")
public class WalletController {

    private final WalletService walletService;

    @Autowired
    public WalletController(WalletService walletService) {
        this.walletService = walletService;
    }

    @ApiOperation(value = "새로운 게시글을 등록한다.", response = String.class)
    @PostMapping
    public ResponseEntity<String> createWallet(@RequestBody WalletDto walletDto, @RequestParam("user_idx") Long userIdx) {
        try {
            walletService.createWallet(walletDto, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @ApiOperation(value = "wallet_id에 해당하는 게시글 정보를 반환한다.", response = WalletDto.class)
    @GetMapping("/{wallet_idx}")
    public ResponseEntity<WalletDto> getWallet(@PathVariable("wallet_idx") Long walletIdx) {
        WalletDto result = null;

        try {
            result = walletService.getWallet(walletIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

//    @ApiOperation(value = "wallet_idx에 해당하는 게시글 정보를 수정한다.", response = String.class)
//    @PutMapping("/{wallet_idx}")
//    public ResponseEntity<String> updateWallet(@PathVariable("wallet_idx") Long walletIdx, @RequestBody WalletDto walletDto, @RequestParam("user_idx") Long userIdx) {
//        try {
//            walletDto.setWalletIdx(walletIdx);
//            walletService.updateWallet(walletDto, userIdx);
//        }
//        catch (Exception e) {
//            throw new RuntimeException();
//        }
//
//        return new ResponseEntity<String>("success",HttpStatus.OK);
//    }

    @ApiOperation(value = "wallet_idx에 해당하는 게시글 정보를 삭제한다.", response = String.class)
    @DeleteMapping("/{wallet_idx}")
    public ResponseEntity<String> deleteWallet(@PathVariable("wallet_idx") Long walletIdx, @RequestParam("user_idx") Long userIdx) {
        try {
            walletService.deleteWallet(walletIdx, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
}