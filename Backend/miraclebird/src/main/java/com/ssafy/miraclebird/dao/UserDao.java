package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;

public interface UserDao {

    User getUserById(Long userIdx);
}