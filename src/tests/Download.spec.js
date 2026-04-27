import { expect } from "@playwright/test";
import { test } from "../pages/base.ts";
import { LoginPage } from "../pages/login.page.js";

// test('ตรวจสอบว่าปุ่ม Download สร้างและดาวน์โหลดไฟล์ได้สำเร็จ', async ({ page }) => {

//     const loginPage = new LoginPage(page);

//     await loginPage.goto();

//     //  login
//     await loginPage.fillUserPassword('test@gmail.com', '12345');
//     await loginPage.clickLogin();

//     //  กดปุ่ม Download
//     await loginPage.clickDownload();

//     //  confirm + รอ download
//     const download = await loginPage.confirmAndWaitDownload();

//     //  ตรวจว่า download เกิดขึ้นจริง
//     expect(download).toBeTruthy();

//     // (optional) เช็คชื่อไฟล์
//     const fileName = download.suggestedFilename();
//     console.log('Downloaded file:', fileName);

//     //  ตรวจ success message
//     await expect(loginPage.downloadSuccessMessage).toBeVisible();

// });


test('ตรวจสอบว่าปุ่ม Download สร้างและดาวน์โหลดไฟล์ได้สำเร็จ', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    // login
    await loginPage.fillUserPassword('test@gmail.com', '12345');
    await loginPage.clickLogin();

    // เปิด dialog download
    await loginPage.clickDownload();

    // รอ download + confirm พร้อมกัน
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.getByRole('button', { name: 'ยืนยัน' }).click()
    ]);

    // ตรวจว่า download เกิดจริง
    expect(download).toBeTruthy();

    // success message
    await expect(loginPage.downloadSuccessMessage).toBeVisible();
});