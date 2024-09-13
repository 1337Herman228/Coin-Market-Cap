'use client'

import CoinTable from '@/components/coin-table/CoinTable';
import './MainPage.scss';

const MainPage = () => {
    return (
        <div className='container'>
            <CoinTable />
        </div>
    );
};

export default MainPage;