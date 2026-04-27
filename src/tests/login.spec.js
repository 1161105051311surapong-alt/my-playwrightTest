import { expect } from "@playwright/test";
import { test } from "../pages/base.ts";
import { LoginPage } from "../pages/login.page.js";


test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
});


test ('ตรวจสอบว่าเข้าสู่ระบบสำเร็จเมื่อใช้ข้อมูล credentials ที่ถูกต้อง', async ({loginPage})=>{ 


    // await loginPage.goto();

    await loginPage.fillUserPassword('test@gmail.com', '12345');

    expect(await loginPage.getUserName()).toBe('test@gmail.com');

    expect(await loginPage.getPassword()).toBe('12345');
} );

// test.only ('ตรวจสอบว่าระบบแสดง error เมื่อกรอก password ไม่ถูกต้อง', async ({loginPage})=>{ 

    
//     await loginPage.fillUserPassword('test@gmail.com', 'invalid_password');

//     await loginPage.clickLogin();

//     this.errorMessage = this.page.locator('text=Wrong email or password. Please try again');
// } );

test('ตรวจสอบว่าระบบแสดง error เมื่อกรอก password ไม่ถูกต้อง', async ({ loginPage }) => {

  await loginPage.fillUserPassword('test@gmail.com', 'invalid_password');

  await loginPage.clickLogin();

  await expect(loginPage.errorMessage).toBeVisible();

});

test('ตรวจสอบว่าระบบแสดง error เมื่อ email ไม่มีในระบบ', async ({ loginPage }) => {

    await loginPage.goto();

    //  email ที่ไม่มีในระบบ
    await loginPage.fillUserPassword('notfound@gmail.com', '123456');

    await loginPage.clickLogin();

    //  เช็คว่า error แสดง
    await expect(loginPage.errorMessage).toBeVisible();

});

test('ตรวจสอบว่าระบบแสดง validation เมื่อไม่กรอกทั้ง email และ password', async ({ loginPage }) => {

    await loginPage.goto();

    //  ไม่กรอกอะไรเลย

    //  ตรวจสอบว่าปุ่ม Sign in ถูก disable
    await expect(
    loginPage.page.getByRole('button', { name: 'Sign in' })
    ).toBeDisabled();
});

test('ตรวจสอบว่าการ logout ยกเลิก session และ redirect กลับหน้า login', async ({ loginPage }) => {

    await loginPage.goto();

    //  login ก่อน
    await loginPage.fillUserPassword('test@gmail.com', '12345');
    await loginPage.clickLogin();

    // (optional) รอหน้าใหม่โหลด
    await loginPage.page.waitForLoadState('networkidle');

    //  logout
    await loginPage.clickLogout();

    //  ตรวจว่า redirect กลับ login
    await expect(loginPage.page).toHaveURL(/login/);

});
