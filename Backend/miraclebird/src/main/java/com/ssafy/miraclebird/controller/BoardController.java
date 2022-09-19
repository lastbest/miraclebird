package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.BoardDto;
import com.ssafy.miraclebird.service.BoardService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/board")
@Api("게시판 관련 REST V1")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @ApiOperation(value = "board_idx 해당하는 게시글 정보를 반환한다.", response = BoardDto.class)
    @GetMapping("/{board_idx}")
    public ResponseEntity<BoardDto> getBoardById(@PathVariable("board_idx") Long boardIdx) {

        BoardDto result = null;

        try {
            result = boardService.getBoardById(boardIdx);
        } catch (Exception e) {
            throw new RuntimeException();
        }

        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

}