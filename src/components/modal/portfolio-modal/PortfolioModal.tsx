import "./PortfolioModal.scss";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import StyledModal from "../styled-modal/StyledModal";
import { useAppSelector } from "@/lib/redux/store";
import { useAppDispatch } from "@/lib/hooks/reduxHooks";
import { setFavouriteCoins } from "@/lib/redux/store/slices/coincapSlice";
import useFormatNumber from "@/lib/hooks/useFormatNumber";
import { ILocalStorageCoinKey } from "@/lib/interfaces";
import useCalculateProfit from "@/lib/hooks/useCalculateProfit";
import PortfolioProfit from "@/components/portfolio-profit/PortfolioProfit";

interface PortfolioModalProps {
    isModalOpen: boolean[];
    toggleModal: (idx: number, target: boolean) => void;
    modalId: number;
}

const PortfolioModal = ({
    isModalOpen,
    toggleModal,
    modalId,
}: PortfolioModalProps) => {
    const dispatch = useAppDispatch();

    const { removeFromLocalStorage, getFromLocalStorage } = useLocalStorage();
    const { allCoins, favouriteCoins } = useAppSelector(
        (state) => state.coincap
    );
    const { formatNumber } = useFormatNumber();

    const deleteCoin = (coin: ILocalStorageCoinKey) => {
        removeFromLocalStorage("selected-coins", coin.id);
        dispatch(
            setFavouriteCoins(getFromLocalStorage("selected-coins") || [])
        );
    };

    const { currentPrice } = useCalculateProfit();

    const formatDate = (milliseconds: number) => {
        const formattedDate = new Date(milliseconds);
        return formattedDate.toLocaleString("en-US", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
        });
    };

    // if(isLoading || !data) return (
    //     <Spin
    //       indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />}
    //     //   fullscreen={true}
    //       size="large"
    //     />
    //   )

    const paintIncome = (value: number) => {
        if (value >= 0) return "color-up";
        else return "color-down";
    };

    return (
        <>
            <StyledModal
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                centered={true}
                modalId={modalId}
            >
                <div data-testId="portfolio-modal" className="_portfolio-modal">
                    <h1 className="title">Your coins</h1>

                    <div className="income">
                        <span>Total: </span>{" "}
                        <PortfolioProfit
                            allCoins={allCoins}
                            favouriteCoins={favouriteCoins}
                        />
                    </div>

                    <div className="col-names">
                        <span>Date</span>
                        <span>Coin</span>
                        <span>Price</span>
                        <span>Qty</span>
                        <span>Total</span>
                        <span>Income</span>
                        <span>Delete</span>
                    </div>

                    <div className="coins-list">
                        {favouriteCoins &&
                            favouriteCoins.map((coin) => (
                                <>
                                    <div
                                        className="coin-item"
                                        key={coin?.id + "item"}
                                    >
                                        <span
                                            className="coin-item__cell"
                                            key={coin?.id + "dateWhenAdded"}
                                        >
                                            {formatDate(coin?.dateWhenAdded)}
                                        </span>
                                        <span
                                            className="coin-item__cell"
                                            key={coin?.id + "coinId"}
                                        >
                                            {coin?.coinId}
                                        </span>
                                        <span
                                            className="coin-item__cell"
                                            key={coin?.id + "priceUsd"}
                                        >
                                            $
                                            {formatNumber(
                                                String(coin?.priceUsd),
                                                0
                                            )}
                                        </span>

                                        <span
                                            className="coin-item__cell coin-item--quantity"
                                            key={coin?.id + "quantity"}
                                        >
                                            {coin?.quantity}
                                        </span>
                                        <span
                                            className="coin-item__cell"
                                            key={coin?.id + "total"}
                                        >
                                            $
                                            {formatNumber(
                                                String(
                                                    coin?.priceUsd *
                                                        coin?.quantity
                                                ),
                                                0
                                            )}
                                        </span>

                                        <span
                                            className={`coin-item__cell ${paintIncome(
                                                Number(
                                                    currentPrice(
                                                        allCoins,
                                                        coin?.coinId
                                                    )
                                                ) - coin?.priceUsd
                                            )}`}
                                            key={coin?.id + "income"}
                                        >
                                            {formatNumber(
                                                String(
                                                    ((Number(
                                                        currentPrice(
                                                            allCoins,
                                                            coin?.coinId
                                                        )
                                                    ) -
                                                        coin?.priceUsd) /
                                                        coin?.priceUsd) *
                                                        100
                                                ),
                                                2
                                            )}
                                            %
                                        </span>

                                        <div className="coin-item__cell coin-item--delete">
                                            <button
                                                data-testId="delete-coin-btn"
                                                key={coin?.id + "delete"}
                                                onClick={() => deleteCoin(coin)}
                                            >
                                                <svg
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 20 20"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15.8333 5.34167L14.6583 4.16667L9.99996 8.825L5.34163 4.16667L4.16663 5.34167L8.82496 10L4.16663 14.6583L5.34163 15.8333L9.99996 11.175L14.6583 15.8333L15.8333 14.6583L11.175 10L15.8333 5.34167Z"
                                                        fill="black"
                                                        fill-opacity="0.87"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </>
                            ))}
                    </div>
                </div>
            </StyledModal>
        </>
    );
};

export default PortfolioModal;
