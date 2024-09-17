'use client'

import { useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import type { InputRef, TableColumnsType, TableColumnType } from 'antd';
import { Button, Input, Space} from 'antd';
import type { FilterDropdownProps } from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';

import { DataType} from '@/lib/interfaces';
import useFormatNumber from '@/lib/hooks/useFormatNumber';
import FavouriteBtn from '../buttons/favourite-btn/FavouriteBtn';
import PercentModify from '../percent-modify/PercentModify';
import { useAppSelector } from '@/lib/redux/store';

type DataIndex = keyof DataType;

const TableColumns = () => {

  const {formatNumber, formatLargeNumber} = useFormatNumber()

  const {coins, favouriteCoins} = useAppSelector((state) => state.coincap)

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

  const checkFavouriteCoin = (coinId: string) => {
    favouriteCoins.forEach((coin) => {
      if (coinId === coin.coinId) {
        // console.log(coinId, coin.coinId, coinId === coin.coinId)
        return true
      }
    })
    return false
  }

  console.log('render TableColumns')

    const columns: TableColumnsType<DataType> = [
        {
          title: '',
          dataIndex: 'isAdded',
          key: 'isAdded',
          width: '0.1%',

          render: (text, record) => 
            <FavouriteBtn />
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
            <div style={{width:24}}>
                <img
                  className='coin-logo'
                  src={`https://assets.coincap.io/assets/icons/${record.symbol.toLowerCase()}@2x.png`}
                  width={24}
                  height={24}
                />
            </div>
          ,
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

    return {columns}
};

export default TableColumns;