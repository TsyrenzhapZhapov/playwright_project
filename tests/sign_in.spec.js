import { test, expect } from '@playwright/test';
import { SignIn } from '../src/locator/sign_in';
import { signInData } from '../testData/sign_in';

test.describe('Sign in', () => {
    let signIn;

    test.beforeEach(async ({page}) => {
        signIn = new SignIn(page);
        await signIn.goto();
    })

    test('positive login', async ({ page }) => {
        await signIn.login(signInData.username, signInData.password);
        await expect(signIn.successMessage).toContainText('You logged into a secure area');
    });

    test('negative login', async ({page}) => {
        await signIn.login(signInData.incorrectUsername, signInData.password);
        await expect(signIn.successMessage).toContainText('Your username is invalid!');
    })

    test('logout', async ({page}) => {
        await signIn.login(signInData.username, signInData.password);
        await signIn.logout();
        await expect(signIn.successMessage).toContainText('You logged out of the secure');
  })

})