import CoinInfo from "./CoinInfo";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CoinInfo> = {
    title: "Components/Coin-Info/CoinInfo",
    component: CoinInfo,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CoinInfo>;

export const Default: Story = {
    args: {
        price: 10000,
        changePercent24Hr: "10.00",
        marketCapUsd: 1000000,
        supply: 1000000,
        maxSupply: 1000000,
        symbol: "BTC",
    },
};
