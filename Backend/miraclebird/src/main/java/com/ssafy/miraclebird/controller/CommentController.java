package com.ssafy.miraclebird.controller;

import com.ssafy.miraclebird.dto.CommentDto;
import com.ssafy.miraclebird.dto.PostDto;
import com.ssafy.miraclebird.entity.Comment;
import com.ssafy.miraclebird.service.CommentService;
import com.ssafy.miraclebird.service.PostService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/comment")
@Api("댓글 관련 REST V1")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @ApiOperation(value = "새로운 댓글을 등록한다.", response = Comment.class)
    @PostMapping
    public ResponseEntity<String> createComment(@RequestBody CommentDto commentDto,@RequestParam("post_idx") Long postIdx, @RequestParam("user_idx") Long userIdx) {
        try {
            commentService.createComment(commentDto, postIdx, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @ApiOperation(value = "comment_idx에 해당하는 댓글 정보를 수정한다.", response = String.class)
    @PutMapping("/{comment_idx}")
    public ResponseEntity<String> updateComment(@PathVariable("comment_idx") Long commentIdx, @RequestBody CommentDto commentDto, @RequestParam("user_idx") Long userIdx) {
        try {
            commentDto.setCommentIdx(commentIdx);
            commentService.updateComment(commentDto, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success",HttpStatus.OK);
    }

    @ApiOperation(value = "comment_idx에 해당하는 댓글 정보를 삭제한다.", response = String.class)
    @DeleteMapping("/{comment_idx}")
    public ResponseEntity<String> deletePost(@PathVariable("comment_idx") Long commentIdx, @RequestParam("user_idx") Long userIdx) {
        try {
            commentService.deleteComment(commentIdx, userIdx);
        }
        catch (Exception e) {
            throw new RuntimeException();
        }

        return new ResponseEntity<String>("success", HttpStatus.OK);
    }
}