package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.PostDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.Role;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<PostDto> getPostAll() throws Exception {
        try {
            List<Post> postList = postDao.getPostAll();
            List<PostDto> postDtoList = postList.stream().map(entity -> PostDto.of(entity)).collect(Collectors.toList());

            for (PostDto postDto : postDtoList) {
                User userEntity = userDao.getUserById(postDto.getUserIdx());
                postDto.setRole(userEntity.getRole());
            }

            return postDtoList;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public PostDto getPost(Long postIdx) throws Exception{
        try {
            Post postEntity = postDao.getPost(postIdx);
            PostDto postDto = PostDto.of(postEntity);

            return postDto;
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    @Transactional
    public void createPost(PostDto postDto, Long userIdx) throws Exception {
        try {
            Post postEntity = new Post();
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