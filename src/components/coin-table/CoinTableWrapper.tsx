"use client";

import "./CoinTable.scss";
import React, { useCallback, useEffect, useState } from "react";
import { Spin } from "antd";
import { useAppSelector } from "@/lib/redux/store";
import { useGetCoinsQuery } from "@/lib/redux/store/services/coinsApi";

import { DataType, ICoinsResponse } from "@/lib/interfaces";
import { useAppDispatch } from "@/lib/hooks/reduxHooks";
import { setCoins } from "@/lib/redux/store/slices/coincapSlice";
import StyledError from "../error/StyledError";
import { LoadingOutlined } from "@ant-design/icons";
import CoinTable from "./CoinTable";

const totalItems = 100;

const CoinTableWrapper = () => {
    const dispatch = useAppDispatch();

    const { coins } = useAppSelector((state) => state.coincap);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState(25);

    const { data, error, isLoading } = useGetCoinsQuery({
        limit: pageSize,
        offset: (currentPage - 1) * pageSize,
    });

    useEffect(() => {
        dispatch(setCoins(coins || []));
    }, []);

    if (data) {
        dispatch(setCoins(data || [])); //Почему-то автоматический dispath с помощью onQueryStarted не всегда срабатывает, поэтому приходится диспачить вручную
    }

    if (error) {
        return (
            <div className="error">
                <StyledError
                    message="Error loading data"
                    description="Please try again later"
                />
            </div>
        );
    }

    if (isLoading || !data)
        return (
            <Spin
                indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
                fullscreen={true}
                size="large"
            />
        );

    const makeTableData = (data: ICoinsResponse) => {
        const tableData: DataType[] = [];
        data.data.forEach((coin, index) => {
            tableData.push({
                key: coin.id,
                rank: coin.rank,
                symbol: coin.symbol,
                logo: `https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}}@2x.png`,
                name: coin.name,
                priceUsd: coin.priceUsd,
                marketCapUsd: coin.marketCapUsd,
                changePercent24Hr: coin.changePercent24Hr,
            });
        });

        return tableData;
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <CoinTable
            isLoading={isLoading}
            tableData={makeTableData(coins)}
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalItems={totalItems}
        />
    );
};

export default CoinTableWrapper;
