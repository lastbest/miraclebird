package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.securityOauth.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserDaoImpl implements UserDao{

    private final UserRepository userRepository;

    @Autowired
    public UserDaoImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public User getUserById(Long userIdx) throws Exception {
        User userEntity = userRepository.getById(userIdx);

        if(userEntity == null)
            throw new Exception();

        return userEntity;
    }

    @Override
    public User updateUserInfo(Long userIdx, String name) throws Exception {

        Optional<User> userEntity = userRepository.findById(userIdx);
        User selectUser = null;

        if(userEntity.isPresent()) {
            selectUser = userEntity.get();
            selectUser.setName(name);
            userRepository.save(selectUser);
        }
        else {
            throw new Exception();
        }

        return selectUser;
    }
}
