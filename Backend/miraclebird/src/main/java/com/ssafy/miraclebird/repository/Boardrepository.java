package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Boardrepository extends JpaRepository<Board,Long>{

}
