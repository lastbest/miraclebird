package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Challenge;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ChallengeDto {
    private long challenge_idx;

    private String title;

    private String content;

    public static ChallengeDto of(Challenge missionEntity) {
        ChallengeDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, ChallengeDto.class);

        return missionDto;
    }
}
