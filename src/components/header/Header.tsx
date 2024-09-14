'use client'

import { useGetCoinsQuery } from '@/lib/redux/store/services/coinsApi';
import './Header.scss';
import { Skeleton } from 'antd';
import useFormatNumber from '@/lib/hooks/useFormatNumber';
import PercentModify from '../percent-modify/PercentModify';

const Header = () => {

    const {data, error, isLoading } = useGetCoinsQuery({limit:3})
    const {formatNumber} = useFormatNumber()


    if(isLoading) return (
       <div style={{width:'100%'}}>
            <Skeleton.Button style={{width:'100vw', height:'56px'}} active size='small'/>
       </div> 
    )

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
            <div>

            </div>
        </header>
    );
};

export default Header;