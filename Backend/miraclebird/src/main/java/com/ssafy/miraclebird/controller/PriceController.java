package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.dto.PriceDto;
import com.ssafy.miraclebird.service.PostService;
import com.ssafy.miraclebird.service.PriceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/price")
@Api("NFT랜드마크 시세 관련 REST V1")
public class PriceController {

    private final PriceService priceService;

    @Autowired
    public PriceController(PriceService priceService) {
        this.priceService = priceService;
    }

    @ApiOperation(value = "새로운 거래 내역을 등록한다.", response = String.class)
    @PostMapping
    public ResponseEntity<String> createPrice(@RequestBody PriceDto priceDto) {
        try {
            priceService.createPrice(priceDto);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }
}