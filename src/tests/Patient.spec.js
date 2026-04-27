import { expect } from "@playwright/test";
import { test } from "../pages/base.ts";
import { LoginPage } from "../pages/login.page.js";

test('ตรวจสอบว่าการพิมพ์และส่ง note ใน Note Message บันทึกและแสดงผลได้', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    //  login
    await loginPage.fillUserPassword('test@gmail.com', '12345');
    await loginPage.clickLogin();

    //  เข้า In progress
    await loginPage.openInProgress();

    //  เปิดเคสผู้ป่วย
    await loginPage.openPatientChat();

    //  ส่งข้อความ
    const message = 'sent message';
    await loginPage.sendMessage(message);

    //  ตรวจว่าข้อความแสดงผล
    await expect(loginPage.sentMessage).toContainText(message);

});