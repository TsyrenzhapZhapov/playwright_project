import { test, expect } from '@playwright/test';
import { Alerts } from '../src/locator/alerts';

test.describe('Alerts', () => {
    let alerts;

    test.beforeEach(async({page}) => {
        alerts = new Alerts(page);
        await alerts.goto();
    })
    
    test('alert', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        await alerts.buttonAlert();
        await expect(alerts.successMessage).toContainText('You successfully clicked an alert');
    });

    test('okComfirm', async ({page}) => {
        page.on('dialog', dialog => dialog.accept());
        await alerts.buttonConfirm();
        await expect(alerts.successMessage).toContainText('You clicked: Ok');
    })

    test('cancelComfirm', async ({page}) => {
        page.on('dialog', dialog => dialog.dismiss());
        await alerts.buttonConfirm();
        await expect(alerts.successMessage).toContainText('You clicked: Cancel');
    })

    test('prompt', async ({page}) => {
        page.on('dialog', dialog => dialog.accept('test'));
        await alerts.buttonPrompt();
        await expect(alerts.successMessage).toContainText('You entered: test');
  })
})
