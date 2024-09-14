'use client'
import './CoinPage.scss'
import { useGetCoinByIdQuery, useGetCoinHistoryQuery } from '@/lib/redux/store/services/coinsApi';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ICoinHistory } from '@/lib/interfaces';
import CoinChart from '@/components/coin-chart/CoinChart';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { useAppSelector } from '@/lib/redux/store';
import { useAppDispatch } from '@/lib/hooks/reduxHooks';
import { setFavouriteCoins } from '@/lib/redux/store/slices/coincapSlice';
import FavouriteBtn from '@/components/buttons/favourite-btn/FavouriteBtn';
import Link from 'next/link';
import useFormatNumber from '@/lib/hooks/useFormatNumber';
import StyledError from '@/components/error/StyledError';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PercentModify from '@/components/percent-modify/PercentModify';

const h1 = Date.now() - 1000 * 60 * 60
const h12 = Date.now() - 1000 * 60 * 60 * 12
const d1 = Date.now() - 1000 * 60 * 60 * 24
const now = Date.now()

const CoinPage = () => {

    const pathname = usePathname();
    const coinId = pathname?.split('/').pop();

    const {formatNumber, formatLargeNumber} = useFormatNumber()

    const [start, setStart] = useState(d1)
    const [timeType, setTimeType] = useState('d1')
    const [interval, setInterval] = useState('m15')

    const {data: coin, error: coinError, isLoading: coinIsLoading } = useGetCoinByIdQuery({id:coinId || ''})
    const {data, error, isLoading } = useGetCoinHistoryQuery({id:coinId || '', interval:interval, start:  start, end: now})

    const dispatch = useAppDispatch()
    const {addToLocalStorage, removeFromLocalStorage, getFromLocalStorage } = useLocalStorage();
    const {favouriteCoins} = useAppSelector((state) => state.coincap)
    useEffect(() => {
      dispatch(setFavouriteCoins(getFromLocalStorage('selected-coins') || []))
    }, []);

    const toggleFavouriteCoin = ()=>{
        if (favouriteCoins.includes(coin?.data.id || '')) {
            removeFromLocalStorage('selected-coins', coin?.data.id || '')
        } else {
            addToLocalStorage('selected-coins', coin?.data.id || '')
        }
        const selectedCoins = getFromLocalStorage('selected-coins') || []
        dispatch(setFavouriteCoins(selectedCoins))
    }


    const convertData = (data: ICoinHistory) => {
        // Преобразование данных в нужный формат
        const convertData = data.data.map(point => ({
            date: new Date(point.time), // преобразование времени в объект Date
            priceUsd: parseFloat(point.priceUsd), // преобразование строки в число
        }));

        return convertData
    }

    const set1HourChartSetting = () => {
        setStart(h1)
        setTimeType('h1')
        setInterval('m1')
    }
    const set12HoursChartSetting = () => {
        setStart(h12)
        setTimeType('h12')
        setInterval('m1')
    }
    const set1DayChartSetting = () => {
        setStart(d1)
        setTimeType('d1')
        setInterval('m5')
    }

    const findMin = (data: ICoinHistory)=>{
        return Math.min(...data.data.map(point => parseFloat(point.priceUsd)))
    }

    if(data)
    console.log('convertData',convertData(data))

    if (error) 
    return (
        <div className='error'>
          <StyledError 
            message='Error loading data' 
            description='Please try again later'
          />
        </div>
      )
  
      if(isLoading) return (
        <Spin 
          indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} 
          fullscreen={true} 
          size="large" 
        />
      )
  
    if(data && coinId)
    return (
        <div className='container'>
            <section className='section coin-section'>
                <div className='coin'>
                    <div className='coin__back'>
                        <Link className='coin__back-link' href='/'>Назад</Link>
                    </div>
                    <div className='coin__header'>

                        <img
                            className='coin__header-img'
                            src={`https://assets.coincap.io/assets/icons/${coin?.data.symbol.toLowerCase()}@2x.png`}
                            width={24}
                            height={24}
                        />

                        <span className='coin__header-name'>{coin?.data.name}</span>
                        <span className='coin__header-symbol'>{coin?.data.symbol}</span>
                        <span className='coin__header-rank'> (#{coin?.data.rank})</span>
                        
                        <FavouriteBtn 
                            onClick={toggleFavouriteCoin}
                            isActive={favouriteCoins.includes(coin?.data.id || '')} 
                        />
                    </div>
                    <div className='coin__price'>
                        <span className='coin__price-value'>
                            ${formatNumber( String(coin?.data.priceUsd), 2)}
                        </span>
                        <span className='coin__price-change'>
                            <PercentModify value={formatNumber(coin?.data.changePercent24Hr || '0',2)}/>
                        </span>
                    </div>
                    <div className='coin__info'>
                        <div className='coin__info-row'>
                            <span className='coin__info-row-key'>Market cap</span>
                            <span className='coin__info-row-value'>${formatLargeNumber( String(coin?.data.marketCapUsd))}</span>
                        </div>
                        <div className='coin__info-row'>
                            <span className='coin__info-row-key'>Total supply</span>
                            <span className='coin__info-row-value'>${formatLargeNumber( String(coin?.data.supply))} {coin?.data.symbol}</span>
                        </div>
                        <div className='coin__info-row'>
                            <span className='coin__info-row-key'>Max. supply</span>
                            <span className='coin__info-row-value'>${formatLargeNumber( String(coin?.data.maxSupply))} {coin?.data.symbol}</span>
                        </div>
                    </div>
                </div>
                <div className='chart-container'>
                    <div className='chart-dashboard'>
                        
                        <button 
                            className={`chart-dashboard__btn ${timeType === 'h1' ? 'active' : ''}`} 
                            onClick={set1HourChartSetting}
                        >
                            1 Hour
                        </button>

                        <button 
                            className={`chart-dashboard__btn ${timeType === 'h12' ? 'active' : ''}`} 
                            onClick={set12HoursChartSetting}
                        >
                            12 Hours
                        </button>

                        <button 
                            className={`chart-dashboard__btn ${timeType === 'd1' ? 'active' : ''}`} 
                            onClick={set1DayChartSetting}
                        >
                            1 Day
                        </button>
                    </div>
                    <div className='chart'>
                        <CoinChart 
                            dataset={convertData(data)}
                            min={findMin(data)}
                            timeType={timeType}
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CoinPage;