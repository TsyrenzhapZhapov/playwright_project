import { test, expect } from '@playwright/test';

test.describe('Download', () => {

    test('download', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/download');
        await page.getByRole('link', { name: 'evening.png'}).click();

    });

})