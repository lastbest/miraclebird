package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Verification;

import java.util.List;

public interface VerificationDao {
    List<Verification> getVerificationALL();
    Verification getVerificationById(long verificationIdx);
    Verification approveVerification(long verificationIdx, long updateApproval) throws Exception;
    void deleteVerificationInfo(long verificationIdx, long userIdx) throws Exception;

}
