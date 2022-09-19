package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.BoardDto;

public interface BoardService {

    BoardDto getBoardById(Long boardIdx) throws Exception;

}