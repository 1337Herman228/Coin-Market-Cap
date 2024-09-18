"use client";

import { ILocalStorageCoinKey } from "../interfaces";

const useLocalStorage = () => {
    function getFromLocalStorage(key: string): ILocalStorageCoinKey[] | null {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    }

    function addToLocalStorage(key: string, value: ILocalStorageCoinKey) {
        const storedItemsJson = localStorage.getItem(key);
        const storedItems: ILocalStorageCoinKey[] = storedItemsJson
            ? JSON.parse(storedItemsJson)
            : [];

        storedItems.push(value);

        localStorage.setItem(key, JSON.stringify(storedItems));
    }

    function removeFromLocalStorage(key: string, idToRemove: string) {
        const storedItemsJson = localStorage.getItem(key);
        if (storedItemsJson) {
            const storedItems: ILocalStorageCoinKey[] =
                JSON.parse(storedItemsJson);
            const filteredItems = storedItems.filter(
                (item) => item.id !== idToRemove
            );

            localStorage.setItem(key, JSON.stringify(filteredItems));
        }
    }

    return { addToLocalStorage, removeFromLocalStorage, getFromLocalStorage };
};

export default useLocalStorage;
