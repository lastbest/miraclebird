package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.entity.Price;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PriceRepository extends JpaRepository<Price,Long>{

}
