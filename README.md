# 🎭 001-Playwright — Automated E2E Test Suite

> Automated end-to-end testing for \*\*AgnosHealth AI Dashboard\*\* using \[Playwright](https://playwright.dev/) with the Page Object Model (POM) pattern.

\---

## 📋 สารบัญ (Table of Contents)

* [ภาพรวมโปรเจค](#-ภาพรวมโปรเจค)
* [โครงสร้างโปรเจค](#-โครงสร้างโปรเจค)
* [ความต้องการของระบบ](#-ความต้องการของระบบ)
* [การติดตั้ง](#-การติดตั้ง)
* [การรัน Test](#-การรัน-test)
* [Test Suites](#-test-suites)
* [Pattern ที่ใช้](#-pattern-ที่ใช้-page-object-model)
* [Test Report](#-test-report)

\---

## 🏥 ภาพรวมโปรเจค

โปรเจคนี้เป็น Automated E2E Testing สำหรับระบบ AgnosHealth AI Dashboard โดยครอบคลุมฟีเจอร์หลักของระบบ ได้แก่ การ Login, Navigation, การค้นหาผู้ป่วย, การกรองข้อมูล, การบันทึก Note และการ Download รายงาน

|รายละเอียด|ข้อมูล|
|-|-|
|URL ที่ทดสอบ|`https://dev.app.agnoshealth.com/ai\_dashboard`|
|Framework|Playwright v1.59.1|
|ภาษา|JavaScript / TypeScript|
|Browser|Chromium (Desktop Chrome)|
|Pattern|Page Object Model (POM)|

\---

## 📁 โครงสร้างโปรเจค

```
001-playwright/
├── src/
│   ├── pages/
│   │   ├── base.ts              # Base fixture สำหรับ Page Objects
│   │   ├── login.page.js        # LoginPage — locators \& actions ทั้งหมด
│   │   └── utils/
│   │       └── index.js         # Utility functions (เช่น removeSlashUrl)
│   └── tests/
│       ├── login.spec.js        # ✅ Test: Login / Logout
│       ├── Navigation.spec.js   # ✅ Test: Navigation \& เมนู
│       ├── Filter.spec.js       # ✅ Test: Triage Filter \& Date Range
│       ├── Search.spec.js       # ✅ Test: ค้นหาผู้ป่วย
│       ├── Patient.spec.js      # ✅ Test: Note Message
│       └── Download.spec.js     # ✅ Test: Download รายงาน
├── playwright-report/           # HTML Report (สร้างหลังรัน test)
├── test-results/                # Raw test results \& error logs
├── playwright.config.js         # Playwright configuration
├── package.json
└── .gitignore
```

\---

## 💻 ความต้องการของระบบ

|เครื่องมือ|เวอร์ชันที่แนะนำ|
|-|-|
|Node.js|>= 18.x|
|npm|>= 9.x|
|OS|Windows / macOS / Linux|

\---

## 🚀 การติดตั้ง

### 1\. ติดตั้ง dependencies

```bash
npm install
```

### 2\. ติดตั้ง Playwright Browsers

```bash
npx playwright install
```

> ⚠️ หากต้องการติดตั้งเฉพาะ Chromium:
> ```bash
> npx playwright install chromium
> ```

\---

## ▶️ การรัน Test

### รัน test ทั้งหมด

```bash
npx playwright test
```

### รัน test เฉพาะไฟล์

```bash
npx playwright test src/tests/login.spec.js
npx playwright test src/tests/Filter.spec.js
```

### รัน test พร้อมแสดง browser (headed mode)

```bash
npx playwright test --headed
```

### รัน test และเปิด Report อัตโนมัติ

```bash
npx playwright test --reporter=html
npx playwright show-report
```

### รัน test แบบ debug

```bash
npx playwright test --debug
```

\---

## 🧪 Test Suites

### 1\. 🔐 Login (`login.spec.js`) — 5 test cases

|Test Case|คำอธิบาย|
|-|-|
|✅ Valid credentials|ตรวจสอบว่าเข้าสู่ระบบสำเร็จเมื่อใช้ข้อมูลถูกต้อง|
|✅ Invalid password|ตรวจสอบว่าระบบแสดง error เมื่อกรอก password ไม่ถูกต้อง|
|✅ Email not found|ตรวจสอบว่าระบบแสดง error เมื่อ email ไม่มีในระบบ|
|✅ Empty form|ตรวจสอบว่าปุ่ม Sign in ถูก disable เมื่อไม่กรอกข้อมูล|
|✅ Logout redirect|ตรวจสอบว่าการ logout ยกเลิก session และ redirect กลับหน้า login|

\---

### 2\. 🧭 Navigation (`Navigation.spec.js`) — 2 test cases

|Test Case|คำอธิบาย|
|-|-|
|✅ Diagnosis List menu|ตรวจสอบว่าเมนู Diagnosis List redirect ไปหน้า dashboard ถูกต้อง|
|✅ Patient detail panel|ตรวจสอบว่าคลิกแถวผู้ป่วยแล้วเปิด panel รายละเอียดได้|

\---

### 3\. 🔍 Search (`Search.spec.js`) — 2 test cases

|Test Case|คำอธิบาย|
|-|-|
|✅ Search by keyword|ตรวจสอบว่าสามารถค้นหาผู้ป่วยได้จาก keyword|
|✅ No results message|ตรวจสอบว่าค้นหาด้วยชื่อที่ไม่มีในระบบแล้วแสดงข้อความ "ยังไม่มีข้อมูล"|

\---

### 4\. 🎛️ Filter (`Filter.spec.js`) — 4 test cases

|Test Case|คำอธิบาย|
|-|-|
|✅ Triage Emergency filter|ตรวจสอบว่า filter triage 'Emergency' แสดงเฉพาะเคส Emergency|
|✅ Date range filter|ตรวจสอบว่าการกำหนด date range แสดงเฉพาะ record ในช่วงเวลาที่เลือก|
|✅ Triage + Date combined|ตรวจสอบว่าใช้ filter triage + date พร้อมกันยังทำงานถูกต้อง|
|✅ Uncheck filter|ตรวจสอบว่า uncheck filter แล้วไม่แสดงข้อมูล|

\---

### 5\. 📝 Patient Note (`Patient.spec.js`) — 1 test case

|Test Case|คำอธิบาย|
|-|-|
|✅ Send Note Message|ตรวจสอบว่าการพิมพ์และส่ง note ใน Note Message บันทึกและแสดงผลได้|

\---

### 6\. 📥 Download (`Download.spec.js`) — 1 test case

|Test Case|คำอธิบาย|
|-|-|
|✅ Download report|ตรวจสอบว่าปุ่ม Download สร้างและดาวน์โหลดไฟล์ได้สำเร็จ|



```

> 💡 \*\*หมายเหตุ:\*\* ขณะนี้รันบน \*\*Chromium\*\* เท่านั้น สามารถเปิดใช้ Firefox / WebKit ได้โดย uncomment ใน config

\---

## 🏗️ Pattern ที่ใช้: Page Object Model

โปรเจคใช้ Page Object Model (POM) เพื่อแยก locators และ actions ออกจาก test cases

```
Test Spec  ──▶  Page Object  ──▶  Browser
```

ตัวอย่าง:

```js
// ✅ ใน test spec — อ่านง่าย ไม่มี locator
test('login สำเร็จ', async ({ loginPage }) => {
  await loginPage.fillUserPassword('test@gmail.com', '12345');
  await loginPage.clickLogin();
  await expect(page).toHaveURL(/dashboard/);
});

// ✅ ใน page object — จัดการ locator ที่เดียว
class LoginPage {
  async fillUserPassword(email, password) {
    await this.page.fill('#Email', email);
    await this.page.fill('#password', password);
  }
}
```

\---

## 📊 Test Report

หลังรัน test จะสร้าง HTML Report อัตโนมัติที่ `playwright-report/index.html`

```bash
# เปิด report
npx playwright show-report
```

Report จะแสดง:

* ✅ Test ที่ผ่าน / ❌ Test ที่ fail
* Screenshot เมื่อ test fail
* Trace viewer (เมื่อเปิด trace)
* เวลาที่ใช้ในการรัน

\---

## 📌 หมายเหตุ

* ###### หากรันแล้วเกิด fail บางจุด ให้ลองรันแบบ Case by Case ไปก่อนเนื่องจากไม่มีเวลาทำและแก้ไขมาก แต่ถ้ารัน Case by Case ผลก็จะออกมา Pass
* แต่ละเคสที่ทำผ่าน Automate เป็นแค่ตัวอย่างคร่าวๆครับ



\---



