package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Mynft;
import com.ssafy.miraclebird.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MynftRepository extends JpaRepository<Mynft,Long>{

}
