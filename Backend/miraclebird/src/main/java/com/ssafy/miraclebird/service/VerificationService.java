package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.VerificationDto;
import com.ssafy.miraclebird.entity.Verification;

import java.time.LocalDateTime;
import java.util.List;

public interface VerificationService {
    List<VerificationDto> getVerificationALL();
    VerificationDto getVerificationById(long verificationId);
    void uploadVerification(VerificationDto verificationDto) throws Exception ;
    VerificationDto approveVerification(long verificationId, long updateApproval) throws Exception;
    void deleteVerificationInfo(long verificationId, long userId) throws Exception;
    List<VerificationDto> getVerificationByPeriod(Long userIdx, LocalDateTime startDate, LocalDateTime endDate);
}
