package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService{

    private final UserDao userDao;

    @Autowired
    public UserServiceImpl(UserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public UserDto getUserById(Long userIdx) throws Exception{
        User userEntity = userDao.getUserById(userIdx);
        UserDto userDto = UserDto.of(userEntity);

        return userDto;
    }

    @Override
    public UserDto updateUserInfo(Long userIdx, String name) throws Exception {
        User userEntity = userDao.updateUserInfo(userIdx, name);
        UserDto userDto = UserDto.of(userEntity);

        return userDto;
    }
}