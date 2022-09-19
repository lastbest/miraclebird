package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Board;

public interface BoardDao {

    Board getBoardById(Long boardIdx) throws Exception;

}