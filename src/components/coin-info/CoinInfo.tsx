
import './CoinInfo.scss';
import PercentModify from '@/components/percent-modify/PercentModify';
import useFormatNumber from '@/lib/hooks/useFormatNumber';

interface CoinInfoProps {
    price: number | string,
    changePercent24Hr: string
    marketCapUsd: number | string,
    supply?: number | string,
    maxSupply?: number | string,
    symbol: string
}

const CoinInfo = (
    {
        price,
        changePercent24Hr,
        marketCapUsd,
        supply,
        maxSupply,
        symbol

    }: CoinInfoProps) => {

    const {formatNumber, formatLargeNumber} = useFormatNumber()

    return (
        <>
            <div className='coin-info-block'>
                <div className='coin-price'>
                    <span className='coin-price__value'>
                        ${formatNumber( String(price), 2)}
                    </span>
                    <span className='coin-price__change'>
                        <PercentModify value={formatNumber(changePercent24Hr,2)}/>
                    </span>
                </div>
                <div className='coin-info'>
                    <div className='coin-info__row'>
                        <span className='coin-info__row-key'>Market cap</span>
                        <span className='coin-info__row-value'>${formatLargeNumber( String(marketCapUsd))}</span>
                    </div>
                    {supply &&
                        <div className='coin-info__row'>
                            <span className='coin-info__row-key'>Total supply</span>
                            <span className='coin-info__row-value'>${formatLargeNumber( String(supply))} {symbol}</span>
                        </div>
                    }
                    {maxSupply &&
                        <div className='coin-info__row'>
                            <span className='coin-info__row-key'>Max. supply</span>
                            <span className='coin-info__row-value'>${formatLargeNumber( String(maxSupply))} {symbol}</span>
                        </div>
                    }
                </div>
            </div>
        </>
    );
};

export default CoinInfo;