import { expect } from "@playwright/test";
import { test } from "../pages/base.ts";
import { LoginPage } from "../pages/login.page.js";




test("ตรวจสอบว่า filter triage 'Emergency' แสดงเฉพาะเคส Emergency เท่านั้น", async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    //  login
    await loginPage.fillUserPassword('test@gmail.com', '12345');
    await loginPage.clickLogin();

    //  เลือก filter Emergency
    await loginPage.selectEmergencyFilter();

    //  ตรวจสอบว่า table มีแต่ Emergency
    await expect(loginPage.tableBody).toContainText('Emergency');

});
   test('ตรวจสอบว่าการกำหนด date range แสดงเฉพาะ record ในช่วงเวลาที่เลือก', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    //  login
    await loginPage.fillUserPassword('test@gmail.com', '12345');
    await loginPage.clickLogin();

    //  เลือกวันที่ (27)
    await loginPage.selectDate('27');

    //  กด Apply
    await loginPage.applyDateFilter();

   const records = loginPage.recordItem;

    // ต้องมีอย่างน้อย 1 record
    await expect(records.first()).toBeVisible();

    //  เช็คทุก record ทีละตัว
    const texts = await records.allTextContents();

    for (const text of texts) {
        expect(text).toContain('27/04/2026');
}
});

test('ตรวจสอบว่าใช้ filter triage + date พร้อมกันยังทำงานได้ถูกต้อง', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();


    await loginPage.fillUserPassword('test@gmail.com', '12345');
    await loginPage.clickLogin();

    //  เลือกวันที่
    await loginPage.selectDate('27');
    await loginPage.applyDateFilter();

    //  เลือก Emergency
    await loginPage.selectEmergencyFilter();

    const records = loginPage.recordItem;

    //  ต้องมีอย่างน้อย 1 record
    await expect(records.first()).toBeVisible();

    //  เช็คทุก record เป็นวันที่ที่เลือก
    const texts = await records.allTextContents();
    for (const text of texts) {
        expect(text).toContain('27/04/2026');
    }

    //  เช็คว่าเป็น Emergency
    await expect(loginPage.tableBody).toContainText('Emergency');

});
test('ตรวจสอบว่า uncheck filter แล้วไม่แสดงข้อมูล', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();


    await loginPage.fillUserPassword('test@gmail.com', '12345');
    await loginPage.clickLogin();


    //  uncheck filter
    await page.locator('.css-7wqzbl').first().click();

    //  ต้องไม่มีข้อมูล
    await expect(page.getByText('ยังไม่มีข้อมูลการวินิจฉัย')).toBeVisible();

});