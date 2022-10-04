package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Wallet;
import com.ssafy.miraclebird.securityOauth.domain.entity.user.User;

import java.util.List;

public interface WalletDao {
    Wallet getWalletById(Long walletIdx) throws Exception;
    Wallet getWallet(Long userIdx) throws Exception;
    void saveWallet(Wallet wallet) throws Exception;
    void deleteWallet(Long walletIdx) throws Exception;
    boolean existByUser(User user) throws Exception;
}