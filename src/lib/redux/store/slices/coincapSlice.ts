"use client";

import {
    ICoinHistory,
    ICoinResponse,
    ICoinsResponse,
    ILocalStorageCoinKey,
} from "@/lib/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface State {
    coins: ICoinsResponse;
    allCoins: ICoinsResponse;

    selectedCoin?: ICoinResponse | null;
    selectedCoinHistory?: ICoinHistory | null;

    favouriteCoins: ILocalStorageCoinKey[];
}

const initialState: State = {
    allCoins: {
        data: [],
        timestamp: 0,
    },

    coins: {
        data: [],
        timestamp: 0,
    },
    selectedCoin: null,
    favouriteCoins: [],
};

export const coincapSlice = createSlice({
    name: "coincap",
    initialState,
    reducers: {
        setAllCoins: (state, action: PayloadAction<ICoinsResponse>) => {
            state.allCoins = action.payload;
        },
        setCoins: (state, action: PayloadAction<ICoinsResponse>) => {
            state.coins = action.payload;
        },
        setSelectedCoin: (state, action: PayloadAction<ICoinResponse>) => {
            state.selectedCoin = action.payload;
        },
        setFavouriteCoins: (
            state,
            action: PayloadAction<ILocalStorageCoinKey[]>
        ) => {
            state.favouriteCoins = action.payload;
        },
        setCoinHistory: (state, action: PayloadAction<ICoinHistory>) => {
            state.selectedCoinHistory = action.payload;
        },
    },
});

export const {
    setCoins,
    setSelectedCoin,
    setFavouriteCoins,
    setCoinHistory,
    setAllCoins,
} = coincapSlice.actions;

export default coincapSlice.reducer;
