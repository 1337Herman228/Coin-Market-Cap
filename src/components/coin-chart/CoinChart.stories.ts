import CoinChart from "./CoinChart";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CoinChart> = {
    title: "Components/Charts/CoinChart",
    component: CoinChart,
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CoinChart>;

const m5 = 1000 * 60 * 5;

const dataset = [
    {
        date: new Date(Date.now()),
        priceUsd: 58980.911750592815,
    },
    {
        date: new Date(Date.now() + m5 * 1),
        priceUsd: 59125.60956886544,
    },
    {
        date: new Date(Date.now() + m5 * 2),
        priceUsd: 59061.634545572,
    },
    {
        date: new Date(Date.now() + m5 * 3),
        priceUsd: 59012.353536518145,
    },
    {
        date: new Date(Date.now() + m5 * 4),
        priceUsd: 59084.149470845055,
    },
    {
        date: new Date(Date.now() + m5 * 5),
        priceUsd: 58923.26777045651,
    },
    {
        date: new Date(Date.now() + m5 * 6),
        priceUsd: 58795.87178071939,
    },
    {
        date: new Date(Date.now() + m5 * 7),
        priceUsd: 58718.76687867738,
    },
    {
        date: new Date(Date.now() + m5 * 8),
        priceUsd: 58658.56032170626,
    },
    {
        date: new Date(Date.now() + m5 * 9),
        priceUsd: 58646.51712888121,
    },
    {
        date: new Date(Date.now() + m5 * 10),
        priceUsd: 58689.702573541384,
    },
    {
        date: new Date(Date.now() + m5 * 11),
        priceUsd: 58751.151871783986,
    },
    {
        date: new Date(Date.now() + m5 * 12),
        priceUsd: 58806.01418062675,
    },
    {
        date: new Date(Date.now() + m5 * 13),
        priceUsd: 58592.4056771956,
    },
];

export const Default: Story = {
    args: {
        dataset: dataset,
        min: 57000,
    },
};

export const NewColor: Story = {
    args: {
        dataset: dataset,
        min: 57000,
        color: "purple",
    },
};

export const OneHourTimeFormat: Story = {
    args: {
        dataset: dataset,
        min: 57000,
        timeType: "h1",
    },
};

export const OneDayTimeFormat: Story = {
    args: {
        dataset: dataset,
        min: 57000,
        timeType: "d1",
    },
};

export const TimeLanguageRU: Story = {
    args: {
        dataset: dataset,
        min: 57000,
        timeLanguage: "ru-Ru",
    },
};
