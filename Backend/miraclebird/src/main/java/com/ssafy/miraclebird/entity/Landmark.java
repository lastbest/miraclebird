package com.ssafy.miraclebird.entity;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
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
@Table(name = "Landmark")
public class Landmark {

    @Id
    @Column(name = "landmark_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long landmarkIdx;

    @Column(nullable = true)
    private String province;

    @Column(nullable = true)
    private String city;

    @Column(nullable = true, name = "dong_code")
    private int dongCode;

    @Column(nullable = true, name = "token_id")
    private String tokenId;

    @Column(nullable = true)
    private String hash;

    @Column(nullable = true)
    private String title;

    @Column(nullable = true)
    private String content;

    @Column(nullable = true, name = "star_force")
    private int starForce;

    @Column(nullable = true)
    private Boolean selling;

    @Column(nullable = true, name = "sell_price")
    private long sellPrice;

    /* 연관관계 매핑 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userIdx")
    private User user;

    @OneToMany(mappedBy = "landmark")
    List<Price> price = new ArrayList<>();

}
