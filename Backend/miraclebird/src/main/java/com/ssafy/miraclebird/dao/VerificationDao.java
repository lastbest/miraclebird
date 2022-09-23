package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Verification;

import java.time.LocalDateTime;
import java.util.List;

public interface VerificationDao {
    List<Verification> getVerificationALL();
    Verification getVerificationById(long verificationIdx);
    void saveVerification(Verification verification) throws Exception ;
    Verification approveVerification(long verificationIdx, long updateApproval) throws Exception;
    void deleteVerificationInfo(long verificationIdx, long userIdx) throws Exception;
    List<Verification> getVerificationByPeriod(Long userIdx, LocalDateTime startDate, LocalDateTime endDate);
}
