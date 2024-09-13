

const useFormatNumber = () => {

    const formatNumber = (value: string, toFixed: number) => {

        let number = Number(value)
        let formattedNumber;

        if (Math.abs(number) >= 1) {
            // Округляем до 2 знаков после запятой
            formattedNumber = number.toFixed(toFixed);
        } else {
            // Оставляем 3 значащие цифры
            const precision = 3 - Math.floor(Math.log10(Math.abs(number))) - 1;
            formattedNumber = number.toFixed(precision);
        }

        // Добавляем запятые для удобочитаемости
        let parts = formattedNumber.split('.');
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        
        return parts.join('.');
    }

    function formatLargeNumber(value: string) {

        let number = Number(value)
        // Округляем до нуля знаков после запятой
        let roundedNumber = Math.round(number);
    
        // Преобразуем число в строку с запятыми
        let formattedNumber = roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    
        return formattedNumber;
    }

    return {formatNumber,formatLargeNumber}
};

export default useFormatNumber;