"use client";

import "./BuyCoinModal.scss";
import StyledModal from "../styled-modal/StyledModal";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "@/lib/hooks/reduxHooks";
import { setFavouriteCoins } from "@/lib/redux/store/slices/coincapSlice";
import { DataType } from "@/lib/interfaces";
import CoinInfo from "@/components/coin-info/CoinInfo";
import InputNumber from "@/components/inputs/quantity-input/InputNumber";
import { useState } from "react";
import useFormatNumber from "@/lib/hooks/useFormatNumber";
import { notification } from "antd";
import zIndex from "@mui/material/styles/zIndex";

interface BuyCoinModalProps {
    isModalOpen: boolean[];
    toggleModal: (idx: number, target: boolean) => void;
    modalId: number;
    coin: DataType | null;
}

const BuyCoinModal = ({
    isModalOpen,
    toggleModal,
    modalId,
    coin,
}: BuyCoinModalProps) => {
    const [api, contextHolder] = notification.useNotification();

    const openNotification = () => {
        api.success({
            message: `Coin added to portfolio`,
            placement: "top",
        });
    };

    const { formatNumber } = useFormatNumber();
    const { addToLocalStorage, getFromLocalStorage } = useLocalStorage();

    const dispatch = useAppDispatch();

    const [quantity, setQuantity] = useState(1);

    const buyCoin = (quantity: number) => {
        if (coin) {
            addToLocalStorage("selected-coins", {
                id: uuidv4(),
                coinId: coin?.key,
                priceUsd: Number(coin?.priceUsd),
                quantity: quantity,
                dateWhenAdded: Date.now(),
            });
            dispatch(
                setFavouriteCoins(getFromLocalStorage("selected-coins") || [])
            );
            openNotification();
        }
    };

    if (coin)
        return (
            <StyledModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                centered={true}
                modalId={modalId}
            >
                <div data-testId="buy-coin-modal" className="buy-coin-modal">
                    <div className="title">
                        <img
                            className="title__img"
                            src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                            width={24}
                            height={24}
                        />
                        <span className="title__name">{coin.name}</span>
                        <span className="title__symbol">{coin.symbol}</span>
                        <span className="title__rank"> (#{coin.rank})</span>
                    </div>
                    <div className="body">
                        <CoinInfo
                            price={coin?.priceUsd}
                            changePercent24Hr={coin.changePercent24Hr}
                            marketCapUsd={coin.marketCapUsd}
                            symbol={coin.symbol}
                        />
                    </div>
                    <div className="footer">
                        <div className="footer__sum">
                            <span>Сумма:</span>
                            <span>
                                {" "}
                                $
                                {formatNumber(
                                    String(quantity * Number(coin?.priceUsd)),
                                    2
                                )}
                            </span>
                        </div>
                        <div className="footer__input">
                            <InputNumber
                                stateValue={quantity}
                                stateSetter={setQuantity}
                                label="кол-во"
                                min={1}
                                max={9999}
                            />
                        </div>
                        <div className="footer__button">
                            <button
                                data-testId="buy-coin-modal-button"
                                className="footer__button-buy"
                                onClick={() => buyCoin(quantity)}
                            >
                                Купить
                            </button>
                        </div>
                    </div>
                </div>
                {contextHolder}
            </StyledModal>
        );
};

export default BuyCoinModal;
