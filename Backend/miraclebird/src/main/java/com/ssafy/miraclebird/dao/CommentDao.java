package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Post;

import java.util.List;

public interface CommentDao {
    void saveComment(Comment comment) throws Exception;
}