package com.ssafy.miraclebird.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "Challenge")
public class Challenge {

    @Id
    @Column(name = "challenge_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long challengeIdx;

    @Column(nullable = false)
    private String title;

    @Column(nullable = true)
    private String content;

    /* 연관관계 매핑 */
    @OneToMany(mappedBy = "challenge")
    List<Challenger> challenger = new ArrayList<>();
}
