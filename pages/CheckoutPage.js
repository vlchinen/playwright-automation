const { expect } = require('@playwright/test');

class CheckoutPage {

    constructor(page) {

        this.page = page;

        this.firstNameInput =
            page.locator('#first-name');

        this.lastNameInput =
            page.locator('#last-name');

        this.postalCodeInput =
            page.locator('#postal-code');

        this.continueButton =
            page.locator('#continue');

        this.finishButton =
            page.locator('#finish');

        this.productName = page.locator('.inventory_item_name');

        this.productPrice = page.locator('.inventory_item_price');

        this.completeHeader =
            page.locator('.complete-header');
            
        this.paymentInfo = page.locator(
            '[data-test="payment-info-value"]'
        );

        this.shippingInfo = page.locator(
            '[data-test="shipping-info-value"]'
        );

        this.itemTotal =
            page.locator('[data-test="subtotal-label"]');

        this.tax =
            page.locator('[data-test="tax-label"]');

        this.total =
            page.locator('[data-test="total-label"]');
        
        this.itemTotal = page.locator('[data-test="subtotal-label"]');

    }


    async fillInformation(first, last, zip) {

        await this.firstNameInput.fill(first);

        await this.lastNameInput.fill(last);

        await this.postalCodeInput.fill(zip);

        await this.continueButton.click();

    }

    async verifyItemTotal(price) {
        await expect(this.itemTotal)
            .toHaveText(`Item total: ${price}`);
    }

    async verifySummary(itemTotal, tax, total) {

        await expect(this.itemTotal)
            .toHaveText(`Item total: $${itemTotal}`);

        await expect(this.tax)
            .toHaveText(`Tax: $${tax}`);

        await expect(this.total)
            .toHaveText(`Total: $${total}`);

    }

    async finishOrder() {
        await this.finishButton.click();
    }

}

module.exports = CheckoutPage;