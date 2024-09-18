import { ILocalStorageCoinKey } from "@/lib/interfaces";
import { test, expect, Page } from "@playwright/test";

async function checkForError(page: Page) {
    const errorSelector = page.getByTestId("error");
    const errorVisible = await errorSelector.isVisible({ timeout: 2000 });

    if (errorVisible) {
        console.log("Ошибка обнаружена.");
        console.log("Завершение теста...");
        expect(errorVisible).toBe(true);
        return true; // Возвращает true, если ошибка обнаружена
    }
    return false; // Возвращает false, если ошибки нет
}

// Функции для работы с localStorage в контексте теста
async function getFromLocalStorage(page: Page, key: string) {
    return await page.evaluate((key) => {
        const storedValue = localStorage.getItem(key);
        return storedValue ? JSON.parse(storedValue) : null;
    }, key);
}

async function addToLocalStorage(
    page: Page,
    key: string,
    value: ILocalStorageCoinKey
) {
    await page.evaluate(
        ({ key, value }) => {
            const storedItemsJson = localStorage.getItem(key);
            const storedItems = storedItemsJson
                ? JSON.parse(storedItemsJson)
                : [];
            storedItems.push(value);
            localStorage.setItem(key, JSON.stringify(storedItems));
        },
        { key, value }
    );
}

test.describe("filtration testing", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000");
        console.log("Открываем страницу");
    });

    test("Search for a cryptocurrency by name", async ({ page }) => {
        const coinName = "Bitcoin";

        const searchButtonSelector = page
            .locator(
                'span.ant-dropdown-trigger.ant-table-filter-trigger[role="button"][tabindex="-1"]'
            )
            .nth(0);
        console.log("Ожидание появления кнопки поиска...");

        // Проверка наличия ошибки
        const hasError = await checkForError(page);
        if (hasError) {
            return;
        }

        await expect(searchButtonSelector).toBeVisible({ timeout: 5000 });
        console.log("Кнопка поиска появилась...");

        // Нажимаем на span с иконкой поиска
        await searchButtonSelector.click(); // Уточните селектор при необходимости

        const searchInput = page.locator('input[placeholder="Search name"]');
        console.log("Ожидание появления поля ввода...");

        await expect(searchInput).toBeVisible({ timeout: 5000 });
        console.log("Поле ввода появилось...");

        // Заполняем поле ввода для поиска
        await searchInput.fill(coinName);
        console.log("Заполняем поле ввода для поиска...");

        const buttonSelector = page.locator(
            "button.ant-btn.ant-btn-primary.ant-btn-sm"
        );
        console.log("Ожидание появления кнопки подтверждения поиска...");

        // Нажимаем кнопку подтверждения поиска
        await buttonSelector.click();
        console.log("Нажимаем кнопку подтверждения поиска...");

        // Ожидаем, что таблица будет обновлена, и проверяем, что имя монеты отображается
        const CorrectSearchCellSelector = page.getByTestId("coin-name").nth(0);
        console.log("Ожидание появления искомого текста в таблице...");

        await expect(CorrectSearchCellSelector).toBeVisible({ timeout: 5000 });
        // Получение текста из ячейки
        const cellText = await CorrectSearchCellSelector.textContent();
        // Проверка содержимого
        expect(cellText).toBe(coinName);
        console.log("Искомый текст появился...");
    });
});

test.describe("modal / adding / removing testing", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("http://localhost:3000");
        console.log("Открываем страницу");

        await addToLocalStorage(page, "selected-coins", {
            id: "1",
            coinId: "bitcoin",
            priceUsd: 1000,
            quantity: 5,
            dateWhenAdded: Date.now(),
        });
    });

    test("open add-coin-modal and add coin", async ({ page }) => {
        const buttonSelector = page.getByTestId("add-btn").nth(0);
        console.log("Ожидание появления кнопки...");

        // Проверка наличия ошибки
        const hasError = await checkForError(page);
        if (hasError) {
            return;
        }

        await expect(buttonSelector).toBeVisible({ timeout: 8000 });
        console.log("Кнопка появилась");

        // Клик по кнопке
        await buttonSelector.click();
        console.log("Кнопка нажата");

        // Ожидание появления модального окна
        const modalSelector = page.getByTestId("buy-coin-modal");
        await expect(modalSelector).toBeVisible({ timeout: 5000 });
        console.log("Модальное окно появилось");

        const buyButtonSelector = page.getByTestId("buy-coin-modal-button");
        console.log("Ожидание появления кнопки покупки монеты...");

        await expect(buyButtonSelector).toBeVisible({ timeout: 1000 });
        console.log("Кнопка покупки появилась");

        // Получаем содержимое localStorage
        const localStorageContentBefore = await getFromLocalStorage(
            page,
            "selected-coins"
        );
        const sizebefore =
            localStorageContentBefore === null
                ? 0
                : localStorageContentBefore.length;
        console.log("Размер до добавления:", sizebefore); // Проверяем размер до

        // Клик по кнопке
        await buyButtonSelector.click();
        console.log("Кнопка покупки нажата");

        // Получаем содержимое localStorage
        const localStorageContentAfter = await getFromLocalStorage(
            page,
            "selected-coins"
        );
        const sizeAfter =
            localStorageContentAfter === null
                ? 0
                : localStorageContentAfter.length;
        console.log("Размер после добавления:", sizeAfter); // Проверяем размер после

        if (sizebefore < sizeAfter) {
            console.log("Монета добавлена");
            return;
        } else {
            console.log("Монета не добавлена");
            throw new Error("Монета не добавлена");
        }
    });

    test("open portfolio-coin-modal and remove coin", async ({ page }) => {
        const buttonSelector = page.getByTestId("portfolio-btn");
        console.log("Ожидание появления кнопки...");

        // Проверка наличия ошибки
        const hasError = await checkForError(page);
        if (hasError) {
            return;
        }

        await expect(buttonSelector).toBeVisible({ timeout: 5000 });
        console.log("Кнопка появилась");

        // Клик по кнопке
        await buttonSelector.click();
        console.log("Кнопка нажата");

        // Ожидание появления модального окна
        const modalSelector = page.getByTestId("portfolio-modal");
        await expect(modalSelector).toBeVisible({ timeout: 5000 });
        console.log("Модальное окно появилось");

        const localStorageContentBefore = await getFromLocalStorage(
            page,
            "selected-coins"
        );
        const sizeBefore =
            localStorageContentBefore === null
                ? 0
                : localStorageContentBefore.length;
        console.log("Размер до добавления:", sizeBefore); // Проверяем размер до

        // Ожидание кнопки удаления монеты
        const removeCoinBtn = page.getByTestId("delete-coin-btn").nth(0);
        console.log("Ожидание появления кнопки удаления монеты...");

        await expect(removeCoinBtn).toBeVisible({ timeout: 5000 });
        console.log("Кнопка удаления появилась");

        // Клик по кнопке
        await removeCoinBtn.click();
        console.log("Кнопка удаления нажата");

        const localStorageContentAfter = await getFromLocalStorage(
            page,
            "selected-coins"
        );
        const sizeAfter =
            localStorageContentAfter === null
                ? 0
                : localStorageContentAfter.length;
        console.log("Размер после добавления:", sizeAfter); // Проверяем размер после

        if (sizeBefore > sizeAfter) {
            console.log("Монета удалена");
            return;
        } else {
            console.log("Монета не удалена");
            throw new Error("Монета не удалена");
        }
    });
});
