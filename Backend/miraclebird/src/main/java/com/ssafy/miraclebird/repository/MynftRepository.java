package com.ssafy.miraclebird.repository;

import com.ssafy.miraclebird.entity.Mynft;
import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.entity.Wallet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MynftRepository extends JpaRepository<Mynft,Long>{
    public List<Mynft> findAllByWallet(Wallet wallet);
}
