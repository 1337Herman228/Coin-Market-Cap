'use client'

import './CoinTable.scss';
import React, { useEffect, useState } from 'react';
import type {TableColumnsType} from 'antd';
import { ConfigProvider, Table } from 'antd';

import { DataType} from '@/lib/interfaces';
import { useAppDispatch } from '@/lib/hooks/reduxHooks';
import {setFavouriteCoins} from '@/lib/redux/store/slices/coincapSlice';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import BuyCoinModal from '../modal/buy-coin-modal/BuyCoinModal';
import { useMediaQuery } from 'react-responsive';

interface CoinTableProps{
    columns:TableColumnsType<DataType>
    isLoading?:boolean
    tableData: DataType[]
    currentPage: number
    handlePageChange: (page: number) => void
    totalItems: number
}

const CoinTable = (
    {
        columns,
        isLoading,
        tableData,
        currentPage,
        handlePageChange,
        totalItems
    }: CoinTableProps
    ) => {

    const isTabletScreen = useMediaQuery({ query: '(max-width: 1024px)' });
    const isMobileScreen = useMediaQuery({ query: '(max-width: 768px)' });
    
    const router = useRouter();
    const dispatch = useAppDispatch()
    const {addToLocalStorage, removeFromLocalStorage, getFromLocalStorage } = useLocalStorage();
    
   
    // const {coins, favouriteCoins} = useAppSelector((state) => state.coincap)


    const [isModalOpen, setIsModalOpen] = useState([false]);
    const [selectedCoin, setSelectedCoin] = useState<DataType | null>(null)


    useEffect(() => {
        dispatch(setFavouriteCoins(getFromLocalStorage('selected-coins') || []))
    }, []);

    const toggleModal = (idx: number, target: boolean) => {
    setIsModalOpen((p) => {
        p[idx] = target;
        return [...p];
    });
    };

    const selectCoin = (coin: DataType) => {
      setSelectedCoin(coin)
      toggleModal(0, true)
    }

    const onTableClick = (event:any, record:DataType) => {
        if (event.target.tagName === 'svg' || event.target.tagName === 'path' || event.target.tagName === 'button') {
        
            selectCoin(record)
    
        } else {
            router.push(`/currencies/${record.key}`)
        }
    }

    console.log('render CoinTable')
    console.log(tableData)

    return (
        <div className='table-wrapper'>
        <ConfigProvider
          theme={{
            token: {
            },
            components: {
              Table: {
                padding: isMobileScreen ? 4 : isTabletScreen ? 8 : 16,
                fontWeightStrong: 700,
                fontSize: isMobileScreen ? 9 : isTabletScreen ? 10 : 14,
                fontFamily: '"Inter", sans-serif',
                rowHoverBg: 'var(--table-row-hover-bg-color)',
              },
            },
          }}
        >
        <Table 
          style={{fontWeight: 700}}
          columns={columns} 
          loading={isLoading}
          dataSource={tableData} 
          pagination={{
            position: ['bottomCenter'],
            pageSize: 25, // Установите нужное количество строк на странице
            showSizeChanger: false, // Позволяет пользователю выбирать количество строк
            // pageSizeOptions: [10, 20, 50], // Опции для выбора количества строк
            current: currentPage,
            onChange: handlePageChange, // Add onChange handler
            total: totalItems,
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => onTableClick(event,record),
            };
          }}
        />

          <BuyCoinModal 
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            modalId={0}
            coin={selectedCoin}
          />

        </ConfigProvider>
      </div>
    );
};

export default CoinTable;