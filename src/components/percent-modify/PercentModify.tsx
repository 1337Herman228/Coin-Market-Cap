
import './PercentModify.scss';
import useFormatNumber from '@/lib/hooks/useFormatNumber';

const PercentModify = ({value}:{value:number|string}) => {

    const {formatNumber} = useFormatNumber()

    return (
        <>
            {Number(value) < 0 ? 
                <span className='table-down-cell'>
                    <span className='down-symbol'/>
                    <span className='table-down-cell__text'>{(formatNumber(String(value), 2)+"%").replace("-","")}</span>
                </span>
                :
                <span className='table-grow-cell'>
                    <span className='grow-symbol'/>
                    <span className='table-grow-cell__text'>{formatNumber(String(value), 2)+"%"}</span>
                </span>
            }
        </>
    );
};

export default PercentModify;