const { test, expect } = require('@playwright/test');

const LoginPage = require('../../pages/LoginPage');
const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage')



test('User can add and remove product to cart', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page)

    await inventoryPage.goto();
    
    await inventoryPage.addProduct(
        'Sauce Labs Backpack'
    );

    await expect(inventoryPage.cartBadge)
        .toHaveText('1');

    await inventoryPage.openCart();

    await expect(
        cartPage.getProduct('Sauce Labs Backpack')
    ).toBeVisible();


    await cartPage.removeProduct(
        'Sauce Labs Backpack'
    );


    await expect(cartPage.cartItems)
        .toHaveCount(0);

});