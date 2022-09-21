package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Post;

import java.util.List;

public interface CommentDao {
    Comment getComment(Long commentIdx) throws Exception;
    void saveComment(Comment comment) throws Exception;
}