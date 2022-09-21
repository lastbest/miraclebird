package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.CommentDao;
import com.ssafy.miraclebird.dao.PostDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dto.CommentDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentDao commentDao;
    private final UserDao userDao;
    private final PostDao postDao;

    @Autowired
    public CommentServiceImpl(CommentDao commentDao, PostDao postDao, UserDao userDao) {
        this.commentDao = commentDao;
        this.postDao = postDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public void createComment(CommentDto commentDto, Long postIdx, Long userIdx) throws Exception {
        try {
            Comment commentEntity = new Comment();
            commentEntity.setContent(commentDto.getContent());
            commentEntity.setRegtime(LocalDateTime.now());
            commentEntity.setPost(postDao.getPost(postIdx));
            commentEntity.setUser(userDao.getUserById(userIdx));
            commentDao.saveComment(commentEntity);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

}