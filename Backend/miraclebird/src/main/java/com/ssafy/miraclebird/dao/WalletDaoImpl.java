package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Wallet;
import com.ssafy.miraclebird.repository.WalletRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class WalletDaoImpl implements WalletDao {

    private final WalletRepository walletRepository;

    @Autowired
    public WalletDaoImpl(WalletRepository walletRepository) {
        this.walletRepository = walletRepository;
    }

//    @Override
//    public List<Wallet> getWalletAll() {
//        List<Wallet> walletList = walletRepository.findAll();
//
//        return walletList;
//    }

    @Override
    public Wallet getWallet(Long walletIdx) throws Exception {
        Wallet walletEntity = walletRepository.getById(walletIdx);

        if(walletEntity == null)
            throw new Exception();

        return walletEntity;
    }

    @Override
    public void saveWallet(Wallet wallet) throws Exception {
        try {
            walletRepository.save(wallet);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }

    @Override
    public void deleteWallet(Long walletIdx) throws Exception{
        try {
            walletRepository.deleteById(walletIdx);
        }
        catch (Exception e) {
            throw new Exception();
        }
    }
}
