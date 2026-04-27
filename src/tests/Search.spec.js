import { expect } from "@playwright/test";
import { test } from "../pages/base.ts";
import { LoginPage } from "../pages/login.page.js";


test('ตรวจสอบว่าสามารถค้นหาผู้ป่วยได้จาก keyword', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    //  login
    await loginPage.fillUserPassword('test@gmail.com', '12345');
    await loginPage.clickLogin();

    // //  คลิก In progress
    // await loginPage.clickInProgress();

    //  ค้นหา
    await loginPage.searchPatient('เกม');

    //  ตรวจผลลัพธ์
    const tableText = await loginPage.getTableText();
    await expect(tableText).toContain(' เกมส์ Test');

});
test('ตรวจสอบว่าค้นหาด้วยชื่อที่ไม่มีในระบบแล้วแสดง No results', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    //  login
    await loginPage.fillUserPassword('test@gmail.com', '12345');
    await loginPage.clickLogin();

    //  ค้นหาข้อมูลที่ไม่มี
    await loginPage.searchPatient('Search no results');

    //  ตรวจสอบว่าแสดงข้อความ No results
    await expect(loginPage.noResultMessage).toBeVisible();

});