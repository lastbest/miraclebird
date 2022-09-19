package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dao.BoardDao;
import com.ssafy.miraclebird.dto.BoardDto;
import com.ssafy.miraclebird.entity.Board;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class BoardServiceImpl implements BoardService{

    private final BoardDao boardDao;

    @Autowired
    public BoardServiceImpl(BoardDao boardDao) {
        this.boardDao = boardDao;
    }

    @Override
    @Transactional
    public BoardDto getBoardById(Long boardIdx) throws Exception{
        Board boardEntity = boardDao.getBoardById(boardIdx);
        BoardDto boardDto = BoardDto.of(boardEntity);

        return boardDto;
    }

}