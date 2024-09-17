import {
    ICoinHistory,
    ICoinHistoryParams,
    ICoinResponse,
    ICoinsResponse,
    IGetCoinByIdQueryParams,
    IGetCoinsParams,
} from "@/lib/interfaces";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    setAllCoins,
    setCoinHistory,
    setCoins,
    setSelectedCoin,
} from "../slices/coincapSlice";

const API_KEY = "8dd7ca09-d8d9-4686-a941-83ac8788c05d";

const headers = {
    "Accept-Encoding": "gzip",
    Authorization: "Bearer " + API_KEY,
};

// Define a service using a base URL and expected endpoints
export const coinsApi = createApi({
    reducerPath: "coinsApi",
    baseQuery: fetchBaseQuery({ baseUrl: "https://api.coincap.io/v2/" }),
    endpoints: (builder) => ({
        getAllCoins: builder.query<ICoinsResponse, void>({
            query: () => ({
                url: "assets",
                headers: headers,
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                const data = result.data;
                dispatch(setAllCoins(data));
            },
        }),

        getCoins: builder.query<ICoinsResponse, IGetCoinsParams>({
            query: (params) => ({
                url: "assets",
                params,
                headers: headers,
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                const data = result.data;
                dispatch(setCoins(data));
            },
        }),

        getCoinById: builder.query<ICoinResponse, IGetCoinByIdQueryParams>({
            query: ({ id }) => ({
                url: `assets/${id}`,
                headers: headers,
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                const data = result.data;
                dispatch(setSelectedCoin(data));
            },
        }),

        getCoinHistory: builder.query<ICoinHistory, ICoinHistoryParams>({
            query: (params) => ({
                url: `assets/${params.id}/history`,
                params,
                headers: headers,
            }),
            async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                const result = await queryFulfilled;
                const data = result.data;
                dispatch(setCoinHistory(data));
            },
        }),
    }),
});

export const {
    useGetAllCoinsQuery,
    useGetCoinsQuery,
    useGetCoinByIdQuery,
    useGetCoinHistoryQuery,
} = coinsApi;
