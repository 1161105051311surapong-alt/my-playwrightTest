import { expect } from "@playwright/test";
import { test } from "../pages/base.ts";
import { LoginPage } from "../pages/login.page.js";

test('ตรวจสอบว่าเมนู Diagnosis List redirect ไปหน้า dashboard ถูกต้อง', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    //  login
    await loginPage.fillUserPassword('test@gmail.com', '12345');
    await loginPage.clickLogin();

    //  คลิกเมนู
    await loginPage.clickDiagnosisMenu();

    //  เช็ค URL อย่างเดียว
    await expect(page).toHaveURL('https://dev.app.agnoshealth.com/ai_dashboard');

});

test('ตรวจสอบว่าคลิกแถวผู้ป่วยแล้วเปิด panel รายละเอียดได้', async ({ page }) => {

    const loginPage = new LoginPage(page);

    await loginPage.goto();

    //  login
    await loginPage.fillUserPassword('test@gmail.com', '12345');
    await loginPage.clickLogin();

    // ไปหน้า Diagnosis
    await loginPage.clickDiagnosisMenu();

    //  คลิก In progress
    await loginPage.clickInProgress();


    await loginPage.clickFirstPatientRow();

    await expect(loginPage.detailPanel).toHaveText(/Patient symptoms/i);

});