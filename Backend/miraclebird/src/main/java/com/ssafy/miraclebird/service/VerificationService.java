package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.VerificationDto;

import java.util.List;

public interface VerificationService {
    List<VerificationDto> getVerificationALL();
    VerificationDto getVerificationById(long verificationId);
    VerificationDto approveVerification(long verificationId, long updateApproval) throws Exception;
    void deleteVerificationInfo(long verificationId, long userId) throws Exception;
}
