package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.ChallengeDto;
import com.ssafy.miraclebird.dto.ReportDto;

import java.util.List;

public interface ReportService {
    List<ReportDto> getReportALL();
    ReportDto getReportById(long reportId);
    void createReport(ReportDto reportDto) throws Exception;
}
