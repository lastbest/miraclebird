package com.ssafy.miraclebird.entity;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "User")
public class User {
    @Id
    @Column(name = "user_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long userIdx;

    @Email
    @Column(nullable = true)
    private String email;

    @Column(nullable = true)
    private String nickname;

    @Column(nullable = true)
    private String wallet;

    @Column(nullable = true)
    private long mira;

    @Column(columnDefinition = "varchar(45) default 'user'")
    private String permission;

    private String role;
    private String provider;
    private String providerId;

    /* 연관관계 매핑 */
    @OneToMany(mappedBy = "user")
    List<Challenger> challenger = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Landmark> landmark = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Board> board = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Comment> comment = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Transaction> transaction = new ArrayList<>();
}
