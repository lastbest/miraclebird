package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Mynft;
import com.ssafy.miraclebird.entity.Wallet;
import com.ssafy.miraclebird.repository.MynftRepository;
import com.ssafy.miraclebird.repository.WalletRepository;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;
import com.ssafy.miraclebird.securityOauth.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class MynftDaoImpl implements MynftDao {

    private final MynftRepository mynftRepository;
    private final WalletRepository walletRepository;
    private final UserRepository userRepository;

    @Autowired
    public MynftDaoImpl(MynftRepository mynftRepository, WalletRepository walletRepository, UserRepository userRepository) {
        this.mynftRepository = mynftRepository;
        this.walletRepository = walletRepository;
        this.userRepository = userRepository;
    }

    @Override
    public Mynft getMynft(Long userIdx) throws Exception {
        Mynft mynftEntity = mynftRepository.getById(userIdx);

        if(mynftEntity == null)
            throw new Exception();

        return mynftEntity;
    }

    @Override
    public List<Mynft> getMynftAll(Long userIdx) throws Exception {
        User user = userRepository.getById(userIdx);
        Wallet wallet = user.getWallet();
        List<Mynft> mynftList = mynftRepository.findAllByWallet(wallet);

        if(mynftList == null)
            throw new Exception();

        return mynftList;
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
