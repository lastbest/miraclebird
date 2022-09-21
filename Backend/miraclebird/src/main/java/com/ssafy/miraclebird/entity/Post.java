package com.ssafy.miraclebird.entity;

import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.util.ModelMapperUtils;
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
@Table(name = "Post")
public class Post {
    @Id
    @Column(name = "post_idx")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long postIdx;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String content;

    @Column(nullable = false)
    private int hit;

    /* 연관관계 매핑 */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userIdx")
    private User user;

    @OneToMany(mappedBy = "post")
    List<Comment> comment = new ArrayList<>();

    public static Post of(PostDto postDto) {
        Post postEntity = ModelMapperUtils.getModelMapper().map(postDto, Post.class);

        return postEntity;
    }
}
