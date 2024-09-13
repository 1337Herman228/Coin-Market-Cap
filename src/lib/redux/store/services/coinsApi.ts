import { ICoinResponse, ICoinsResponse, IGetCoinByIdQueryParams, IGetCoinsParams } from '@/lib/interfaces'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setCoins, setSelectedCoin } from '../slices/coincapSlice'


// Define a service using a base URL and expected endpoints
export const coinsApi = createApi({
  reducerPath: 'coinsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.coincap.io/v2/' }),
  endpoints: (builder) => ({

    getAllCoins: builder.query<ICoinsResponse, void>({
      query: () => ({
        url:'assets',
        headers: {
            'Accept-Encoding': 'gzip',
        },
      }),
      async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
          const result = await queryFulfilled
          const data = result.data
          dispatch(setCoins(data))
      }
    }),

    getCoins: builder.query<ICoinsResponse, IGetCoinsParams>({
    query: (params) => ({
        url:'assets',
        params,
        headers: {
            'Accept-Encoding': 'gzip',
        },
    }),
    async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled
        const data = result.data
        dispatch(setCoins(data))
    }
    }),

    getCoinById: builder.query<ICoinResponse, IGetCoinByIdQueryParams>({
        query: ({id}) => ({
            url:`assets/${id}`,
            headers: {
                'Accept-Encoding': 'gzip',
            },
        }),
        async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
            const result = await queryFulfilled
            const data = result.data
            dispatch(setSelectedCoin(data))
        }
    }),

  }),
})

export const { useGetCoinsQuery, useGetCoinByIdQuery } = coinsApi