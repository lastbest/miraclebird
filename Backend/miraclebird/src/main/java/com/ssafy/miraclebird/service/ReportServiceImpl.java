package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.ReportDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dao.VerificationDao;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.dto.ReportDto;
import com.ssafy.miraclebird.entity.Report;
import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReportServiceImpl implements ReportService{
    private final ReportDao reportDao;
    private final UserDao userDao;
    private final VerificationDao verificationDao;

    @Autowired
    public ReportServiceImpl(ReportDao reportDao, UserDao userDao, VerificationDao verificationDao) {
        this.reportDao = reportDao;
        this.userDao = userDao;
        this.verificationDao = verificationDao;
    }

    @Override
    @Transactional
    public List<ReportDto> getReportALL() throws Exception {
        try {
            List<Report> reportList = reportDao.getReportALL();
            List<ReportDto> reportDtoList = reportList.stream().map(entity -> ReportDto.of(entity)).collect(Collectors.toList());
            for (ReportDto reportDto : reportDtoList) {
                User user = userDao.getUserById(reportDto.getUserIdx());
                Verification verification = verificationDao.getVerificationById(reportDto.getVerificationIdx());
                reportDto.setReporterName(user.getName());
                reportDto.setSuspectName(verification.getUser().getName());
            }
            return reportDtoList;
            }
        catch (Exception e) {
            throw new Exception();
        }
        //=============
//        List<Report> reportEntity = reportDao.getReportALL();
//        List<ReportDto> reportDtos = new ArrayList<>();
//        for (int i = 0; i < reportEntity.size(); i++) {
//            Report report = reportEntity.get(i);
//            ReportDto reportDto = ReportDto.of(report);
//            reportDtos.add(reportDto);
//        }
//        return reportDtos;
    }

    @Override
    @Transactional
    public ReportDto getReportById(long reportId) {
        Report reportEntity = reportDao.getReportById(reportId);
        ReportDto reportDto = ReportDto.of(reportEntity);
        return reportDto;
    }

    @Override
    @Transactional
    public void createReport(ReportDto reportDto) throws Exception {
        try {
            Report reportEntity = new Report();
            User user = userDao.getUserById(reportDto.getUserIdx());
            Verification verification = verificationDao.getVerificationById(reportDto.getVerificationIdx());
            reportEntity.setUser(user);
            reportEntity.setVerification(verification);
            reportEntity.setDescription((reportDto.getDescription()));

            reportDao.saveReport(reportEntity);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
