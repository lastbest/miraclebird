package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.ReportDto;
import com.ssafy.miraclebird.service.ReportService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/report")
@Api("챌린지 미션 관련 REST V1")
public class ReportController {
    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @ApiOperation(value = "모든 Report의 정보를 반환한다.", response = ReportDto.class)
    @GetMapping("/")
    public ResponseEntity<List<ReportDto>> getReportALL() {
        List<ReportDto> result = reportService.getReportALL();

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "특정 Report의 정보를 반환한다.", response = ReportDto.class)
    @GetMapping("/{report_idx}")
    public ResponseEntity<ReportDto> getReportById(@PathVariable("report_idx") Long reportIdx) {
        ReportDto result = reportService.getReportById(reportIdx);

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "특정 Report의 정보를 등록한다.", response = ReportDto.class)
    @PostMapping
    public ResponseEntity<String> createReport(@RequestBody ReportDto reportDto) {
        try{
            reportService.createReport(reportDto);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }
}
