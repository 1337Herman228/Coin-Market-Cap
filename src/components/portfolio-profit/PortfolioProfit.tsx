
import './PortfolioProfit.scss';
import useCalculateProfit from '@/lib/hooks/useCalculateProfit';
import useFormatNumber from '@/lib/hooks/useFormatNumber';
import { useAppSelector } from '@/lib/redux/store';
import React from 'react';

const PortfolioProfit = () => {

    const {formatNumber} = useFormatNumber()
    const {calculateProfit} = useCalculateProfit()
    const {allCoins, favouriteCoins} = useAppSelector((state) => state.coincap)


    const [portfolioPrice, profit, profitPercent] = calculateProfit(allCoins, favouriteCoins)

    const profitView = ()=>{
        if(profit >= 0) return <span className='_income-profit'>
                    +{formatNumber(profit,2)} ({formatNumber(profitPercent,2)}%)
                </span>
        else return <span className='_income-decline'>
                {formatNumber(profit,2)} ({formatNumber(profitPercent,2)}%)
            </span>
    }

    return (
        <div className='_income'>
            <span className='_income-price'>${formatNumber(portfolioPrice,2)}</span>
            {profitView()}
        </div>
    );
};

export default PortfolioProfit;