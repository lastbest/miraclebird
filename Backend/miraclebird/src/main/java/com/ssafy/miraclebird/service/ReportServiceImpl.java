package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.ReportDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.dto.ReportDto;
import com.ssafy.miraclebird.entity.Report;
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

    @Autowired
    public ReportServiceImpl(ReportDao reportDao, UserDao userDao) {
        this.reportDao = reportDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public List<ReportDto> getReportALL() {
        List<Report> reportList = reportDao.getReportALL();

        List<ReportDto> reportDtoList = reportList.stream().map(entity -> ReportDto.of(entity)).collect(Collectors.toList());
//        for (ReportDto reportDto : reportDtoList) {
//            reportDto.setReporter();
//        }
        return reportDtoList;
        //=============
//        System.out.println("여기1");
//        List<Report> reportEntity = reportDao.getReportALL();
//        System.out.println("여기2");
//        List<ReportDto> reportDtos = new ArrayList<>();
//        System.out.println("여기3");
//        for (int i = 0; i < reportEntity.size(); i++) {
//            System.out.println("여기안에-1");
//            Report report = reportEntity.get(i);
//            System.out.println("여기안에0");
//            ReportDto reportDto = ReportDto.of(report);
//            System.out.println("여기안에1");
//            reportDtos.add(reportDto);
//            System.out.println("여기안에2");
//        }
//        System.out.println("여기4");
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
            User reporter = userDao.getUserById(reportDto.getReporter());
            User suspect = userDao.getUserById(reportDto.getSuspect());
//            reportEntity.setReporter(reporter);
//            reportEntity.setSuspect(suspect);
            reportEntity.setDescription((reportDto.getDescription()));

            reportDao.saveReport(reportEntity);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
