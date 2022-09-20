package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.PostDto;

public interface PostService {
    PostDto getPost(Long postIdx) throws Exception;
    void createPost(PostDto postDto, Long userIdx) throws Exception;
    void updatePost(PostDto postDto, Long userIdx) throws Exception;
    void deletePost(Long postIdx, Long userIdx) throws Exception;
}