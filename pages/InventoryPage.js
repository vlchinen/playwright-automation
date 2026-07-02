class InventoryPage {

    constructor(page){

        this.page = page;

        this.menuButton = page.locator('#react-burger-menu-btn');

        this.logoutButton = page.locator('#logout_sidebar_link');

        this.inventoryName = page.locator('.inventory_item_name');

        this.inventoryTitle = page.locator('.title');

        this.cartBadge = page.locator('.shopping_cart_badge');

        this.cartLink = page.locator('.shopping_cart_link');
        
    }

    async goto() {

        await this.page.goto('/inventory.html');

    }

    async addProduct(productName){

        const product = this.page
            .locator('.inventory_item')
            .filter({
                hasText: productName
            });

        await product
            .getByRole('button')
            .click();

    }


    async openCart(){

        await this.page
            .locator('.shopping_cart_link')
            .click();

    }
    
    async getProductPrice(productName) {

        const product = this.page
            .locator('.inventory_item')
            .filter({
                has: this.page.locator(
                    '.inventory_item_name',
                    { hasText: productName }
                )
            });

        const price = await product
            .locator('.inventory_item_price')
            .textContent();

        return price;
    }

    async logout(){

        await this.menuButton.click();

        await this.logoutButton.click();

    }

}


module.exports = InventoryPage;