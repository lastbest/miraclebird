package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Post;
import com.ssafy.miraclebird.entity.Price;
import com.ssafy.miraclebird.repository.PostRepository;
import com.ssafy.miraclebird.repository.PriceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class PriceDaoImpl implements PriceDao {

    private final PriceRepository priceRepository;

    @Autowired
    public PriceDaoImpl(PriceRepository priceRepository) {
        this.priceRepository = priceRepository;
    }

    @Override
    public void savePrice(Price price) throws Exception {
        try {
            priceRepository.save(price);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
