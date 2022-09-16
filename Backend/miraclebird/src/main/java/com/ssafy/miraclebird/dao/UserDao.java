package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;

public interface UserDao {

    User getUserById(Long userIdx) throws Exception;

    User updateUserInfo(Long userIdx, String name) throws Exception;
}