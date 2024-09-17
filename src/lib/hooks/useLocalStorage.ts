'use client'

import { ILocalStorageCoinKey } from "../interfaces";

// export  interface ILocalStorageCoinKey {
//     coinId: string
//     priceUsd: number
//     quantity: number
// }

const useLocalStorage = () => {

    // function getFromLocalStorage(key: string) {
    //     const storedValue = localStorage.getItem(key);
    //     return storedValue ? JSON.parse(storedValue) : null;
    // }
    
    // function addToLocalStorage(key: string, value: ILocalStorageCoinKey) {
    //     const storedNumbersJson = window.localStorage.getItem(key);
    //     const storedNumbers = storedNumbersJson ? JSON.parse(storedNumbersJson) : [];
    //     storedNumbers.push(value);
    //     window.localStorage.setItem(key, JSON.stringify(storedNumbers));
    // }

    // function removeFromLocalStorage(key: string, valueToRemove: string) {
    // const storedNumbersJson = window.localStorage.getItem(key);
    // if (storedNumbersJson) {
    //     const storedNumbers = JSON.parse(storedNumbersJson);
    //     const index = storedNumbers.indexOf(valueToRemove);
    //     if (index !== -1) {
    //         storedNumbers.splice(index, 1);
    //         window.localStorage.setItem(key, JSON.stringify(storedNumbers));
    //     }
    // }
    // }

    function getFromLocalStorage(key: string): ILocalStorageCoinKey[] | null {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    }
    
    function addToLocalStorage(key: string, value: ILocalStorageCoinKey) {
        const storedItemsJson = localStorage.getItem(key);
        const storedItems: ILocalStorageCoinKey[] = storedItemsJson ? JSON.parse(storedItemsJson) : [];
        
        // Проверка на существование объекта с таким же coinId
        // const existingIndex = storedItems.findIndex(item => item.coinId === value.coinId);
        // if (existingIndex !== -1) {
        //     // Обновляем существующий объект
        //     storedItems[existingIndex] = value;
        // } else {
        //     // Добавляем новый объект
            storedItems.push(value);
        // }
    
        localStorage.setItem(key, JSON.stringify(storedItems));
    }
    
    function removeFromLocalStorage(key: string, idToRemove: string, ) {
        const storedItemsJson = localStorage.getItem(key);
        if (storedItemsJson) {
            const storedItems: ILocalStorageCoinKey[] = JSON.parse(storedItemsJson);
            const filteredItems = storedItems.filter(item => item.id !== idToRemove);
            
            localStorage.setItem(key, JSON.stringify(filteredItems));
        }
    }

    return {addToLocalStorage, removeFromLocalStorage, getFromLocalStorage}
};

export default useLocalStorage