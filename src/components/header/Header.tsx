'use client'

import { useGetAllCoinsQuery, useGetCoinsQuery } from '@/lib/redux/store/services/coinsApi';
import './Header.scss';
import { Skeleton } from 'antd';
import useFormatNumber from '@/lib/hooks/useFormatNumber';
import PercentModify from '../percent-modify/PercentModify';
import StyledButton from '../buttons/styled-button/StyledButton';
import { useEffect, useState } from 'react';
import PortfolioModal from '../modal/portfolio-modal/PortfolioModal';
import { setAllCoins, setFavouriteCoins } from '@/lib/redux/store/slices/coincapSlice';
import { useAppDispatch } from '@/lib/hooks/reduxHooks';
import { useAppSelector } from '@/lib/redux/store';
import useCalculateProfit from '@/lib/hooks/useCalculateProfit';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import PortfolioProfit from '../portfolio-profit/PortfolioProfit';

const Header = () => {

    const dispatch = useAppDispatch()

    const {getFromLocalStorage } = useLocalStorage();
    const {calculateProfit} = useCalculateProfit()
    const {data, error, isLoading } = useGetCoinsQuery({limit:3})
    const {formatNumber} = useFormatNumber()

    const {allCoins, favouriteCoins} = useAppSelector((state) => state.coincap)
    const {data:allCoinsData, error:allCoinsError, isLoading:allCoinsIsLoading } = useGetAllCoinsQuery()
    useEffect(() => {
        dispatch(setAllCoins(allCoinsData || {data:[],timestamp:0}))
        dispatch(setFavouriteCoins(getFromLocalStorage('selected-coins') || []))
    }, []);
    console.log(allCoins)

    const [isModalOpen, setIsModalOpen] = useState([false]);
      const toggleModal = (idx: number, target: boolean) => {
        setIsModalOpen((p) => {
          p[idx] = target;
          return [...p];
        });
      };

    if(isLoading || !data || !allCoins) return (
       <div style={{width:'100%'}}>
            <Skeleton.Button style={{width:'100vw', height:'56px'}} active size='small'/>
       </div> 
    )

    const [portfolioPrice, profit, profitPercent] = calculateProfit(allCoins, favouriteCoins)
    console.log('calculateProfit',portfolioPrice, profit, profitPercent)

    const profitView = ()=>{
        if(profit >= 0) return <span className='portfolio__income-profit'>
                    +{formatNumber(profit,2)} ({formatNumber(profitPercent,2)}%)
                </span>
        else return <span className='portfolio__income-decline'>
                {formatNumber(profit,2)} ({formatNumber(profitPercent,2)}%)
            </span>
    }

    return (
        <header className='header'>
            <div className='popular-coins'>
                {data?.data.map((coin, index) => (
                    <div className='popular-coins__item'>
                        <span className='popular-coins__item-name'>(#{coin.rank}) {coin.name}: </span>
                        <span className='popular-coins__item-price'>${formatNumber(coin.priceUsd,1)}</span>
                        <span className='popular-coins__item-percent'>
                            <PercentModify value={formatNumber(coin.changePercent24Hr,2)}/>
                        </span>
                    </div>
                ))}
            </div>

            <div className='portfolio'>
                    <PortfolioProfit />
                    <StyledButton 
                        isActive={isModalOpen[1]} 
                        onClick={()=> toggleModal(1, true)}
                    >
                        <div className='portfolio__btn'>
                            <svg 
                                className='portfolio__btn-icon'
                                width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6.88 18.9C6.47 18.9 6.13 18.56 6.13 18.15V16.08C6.13 15.67 6.47 15.33 6.88 15.33C7.29 15.33 7.63 15.67 7.63 16.08V18.15C7.63 18.57 7.29 18.9 6.88 18.9Z" fill="#292D32"/>
                                <path d="M12 18.9C11.59 18.9 11.25 18.56 11.25 18.15V14C11.25 13.59 11.59 13.25 12 13.25C12.41 13.25 12.75 13.59 12.75 14V18.15C12.75 18.57 12.41 18.9 12 18.9Z" fill="#292D32"/>
                                <path d="M17.12 18.9C16.71 18.9 16.37 18.56 16.37 18.15V11.93C16.37 11.52 16.71 11.18 17.12 11.18C17.53 11.18 17.87 11.52 17.87 11.93V18.15C17.87 18.57 17.54 18.9 17.12 18.9Z" fill="#292D32"/>
                                <path d="M6.87995 13.18C6.53995 13.18 6.23995 12.95 6.14995 12.61C6.04995 12.21 6.28995 11.8 6.69995 11.7C10.38 10.78 13.62 8.77 16.09 5.9L16.55 5.36C16.82 5.05 17.29 5.01 17.61 5.28C17.92 5.55 17.96 6.02 17.69 6.34L17.23 6.88C14.56 10 11.04 12.17 7.05995 13.16C6.99995 13.18 6.93995 13.18 6.87995 13.18Z" fill="#292D32"/>
                                <path d="M17.1199 9.52C16.7099 9.52 16.3699 9.18 16.3699 8.77V6.6H14.1899C13.7799 6.6 13.4399 6.26 13.4399 5.85C13.4399 5.44 13.7799 5.1 14.1899 5.1H17.1199C17.5299 5.1 17.8699 5.44 17.8699 5.85V8.78C17.8699 9.19 17.5399 9.52 17.1199 9.52Z" fill="#292D32"/>
                                <path d="M15 22.75H9C3.57 22.75 1.25 20.43 1.25 15V9C1.25 3.57 3.57 1.25 9 1.25H15C20.43 1.25 22.75 3.57 22.75 9V15C22.75 20.43 20.43 22.75 15 22.75ZM9 2.75C4.39 2.75 2.75 4.39 2.75 9V15C2.75 19.61 4.39 21.25 9 21.25H15C19.61 21.25 21.25 19.61 21.25 15V9C21.25 4.39 19.61 2.75 15 2.75H9Z" fill="#292D32"/>
                            </svg>
                            <span className='portfolio__btn-text'>Portfolio</span>
                        </div>
                    </StyledButton>
            </div>

            <PortfolioModal 
                isModalOpen={isModalOpen}
                toggleModal={toggleModal}
                modalId={1}
            />

        </header>
    );
};

export default Header;