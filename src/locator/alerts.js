export class Alerts {

    constructor(page) {
        this.page = page;
        this.alertButton = this.page.getByRole('button', { name: 'Click for JS Alert' });
        this.confirmButton = this.page.getByRole('button', { name: 'Click for JS Confirm' });
        this.promptButton = this.page.getByRole('button', { name: 'Click for JS Prompt' });
        this.successMessage = this.page.locator('#result');
    }

    async goto() {
        await this.page.goto(process.env.BASE_URL + '/javascript_alerts');
    }

    async buttonAlert() {
        await this.alertButton.click();
    }
    async buttonConfirm() {
        await this.confirmButton.click();
    }
    async buttonPrompt() {
        await this.promptButton.click();
    }

}