package com.ssafy.miraclebird.KakaoPush;

import com.ssafy.miraclebird.dao.CommentDao;
import com.ssafy.miraclebird.dao.PostDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
//import com.ssafy.miraclebird.securityOauth.service.auth.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomMessageService {

    @Autowired
    MessageService messageService;

    private final UserDao userDao;

    @Autowired
    public CustomMessageService(UserDao userDao) {
        this.userDao = userDao;
    }

    @Transactional
    public boolean sendMyMessage(Long userIdx, String landmarkName) throws Exception {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("확인하러 가기");
        myMsg.setMobileUrl("https://j7c107.p.ssafy.io/");
        myMsg.setObjType("text");
        myMsg.setWebUrl("https://j7c107.p.ssafy.io/");
        myMsg.setText(landmarkName + " 랜드마크가 판매되었습니다.");

        User user = userDao.getUserById(userIdx);
        String accessToken = user.getKakaoToken();
        //String accessToken = KakaoAuthService.authToken;

        return messageService.sendMessage(accessToken, myMsg);
    }

    @Transactional
    public boolean sendMyMessage(Long userIdx, int check) throws Exception {
        DefaultMessageDto myMsg = new DefaultMessageDto();
        myMsg.setBtnTitle("확인하러 가기");
        myMsg.setMobileUrl("https://j7c107.p.ssafy.io/");
        myMsg.setObjType("text");
        myMsg.setWebUrl("https://j7c107.p.ssafy.io/");
        if (check == 1) {
            myMsg.setText("새로운 댓글이 등록되었습니다.");
        }
        if (check == 2) {
            myMsg.setText("회원님의 인증샷에 좋아요가 눌렸습니다.");
        }
        User user = userDao.getUserById(userIdx);
        String accessToken = user.getKakaoToken();
        //String accessToken = KakaoAuthService.authToken;

        return messageService.sendMessage(accessToken, myMsg);
    }
}