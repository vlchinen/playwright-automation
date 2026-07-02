const { test, expect } = require('@playwright/test');

const InventoryPage = require('../../pages/InventoryPage');
const CartPage = require('../../pages/CartPage');
const CheckoutPage = require('../../pages/CheckoutPage');

test('User can checkout product successfully', async ({ page }) => {

    const inventoryPage = new InventoryPage(page);
    const cartPage = new CartPage(page);
    const checkoutPage = new CheckoutPage(page);

    const productName = 'Sauce Labs Bike Light';

    await inventoryPage.goto();

    const price = await inventoryPage.getProductPrice(productName);

    await inventoryPage.addProduct(productName);

    await inventoryPage.openCart();

    await cartPage.checkout();

    await checkoutPage.fillInformation(
        'ga',
        'con',
        '70000'
    );

    await expect(checkoutPage.productName)
        .toHaveText(productName);

    await expect(checkoutPage.productPrice)
        .toHaveText(price);

    await expect(checkoutPage.paymentInfo)
        .toHaveText('SauceCard #31337');

    await expect(checkoutPage.shippingInfo)
        .toHaveText('Free Pony Express Delivery!');

    await checkoutPage.verifyItemTotal(price);

    await checkoutPage.finishOrder();

    await expect(checkoutPage.completeHeader)
        .toHaveText('Thank you for your order!');

});