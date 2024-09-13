import { ICoinResponse, ICoinsResponse } from '@/lib/interfaces'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface State {
  coins: ICoinsResponse;
  selectedCoin?: ICoinResponse | null;
}

const initialState: State = {
    coins: {
        data:[],
        timestamp: 0
    },
    selectedCoin: null,
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
  },
})

export const {setCoins, setSelectedCoin} = coincapSlice.actions

export default coincapSlice.reducer