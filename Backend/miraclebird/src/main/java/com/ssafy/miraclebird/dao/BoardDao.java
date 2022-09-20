package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.dto.BoardDto;
import com.ssafy.miraclebird.entity.Board;

public interface BoardDao {

    Board getBoardById(Long boardIdx) throws Exception;

    Board updateBoardInfo(BoardDto boardDto) throws Exception;

    void deleteBoardById(Long boardIdx) throws Exception;

}