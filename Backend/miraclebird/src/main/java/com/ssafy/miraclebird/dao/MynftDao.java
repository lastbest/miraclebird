package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Mynft;

import java.util.List;

public interface MynftDao {
    Mynft getMynft(Long mynftIdx) throws Exception;
    void saveMynft(Mynft mynft) throws Exception;
    void deleteMynft(Long mynftIdx) throws Exception;
}