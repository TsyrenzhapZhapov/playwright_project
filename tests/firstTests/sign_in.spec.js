import { test, expect } from '@playwright/test';
import { signIn } from '../../src/locator/sign_in';
import { signInData } from '../../testData/sign_in';

test.describe('Sign in', () => {

    test.beforeEach(async () => {
        const SignIn = new signIn(page);
        await SignIn.goto();
    })

    test('positive login', async ({ page }) => {
        // const SignIn = new signIn(page);
        // await SignIn.goto();
        await SignIn.login(signInData.username, signInData.password);
        await expect(SignIn.successMessage).toContainText('You logged into a secure area');
    });


    test('negative login', async ({page}) => {
        // const SignIn = new signIn(page);
        // await SignIn.goto();
        await SignIn.login(signInData.incorrectUsername, signInData.password);
        await expect(SignIn.successMessage).toContainText('Your username is invalid!');
    })


    test('logout', async ({page}) => {
        // const SignIn = new signIn(page);
        // await SignIn.goto();
        await SignIn.login(signInData.username, signInData.password);
        await SignIn.logout();
        await expect(SignIn.successMessage).toContainText('You logged out of the secure');
  })


})
