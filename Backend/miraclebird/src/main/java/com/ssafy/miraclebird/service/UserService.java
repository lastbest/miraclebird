package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.UserDto;

public interface UserService {

    UserDto getUserById(Long userIdx) throws Exception;

    UserDto updateUserInfo(Long userIdx, String name) throws Exception;

    void updateUserBlacklist(Long userIdx, Long blacklist) throws Exception;
}