export class Upload {

    constructor(page) {
        this.page = page;
        this.uploadFile = this.page.locator('#file-upload');
        this.uploadButton = this.page.locator('#file-submit');
        this.successMessage = this.page.locator('.example');
    }

    async fileUpload() {
        await this.page.goto(process.env.BASE_URL + '/upload');
        await this.uploadFile.setInputFiles('testData/evening.png');
        await this.uploadButton.click();
    }

}