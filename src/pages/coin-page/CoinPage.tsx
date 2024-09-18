"use client";

import "./CoinPage.scss";
import {
    useGetCoinByIdQuery,
    useGetCoinHistoryQuery,
} from "@/lib/redux/store/services/coinsApi";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { ICoinHistory } from "@/lib/interfaces";
import CoinChart from "@/components/coin-chart/CoinChart";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { useAppDispatch } from "@/lib/hooks/reduxHooks";
import { setFavouriteCoins } from "@/lib/redux/store/slices/coincapSlice";
import FavouriteBtn from "@/components/buttons/favourite-btn/FavouriteBtn";
import Link from "next/link";
import StyledError from "@/components/error/StyledError";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import StyledButton from "@/components/buttons/styled-button/StyledButton";
import BuyCoinModal from "@/components/modal/buy-coin-modal/BuyCoinModal";
import CoinInfo from "@/components/coin-info/CoinInfo";

const h1 = Date.now() - 1000 * 60 * 60;
const h12 = Date.now() - 1000 * 60 * 60 * 12;
const d1 = Date.now() - 1000 * 60 * 60 * 24;
const now = Date.now();

const CoinPage = () => {
    const pathname = usePathname();
    const coinId = pathname?.split("/").pop();

    const dispatch = useAppDispatch();
    const { getFromLocalStorage } = useLocalStorage();

    const [start, setStart] = useState(d1);
    const [timeType, setTimeType] = useState("d1");
    const [interval, setInterval] = useState("m15");
    const [isModalOpen, setIsModalOpen] = useState([false]);

    const {
        data: coin,
        error: coinError,
        isLoading: coinIsLoading,
    } = useGetCoinByIdQuery({ id: coinId || "" });
    const { data, error, isLoading } = useGetCoinHistoryQuery({
        id: coinId || "",
        interval: interval,
        start: start,
        end: now,
    });

    useEffect(() => {
        dispatch(
            setFavouriteCoins(getFromLocalStorage("selected-coins") || [])
        );
    }, []);

    const toggleModal = (idx: number, target: boolean) => {
        setIsModalOpen((p) => {
            p[idx] = target;
            return [...p];
        });
    };

    const convertData = (data: ICoinHistory) => {
        // Преобразование данных в нужный формат
        const convertData = data.data.map((point) => ({
            date: new Date(point.time), // преобразование времени в объект Date
            priceUsd: parseFloat(point.priceUsd), // преобразование строки в число
        }));

        return convertData;
    };

    const set1HourChartSetting = () => {
        setStart(h1);
        setTimeType("h1");
        setInterval("m1");
    };
    const set12HoursChartSetting = () => {
        setStart(h12);
        setTimeType("h12");
        setInterval("m1");
    };
    const set1DayChartSetting = () => {
        setStart(d1);
        setTimeType("d1");
        setInterval("m5");
    };

    const findMin = (data: ICoinHistory) => {
        return Math.min(
            ...data.data.map((point) => parseFloat(point.priceUsd))
        );
    };

    if (data)
        if (error)
            // console.log('convertData',convertData(data))

            return (
                <div className="error">
                    <StyledError
                        message="Error loading data"
                        description="Please try again later"
                    />
                </div>
            );

    if (isLoading || !data || !coin)
        return (
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
                fullscreen={true}
                size="large"
            />
        );

    return (
        <div className="container">
            <section className="section coin-section">
                <div className="coin">
                    <div className="coin__back">
                        <Link className="coin__back-link" href="/">
                            Назад
                        </Link>
                    </div>
                    <div className="coin__header">
                        <img
                            className="coin__header-img"
                            src={`https://assets.coincap.io/assets/icons/${coin?.data.symbol.toLowerCase()}@2x.png`}
                            width={24}
                            height={24}
                        />

                        <span className="coin__header-name">
                            {coin?.data.name}
                        </span>
                        <span className="coin__header-symbol">
                            {coin?.data.symbol}
                        </span>
                        <span className="coin__header-rank">
                            {" "}
                            (#{coin?.data.rank})
                        </span>

                        <FavouriteBtn onClick={() => toggleModal(2, true)} />
                    </div>
                    <CoinInfo
                        price={coin?.data.priceUsd}
                        changePercent24Hr={coin?.data.changePercent24Hr}
                        marketCapUsd={coin?.data.marketCapUsd}
                        supply={coin?.data.supply}
                        maxSupply={coin?.data.maxSupply}
                        symbol={coin?.data.symbol}
                    />
                </div>
                <div className="chart-container">
                    <div className="chart-dashboard">
                        <StyledButton
                            isActive={timeType === "h1"}
                            onClick={set1HourChartSetting}
                        >
                            <span className="uppercase-text">1 Hour</span>
                        </StyledButton>

                        <StyledButton
                            isActive={timeType === "h12"}
                            onClick={set12HoursChartSetting}
                        >
                            <span className="uppercase-text">12 Hours</span>
                        </StyledButton>

                        <StyledButton
                            isActive={timeType === "d1"}
                            onClick={set1DayChartSetting}
                        >
                            <span className="uppercase-text">1 Day</span>
                        </StyledButton>
                    </div>
                    <div className="chart">
                        <CoinChart
                            dataset={convertData(data)}
                            min={findMin(data)}
                            timeType={timeType}
                        />
                    </div>
                </div>
            </section>

            <BuyCoinModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                modalId={2}
                coin={{
                    key: coin?.data.id || "",
                    name: coin?.data.name || "",
                    symbol: coin?.data.symbol || "",
                    priceUsd: coin?.data.priceUsd || "",
                    rank: coin?.data.rank || "",
                    logo:
                        "https://assets.coincap.io/assets/icons/" +
                        coin?.data.symbol.toLowerCase() +
                        "@2x.png",
                    marketCapUsd: coin?.data.marketCapUsd || "",
                    changePercent24Hr: coin?.data.changePercent24Hr || "",
                }}
            />
        </div>
    );
};

export default CoinPage;
