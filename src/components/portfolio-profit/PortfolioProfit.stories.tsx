import { time, timeStamp } from "console";
import PortfolioProfit from "./PortfolioProfit";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof PortfolioProfit> = {
    title: "Components/Portfolio-Profit/PortfolioProfit",
    component: PortfolioProfit,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof PortfolioProfit>;

export const AdvantageIncome: Story = {
    args: {
        allCoins: {
            data: [
                {
                    id: "bitcoin",
                    rank: "1",
                    symbol: "BTC",
                    name: "Bitcoin",
                    supply: "19755250.0000000000000000",
                    maxSupply: "21000000.0000000000000000",
                    marketCapUsd: "1169148626604.9492160962955000",
                    volumeUsd24Hr: "15150458271.2643568311875016",
                    priceUsd: "59181.6669799141603420",
                    changePercent24Hr: "0.7095749693406580",
                    vwap24Hr: "58243.2616713806589575",
                },
            ],
            timestamp: 0,
        },
        favouriteCoins: [
            {
                id: "09d7da8f-2d1f-4b06-99a4-1e89e5de5ea5",
                coinId: "bitcoin",
                priceUsd: 58031.14142144095,
                quantity: 1,
                dateWhenAdded: 1726509226266,
            },
            {
                id: "2004517b-87ab-405b-9ea4-e19c3ec84403",
                coinId: "bitcoin",
                priceUsd: 58031.14142144095,
                quantity: 1,
                dateWhenAdded: 1726509226407,
            },
            {
                id: "d18c44d6-ac8a-41a6-85f7-264f4a1a66bc",
                coinId: "bitcoin",
                priceUsd: 58031.14142144095,
                quantity: 1,
                dateWhenAdded: 1726509226545,
            },
            {
                id: "1f98e07d-ab48-4dda-aed7-3e3f480e9b5c",
                coinId: "bitcoin",
                priceUsd: 58031.14142144095,
                quantity: 1,
                dateWhenAdded: 1726511275648,
            },
        ],
    },
};

export const DisadvantageIncome: Story = {
    args: {
        allCoins: {
            data: [
                {
                    id: "bitcoin",
                    rank: "1",
                    symbol: "BTC",
                    name: "Bitcoin",
                    supply: "19755250.0000000000000000",
                    maxSupply: "21000000.0000000000000000",
                    marketCapUsd: "1169148626604.9492160962955000",
                    volumeUsd24Hr: "15150458271.2643568311875016",
                    priceUsd: "59181.6669799141603420",
                    changePercent24Hr: "0.7095749693406580",
                    vwap24Hr: "58243.2616713806589575",
                },
            ],
            timestamp: 0,
        },
        favouriteCoins: [
            {
                id: "09d7da8f-2d1f-4b06-99a4-1e89e5de5ea5",
                coinId: "bitcoin",
                priceUsd: 59031.14142144095,
                quantity: 1,
                dateWhenAdded: 1726509226266,
            },
            {
                id: "2004517b-87ab-405b-9ea4-e19c3ec84403",
                coinId: "bitcoin",
                priceUsd: 62031.14142144095,
                quantity: 1,
                dateWhenAdded: 1726509226407,
            },
            {
                id: "d18c44d6-ac8a-41a6-85f7-264f4a1a66bc",
                coinId: "bitcoin",
                priceUsd: 62031.14142144095,
                quantity: 1,
                dateWhenAdded: 1726509226545,
            },
            {
                id: "1f98e07d-ab48-4dda-aed7-3e3f480e9b5c",
                coinId: "bitcoin",
                priceUsd: 62031.14142144095,
                quantity: 1,
                dateWhenAdded: 1726511275648,
            },
        ],
    },
};
