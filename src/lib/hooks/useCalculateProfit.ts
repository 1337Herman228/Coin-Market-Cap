"use client";
import React from "react";
import { ICoinsResponse, ILocalStorageCoinKey } from "../interfaces";

const useCalculateProfit = () => {
    const currentPrice = (allCoins: ICoinsResponse, coinId: string) => {
        const coin = allCoins.data.find((coin) => coin.id === coinId);
        return coin?.priceUsd;
    };

    const calculateProfit = (
        allCoins: ICoinsResponse,
        favouriteCoins: ILocalStorageCoinKey[]
    ) => {
        let portfolioPrice = 0;
        let portfolioPriceCurrent = 0;

        favouriteCoins.forEach((favouriteCoin) => {
            // Calculate portfolio price
            portfolioPrice += favouriteCoin.priceUsd * favouriteCoin.quantity;
            // Calculate portfolio current price
            portfolioPriceCurrent +=
                Number(currentPrice(allCoins, favouriteCoin.coinId)) *
                favouriteCoin.quantity;
        });

        const profit = portfolioPriceCurrent - portfolioPrice;
        const profitPercent =
            ((portfolioPriceCurrent - portfolioPrice) / portfolioPrice) * 100;

        return [portfolioPrice, profit, profitPercent];
    };

    return { currentPrice, calculateProfit };
};

export default useCalculateProfit;
