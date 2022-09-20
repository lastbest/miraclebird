package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Post;

public interface PostDao {

    Post getPost(Long postIdx) throws Exception;

    void saveBoard(Post post) throws Exception;

    void deletePost(Long postIdx) throws Exception;

}