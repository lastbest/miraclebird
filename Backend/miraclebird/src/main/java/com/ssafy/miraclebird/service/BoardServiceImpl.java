package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.BoardDao;
import com.ssafy.miraclebird.dao.UserDao;
import com.ssafy.miraclebird.dto.BoardDto;
import com.ssafy.miraclebird.entity.Board;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardServiceImpl implements BoardService{

    private final BoardDao boardDao;
    private final UserDao userDao;

    @Autowired
    public BoardServiceImpl(BoardDao boardDao, UserDao userDao) {
        this.boardDao = boardDao;
        this.userDao = userDao;
    }

    @Override
    @Transactional
    public BoardDto getBoardById(Long boardIdx) throws Exception{
        Board boardEntity = boardDao.getBoardById(boardIdx);
        BoardDto result = BoardDto.of(boardEntity);

        return result;
    }

    @Override
    @Transactional
    public BoardDto updateBoardInfo(BoardDto boardDto, Long userIdx) throws Exception {
        Board boardEntity = boardDao.getBoardById(boardDto.getBoardIdx());
        User userEntity = userDao.getUserById(userIdx);

        if (boardEntity.getUser().getUserIdx() == userEntity.getUserIdx()) {
            Board board = boardDao.updateBoardInfo(boardDto);
            BoardDto result = BoardDto.of(board);

            return result;
        }
        else {
            throw new Exception();
        }

    }

}