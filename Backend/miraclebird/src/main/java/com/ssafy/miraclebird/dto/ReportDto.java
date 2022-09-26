package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Report;
import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ReportDto {
    private long reportIdx;
    private String description;
    private long reporter;
    private long suspect;

    //유저정보
//    private String reporterName;
//    private String suspectName;

    public static ReportDto of(Report missionEntity) {
        System.out.println("여기리포트디티오");
        ReportDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, ReportDto.class);
        System.out.println("여기 리포트디티오2");
        return missionDto;
    }
}
