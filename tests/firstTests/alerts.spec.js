import { test, expect } from '@playwright/test';
import { Alerts } from '../../src/locator/alerts';

test.describe('Alerts', () => {

    test.beforeEach(async() => {
        const alerts = new Alerts(page);
        await alerts.goto();
    })
    
    test('alert', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await alerts.buttonAlert();
        await expect(alerts.successMessage).toContainText('You successfully clicked an alert');
    });


    test('comfirm', async ({page}) => {
        // const alerts = new Alerts(page);
        // await alerts.goto();
        page.on('dialog', dialog => dialog.accept());
        await alerts.buttonConfirm();
        await expect(alerts.successMessage).toContainText('You clicked: Ok');
    })


    test('prompt', async ({page}) => {
        // const alerts = new Alerts(page);
        // await alerts.goto();
        page.on('dialog', dialog => dialog.accept('test'));
        await alerts.buttonPrompt();
        await expect(alerts.successMessage).toContainText('You entered: test');
  })
})
