package com.ssafy.miraclebird.entity;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDate;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Verification")
public class Verification {
    @Id
    @Column(name = "verification_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long verificationIdx;

    @Column(nullable = false)
    private long approval;

    @Column(nullable = true)
    private LocalDate regtime;

    @Column(nullable = true)
    private String selfie;

    /* 연관관계 매핑 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userIdx")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "challengeIdx")
    private Challenge challenge;

}
