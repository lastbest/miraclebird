package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Challenger;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChallengerDto {
    private long challenger_idx;

    private long user_idx;

    private long challenge_idx;

    public static ChallengerDto of(Challenger missionEntity) {
        ChallengerDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, ChallengerDto.class);

        return missionDto;
    }
}
