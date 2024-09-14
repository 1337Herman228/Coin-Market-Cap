'use client'

import './CoinTable.scss';
import React, { useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, ConfigProvider, Input, Space, Spin, Table } from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import { useAppSelector } from '@/lib/redux/store';
import { useGetCoinsQuery } from '@/lib/redux/store/services/coinsApi';

import { ICoinsResponse } from '@/lib/interfaces';
import useFormatNumber from '@/lib/hooks/useFormatNumber';
import { useAppDispatch } from '@/lib/hooks/reduxHooks';
import { setCoins, setFavouriteCoins } from '@/lib/redux/store/slices/coincapSlice';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { useRouter } from 'next/navigation';
import FavouriteBtn from '../buttons/favourite-btn/FavouriteBtn';
import StyledError from '../error/StyledError';
import { LoadingOutlined } from '@ant-design/icons';
import PercentModify from '../percent-modify/PercentModify';

interface DataType {

    key: string;
    rank: string;
    symbol: string; //"BTC"
    logo: string; // "https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}}@2x.png"
    name: string; //bitcoin
    priceUsd: string;
    marketCapUsd: string;
    changePercent24Hr: string;
    isAdded: boolean;

  }
  
  type DataIndex = keyof DataType;

const CoinTable = () => {
  
    const router = useRouter();

    const {addToLocalStorage, removeFromLocalStorage, getFromLocalStorage } = useLocalStorage();
    const dispatch = useAppDispatch()

    const {coins, favouriteCoins} = useAppSelector((state) => state.coincap)
    useEffect(() => {
      dispatch(setFavouriteCoins(getFromLocalStorage('selected-coins') || []))
    }, []);
    // console.log('favouriteCoins',favouriteCoins)

    const {formatNumber, formatLargeNumber} = useFormatNumber()

    const [currentPage, setCurrentPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState(25);
    const totalItems = 100;

    const {data, error, isLoading } = useGetCoinsQuery({limit:pageSize, offset:(currentPage - 1) * pageSize})

    useEffect(() => {
      dispatch(setCoins(coins || []))
    }, []);

    // console.log("Current Page:", currentPage);
    // console.log("Offset:", (currentPage - 1) * pageSize);
    if(data) {
      dispatch(setCoins(data || [])) //Почему-то автоматический dispath с помощью onQueryStarted не всегда срабатывает, поэтому приходится диспачить вручную
    }

    const makeTableData = (data: ICoinsResponse) => {

      if(!data) return
      const tableData: DataType[] = []
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
            isAdded: false
        })
      })

      return tableData
    }
    const tableData = makeTableData(coins)

    const selectedCoins = getFromLocalStorage('selected-coins') || []

    // console.log('tableData', tableData)

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef<InputRef>(null);
  
    const handleSearch = (
      selectedKeys: string[],
      confirm: FilterDropdownProps['confirm'],
      dataIndex: DataIndex,
    ) => {
      confirm();
      setSearchText(selectedKeys[0]);
      setSearchedColumn(dataIndex);
    };
  
    const handleReset = (clearFilters: () => void) => {
      clearFilters();
      setSearchText('');
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // setTableLoading(true)
    };
  
    const getColumnSearchProps = (dataIndex: DataIndex): TableColumnType<DataType> => ({
      filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
        <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
          <Input
            ref={searchInput}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            style={{ marginBottom: 8, display: 'block' }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => clearFilters && handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearchText((selectedKeys as string[])[0]);
                setSearchedColumn(dataIndex);
              }}
            >
              Filter
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                close();
              }}
            >
              close
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record[dataIndex]
          .toString()
          .toLowerCase()
          .includes((value as string).toLowerCase()),
      onFilterDropdownOpenChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current?.select(), 100);
        }
      },
      render: (text) =>
        searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ''}
          />
        ) : (
          text
        ),
    });
  
    const columns: TableColumnsType<DataType> = [
      {
        title: '',
        dataIndex: 'isAdded',
        key: 'isAdded',
        width: '0.1%',
        render: (text, record) => 
          <FavouriteBtn isActive={selectedCoins.includes(record.key)} />
      },
      {
        title: '#',
        dataIndex: 'rank',
        key: 'rank',
        width: '0.5%',
        sorter: (a, b) => +b.rank - +a.rank,
      },
      {
        title: '',
        dataIndex: 'logo',
        key: 'logo',
        width: '1%',
        render: (text, record) => 
        <img
          className='coin-logo'
          src={`https://assets.coincap.io/assets/icons/${record.symbol.toLowerCase()}@2x.png`}
          width={24}
          height={24}
        />,
      },
      {
        title: '',
        dataIndex: 'symbol',
        key: 'symbol',
        width: '2%',
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: '5%',
        sorter: (a, b) => a.name.length - b.name.length,
        ...getColumnSearchProps('name'),
      },
      {
        title: 'Price',
        dataIndex: 'priceUsd',
        key: 'priceUsd',
        width: '5%',
        sorter: (a, b) => +b.priceUsd - +a.priceUsd,
        ...getColumnSearchProps('priceUsd'),
        render: (text, record) => 
        <span>
            {"$"+formatNumber(record.priceUsd, 2)}
        </span>
      },
      {
        title: 'Market Cap',
        dataIndex: 'marketCapUsd',
        key: 'marketCapUsd',
        width: '5%',
        sorter: (a, b) => +b.marketCapUsd - +a.marketCapUsd,
        ...getColumnSearchProps('marketCapUsd'),
        render: (text, record) => 
        <span>
            {"$"+formatLargeNumber(record.marketCapUsd)}
        </span>
      },
      {
        title: '24h %',
        dataIndex: 'changePercent24Hr',
        key: 'changePercent24Hr',
        width: '5%',
        sorter: (a, b) => +b.changePercent24Hr - +a.changePercent24Hr,
        ...getColumnSearchProps('changePercent24Hr'),
        render: (text, record) => 
        <>
         <PercentModify value={record.changePercent24Hr}/>
        </>
      },

    ];


    const onTableClick = (event:any, record:DataType) => {
      console.log(event.target.tagName)
      if (event.target.tagName === 'svg' || event.target.tagName === 'path' || event.target.tagName === 'button') {
      
        if (favouriteCoins.includes(record.key)) {
          removeFromLocalStorage('selected-coins', record.key)
        } else {
          addToLocalStorage('selected-coins', record.key)
        }
        const selectedCoins = getFromLocalStorage('selected-coins') || []
        dispatch(setFavouriteCoins(selectedCoins))

      } else {
        router.push(`/currencies/${record.key}`)
      }
    }

    if (error) {
      return (
        <div className='error'>
          <StyledError 
            message='Error loading data' 
            description='Please try again later'
          />
        </div>
      )
    }

    if(isLoading) return (
      <Spin 
        indicator={<LoadingOutlined style={{ fontSize: 50 }} spin />} 
        fullscreen={true} 
        size="large" 
      />
    )

    return (
      <div className='table-wrapper'>
        <ConfigProvider
          theme={{
            token: {
            },
            components: {
              Table: {
                fontWeightStrong: 700,
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
          dataSource={tableData || []} 
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
        </ConfigProvider>
      </div>
    )
    
   
};

export default CoinTable;