
import './InputNumber.scss'

interface InputNumberProps {
    min?: number
    max?: number
    label: string
    stateValue: number
    stateSetter: (value: number) => void
}

const InputNumber = (
    {
        min = 1,
        max = 9999,
        label,
        stateValue,
        stateSetter,

    }:InputNumberProps) => {

    // const [value, setValue] = useState(1);

    const onChange = (currentValue:number) => {
        if(Number(currentValue) > max) stateSetter(max);
        else
        if(Number(currentValue) < min) stateSetter(min);
        else
        stateSetter(Number(currentValue));
    }

    return (
        <div className='input-number'>
            <button
                className='dashboard-btn'
                disabled={stateValue <= min}
                onClick={()=>onChange(stateValue-1)}
            >
                -
            </button>
            <label className='visually-hidden' htmlFor='label'>{label}</label>
            <input
                className='input'
                id={label}
                onChange={(e)=>onChange(Number(e.target.value))}
                type='number'
                value={stateValue}
                min={min}
                max={max}
            />
             <button 
                className='dashboard-btn'
                disabled={stateValue >= max}
                onClick={()=>onChange(stateValue+1)}
            >
                +
            </button>
        </div>

    );
};

export default InputNumber;