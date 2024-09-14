import { LineChart} from '@mui/x-charts/LineChart';
import { memo } from 'react';

  interface CoinChartProps {
    dataset: any;
    min: number;
    timeType?: string;
    timeLanguage?: string;
    color?: string;
  }

const CoinChart = memo( (
  {
    dataset,
    min,
    timeType = 'd1', 
    timeLanguage = 'en-En',
    color = 'var(--c-color-blue-500)',
  }
  :
  CoinChartProps) => {

    const formatTime = (timeType:string)=>{
      switch (timeType) {
        case 'h1':
        return {
          hour: 'numeric',
          minute: 'numeric',
        }
        case 'h12':
        return {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric',
        }
        case 'd1':
        return {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric',
        }
        default:
        return {
          day: 'numeric',
          month: 'short',
          hour: 'numeric',
          minute: 'numeric',
        }
      }
    }

    const currencyFormatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format;

  return (
    <LineChart
      dataset={dataset}
      yAxis={[{
        min: min,
        position:'right',
      }]}
      axisHighlight={{
        x:'line',
        // y:'line',
      }}
      // tooltip={{
      //   axisConten
      // }}
      xAxis={[
        {
          id: 'Years',
          dataKey: 'date',
          scaleType: 'time',
          valueFormatter: (date) => date.toLocaleString( timeLanguage, formatTime(timeType)),
        },
      ]}
      slotProps={{
        legend: { hidden: true }
      }}
      series={[
        {
          id: 'priceUsd',
          label: 'Price',
          dataKey: 'priceUsd',
          stack: 'total',
          // area: true,
          showMark: false,
          color: color,
          valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
        }
      ]}
      width={650}
      height={400}
      // margin={{ left: 70 }}
    />
  );
})

export default CoinChart