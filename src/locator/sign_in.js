export class SignIn {

    constructor(page) {
        this.page = page;
        this.username = this.page.getByLabel('Username');
        this.password = this.page.getByLabel('Password');
        this.loginButton = this.page.getByRole('button', { name: ' Login' });
        this.logoutButton = this.page.getByRole('link', { name: 'Logout' });
        this.successMessage = this.page.locator('#flash');
    }

    async goto() {
        await this.page.goto(`${process.env.BASE_URL}/login`);
    }

    async login(username, password) {
        await this.username.fill(username);
        await this.password.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.logoutButton.click();
    }
}