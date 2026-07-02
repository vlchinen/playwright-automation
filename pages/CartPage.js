class CartPage {

    constructor(page){

        this.page = page;

        this.cartItems = page.locator('.cart_item');

        this.productNames = page.locator('.inventory_item_name');

        this.checkoutButton = page.locator('#checkout');

        this.cartLink = page.locator('.shopping_cart_link');

        
    }

    getProduct(productName){

        return this.page
            .locator('.cart_item')
            .filter({
                hasText: productName
            });

    }

    async removeProduct(productName){

        const product = this.page
            .locator('.cart_item')
            .filter({
                hasText: productName
            });

        await product
            .getByRole('button', {
                name: 'Remove'
            })
            .click();
    }

    async checkout(){

        await this.checkoutButton.click();

    }

    async openCart(){

        await this.cartLink.click();

    }

}


module.exports = CartPage;