package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.UserDto;
import com.ssafy.miraclebird.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Api("유저 관련 REST V1")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @ApiOperation(value = "user_idx에 해당하는 유저 정보를 반환한다.", response = UserDto.class)
    @GetMapping("/{user_idx}")
    public ResponseEntity<UserDto> getUserById(@PathVariable("user_idx") Long userIdx) {

        UserDto result = null;

        try {
            result = userService.getUserById(userIdx);
        } catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @ApiOperation(value = "user_idx에 해당하는 유저 정보를 수정한다.", response = UserDto.class)
    @PutMapping("/{user_idx}")
    public ResponseEntity<UserDto> updateUserInfo(@PathVariable("user_idx") Long userIdx, @RequestParam("name") String name) {

        UserDto result = null;

        try {
            result = userService.updateUserInfo(userIdx, name);
        } catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}