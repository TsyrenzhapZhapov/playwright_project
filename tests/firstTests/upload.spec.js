import { test, expect } from '@playwright/test';

test.describe('Upload', () => {

    test('upload', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload');
        await page.locator('#file-upload').click();
        await page.locator('#file-upload').setInputFiles('C:/Users/manager/Downloads/evening.png');
        await page.locator('#file-submit').click();
        await expect(page.locator('.example')).toContainText('File Uploaded!');
    });

})