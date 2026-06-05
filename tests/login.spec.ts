import { test, expect } from '@playwright/test';
import{users} from '../test_data/users';

test.describe("login Functionality",() =>{
    test('TC_001 - Login page should load',async({page}) =>{
        await page.goto("https://www.saucedemo.com/");
        await expect(page).toHaveTitle(/Swag Labs/);
        await expect(page.locator('#user-name')).toBeVisible();
        await expect(page.locator('#password')).toBeVisible();
        await expect(page.locator('#login-button')).toBeVisible();

    });
     test('TC_002 - Valid user should be able to login',async({page}) =>{
        const standardUserUser = users.find(user=> user.type==='standard')!;
        await page.goto("https://www.saucedemo.com/");
        await page.fill('#user-name',standardUserUser.username);
        await page.fill('#password',standardUserUser.password);
        await page.click('#login-button');
        await expect(page).toHaveURL(/inventory/);
     });
     test('TC_003 - Invalid password should throw error',async({page}) =>{
        const standardUserUser = users.find(user=> user.type==='standard')!;
        await page.goto("https://www.saucedemo.com/");
        await page.fill('#user-name',standardUserUser.username);
        await page.fill('#password','wrong_password');
        await page.click('#login-button');
        const errorMessage = page.locator('[data-test ="error"]');
        await expect(errorMessage).toBeVisible();
     });
      test('TC_004 - Locked user should not be able to login',async({page}) =>{
        const lockedUser = users.find(user=> user.type==='locked')!;
        await page.goto("https://www.saucedemo.com/");
        await page.fill('#user-name',lockedUser.username);
        await page.fill('#password',lockedUser.password);
        await page.click('#login-button');

        const errorMessage = page.locator('[data-test ="error"]');
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toContainText('locked out');
      
    });

});
     
