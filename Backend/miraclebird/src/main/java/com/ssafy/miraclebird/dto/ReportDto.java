package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Challenge;
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
    private User reporter;
    private User suspect;

    public static ReportDto of(Challenge missionEntity) {
        ReportDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, ReportDto.class);

        return missionDto;
    }
}
