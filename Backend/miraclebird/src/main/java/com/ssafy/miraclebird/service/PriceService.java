package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.dto.PriceDto;

import java.util.List;

public interface PriceService {
    void createPrice(PriceDto priceDto) throws Exception;

}