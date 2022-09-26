package com.ssafy.miraclebird.dao;

import com.ssafy.miraclebird.entity.Wallet;

import java.util.List;

public interface WalletDao {
    Wallet getWallet(Long walletIdx) throws Exception;
    void saveWallet(Wallet wallet) throws Exception;
    void deleteWallet(Long walletIdx) throws Exception;
}