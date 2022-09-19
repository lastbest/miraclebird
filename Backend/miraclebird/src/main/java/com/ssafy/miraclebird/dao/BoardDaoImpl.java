package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.dto.BoardDto;
import com.ssafy.miraclebird.entity.Board;
import com.ssafy.miraclebird.repository.Boardrepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BoardDaoImpl implements BoardDao{

    private final Boardrepository boardRepository;

    @Autowired
    public BoardDaoImpl(Boardrepository boardRepository) {
        this.boardRepository = boardRepository;
    }

    @Override
    public Board getBoardById(Long boardIdx) throws Exception {
        Board boardEntity = boardRepository.getById(boardIdx);

        if(boardEntity == null)
            throw new Exception();

        return boardEntity;
    }

    @Override
    public Board updateBoardInfo(BoardDto boardDto) throws Exception {
        Board boardEntity = boardRepository.getById(boardDto.getBoardIdx());

        if (boardEntity != null) {
            boardEntity.setTitle(boardDto.getTitle());
            boardEntity.setContent(boardDto.getContent());
            boardRepository.save(boardEntity);

            return boardEntity;
        }
        else {
            throw new Exception();
        }
    }

}
