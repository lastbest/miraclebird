package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.VerificationLikeDto;

import java.util.List;

public interface VerificationLikeService {
//    List<VerificationLikeDto> getVerificationLikeALL() throws Exception;
    VerificationLikeDto getVerificationLikeById(long verificationLikeId);
    boolean getVerificationLikeByUser(long verificationId, long userId);
    void createVerificationLike(VerificationLikeDto verificationLikeDto) throws Exception;
}
