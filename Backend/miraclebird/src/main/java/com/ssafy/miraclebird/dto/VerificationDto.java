package com.ssafy.miraclebird.dto;

import com.ssafy.miraclebird.entity.Verification;
import com.ssafy.miraclebird.util.ModelMapperUtils;
import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class VerificationDto {
    private long verification_idx;
    private LocalDate regtime;
    private String selfie;
    private long user;
    private long challenge;
    private long approval;

    public static VerificationDto of(Verification missionEntity) {
        VerificationDto missionDto = ModelMapperUtils.getModelMapper().map(missionEntity, VerificationDto.class);
        return missionDto;
    }
}
