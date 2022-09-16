package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.UserDto;

public interface UserService {

    UserDto getUserById(Long userIdx);
}