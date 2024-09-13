'use client'

const useLocalStorage = () => {

    function getFromLocalStorage(key: string) {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    }
    
    function addToLocalStorage(key: string, value: string) {
        const storedNumbersJson = window.localStorage.getItem(key);
        const storedNumbers = storedNumbersJson ? JSON.parse(storedNumbersJson) : [];
        storedNumbers.push(value);
        window.localStorage.setItem(key, JSON.stringify(storedNumbers));
    }

    function removeFromLocalStorage(key: string, valueToRemove: string) {
    const storedNumbersJson = window.localStorage.getItem(key);
    if (storedNumbersJson) {
        const storedNumbers = JSON.parse(storedNumbersJson);
        const index = storedNumbers.indexOf(valueToRemove);
        if (index !== -1) {
            storedNumbers.splice(index, 1);
            window.localStorage.setItem(key, JSON.stringify(storedNumbers));
        }
    }
    }

    return {addToLocalStorage, removeFromLocalStorage, getFromLocalStorage}
};

export default useLocalStorage