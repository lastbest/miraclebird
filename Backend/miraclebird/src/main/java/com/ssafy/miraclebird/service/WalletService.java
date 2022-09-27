package com.ssafy.miraclebird.service;

import com.ssafy.miraclebird.dto.WalletDto;

import java.util.List;

public interface WalletService {
//    List<WalletDto> getWalletAll() throws Exception;
    WalletDto getWallet(Long userIdx) throws Exception;
    void createWallet(WalletDto walletDto, Long userIdx) throws Exception;
//    void updateWallet(WalletDto walletDto, Long userIdx) throws Exception;
    void deleteWallet(Long walletIdx, Long userIdx) throws Exception;
}