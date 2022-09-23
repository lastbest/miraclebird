package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Landmark;
import com.ssafy.miraclebird.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LandmarkRepository extends JpaRepository<Landmark,Long>{
    Landmark getByStarForceAndLandmarkInfo_LandmarkInfoIdx(Long starForce, Long landmarkInfoIdx);
}
