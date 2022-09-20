package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.PostDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PostServiceImpl implements PostService {

    private final PostDao postDao;
    private final UserDao userDao;

    @Autowired
    public PostServiceImpl(PostDao postDao, UserDao userDao) {
        this.postDao = postDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public PostDto getPost(Long postIdx) throws Exception{
        Post postEntity = postDao.getPost(postIdx);
        PostDto result = PostDto.of(postEntity);

        return result;
    }

    @Override
    @Transactional
    public void createPost(PostDto postDto, Long userIdx) throws Exception {
        Post postEntity = new Post();

        try {
            postEntity.setTitle(postDto.getTitle());
            postEntity.setContent(postDto.getContent());
            postEntity.setHit(0);
            postEntity.setUser(userDao.getUserById(userIdx));
            postDao.saveBoard(postEntity);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void updatePost(PostDto postDto, Long userIdx) throws Exception {
        Post postEntity = postDao.getPost(postDto.getPostIdx());

        if (postEntity.getUser().getUserIdx() == userIdx) {
            postEntity.setTitle(postDto.getTitle());
            postEntity.setContent(postDto.getContent());
            postDao.saveBoard(postEntity);
        }
        else {
            throw new Exception();
        }

    }

    @Override
    @Transactional
    public void deletePost(Long postIdx, Long userIdx) throws Exception {
        Post postEntity = postDao.getPost(postIdx);

        if (postEntity.getUser().getUserIdx() == userIdx) {
            postDao.deletePost(postIdx);
        }
        else {
            throw new Exception();
        }
    }

}