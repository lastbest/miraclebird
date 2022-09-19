package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Board;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class BoardDto {

    private long boardIdx;

    private String title;

    private String content;

    private int hit;

    private long userIdx;

    public static BoardDto of(Board missionEntity) {
        BoardDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, BoardDto.class);

        return missionDto;
    }

}
