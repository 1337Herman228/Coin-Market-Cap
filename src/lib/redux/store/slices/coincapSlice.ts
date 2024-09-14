import { ICoinHistory, ICoinResponse, ICoinsResponse, IGetFavoriteCoinsParams } from '@/lib/interfaces'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

export interface State {
  coins: ICoinsResponse;

  selectedCoin?: ICoinResponse | null;
  selectedCoinHistory?: ICoinHistory | null;

  favouriteCoins: string[];
}

const initialState: State = {
    coins: {
        data:[],
        timestamp: 0
    },
    selectedCoin: null,
    favouriteCoins: [],
}

export const coincapSlice = createSlice({
  name: 'coincap',
  initialState,
  reducers: {
    setCoins: (state, action: PayloadAction<ICoinsResponse>) => {
      state.coins = action.payload
    },
    setSelectedCoin: (state, action: PayloadAction<ICoinResponse>) => {
        state.selectedCoin = action.payload
    },
    setFavouriteCoins: (state, action: PayloadAction<string[]>) => {
      state.favouriteCoins = action.payload
    },
    setCoinHistory: (state, action: PayloadAction<ICoinHistory>) => {
      state.selectedCoinHistory = action.payload
    },
    // fetchCoins: (state, action: PayloadAction<IGetCoinsParams>) => {
    //   state.isLoading = true
    //   const {data, error, isLoading } = useGetCoinsQuery(action.payload)
    //   if(data) {
    //     state.coins = data
    //     state.isLoading = false
    //   }
    //   if(error) {
    //     state.error = error
    //     state.isLoading = false
    //   }
    // },
  },
})

export const {setCoins, setSelectedCoin, setFavouriteCoins, setCoinHistory} = coincapSlice.actions

export default coincapSlice.reducer