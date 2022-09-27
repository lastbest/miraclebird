package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Mynft;
import com.ssafy.miraclebird.repository.MynftRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MynftDaoImpl implements MynftDao {

    private final MynftRepository mynftRepository;

    @Autowired
    public MynftDaoImpl(MynftRepository mynftRepository) {
        this.mynftRepository = mynftRepository;
    }

    @Override
    public Mynft getMynft(Long mynftIdx) throws Exception {
        Mynft mynftEntity = mynftRepository.getById(mynftIdx);

        if(mynftEntity == null)
            throw new Exception();

        return mynftEntity;
    }

    @Override
    public void saveMynft(Mynft mynft) throws Exception {
        try {
            mynftRepository.save(mynft);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    public void deleteMynft(Long mynftIdx) throws Exception{
        try {
            mynftRepository.deleteById(mynftIdx);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
