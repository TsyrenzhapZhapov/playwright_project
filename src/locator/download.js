export class DownloadPage {

    constructor(page) {
        this.page = page;
        this.downloadLink = this.page.getByText('demo.txt');
        this.uploadButton = this.page.locator('#file-submit');
        this.successMessage = this.page.locator('.example');
        this.downloadPath = 'testData/downloads/';
    }

    async downloadFile() {
        await this.page.goto(process.env.BASE_URL + '/download');
        const downloadPromise = this.page.waitForEvent('download');
        await this.downloadLink.click();
        const download = await downloadPromise;
        this.suggestedFilename = download.suggestedFilename();
        await download.saveAs(this.downloadPath + this.suggestedFilename);
    }

    async fileExists(filePath) {
        return fs.stat(filePath);
    }

}