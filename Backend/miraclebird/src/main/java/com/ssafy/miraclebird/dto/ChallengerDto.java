package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Challenge;
import com.ssafy.miraclebird.entity.Challenger;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChallengerDto {
    private long challenger_idx;
    private LocalDate regtime;
    private String selfie;
    private long user;
    private long challenge;
    private long approval;

    public static ChallengerDto of(Challenger missionEntity) {
        ChallengerDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, ChallengerDto.class);
        return missionDto;
    }
}
