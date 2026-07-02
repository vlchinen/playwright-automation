const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');


test('logout successfully', async ({page}) => {


    const inventoryPage = new InventoryPage(page);

    await inventoryPage.goto();

    await expect(inventoryPage.inventoryTitle)
        .toHaveText('Products');


    await inventoryPage.logout();


    await expect(page)
        .toHaveURL(/saucedemo.com/);

});