import { Page } from "@playwright/test";
import { removeSlashUrl } from "./utils";

export class LoginPage {
    baseUrl = 'https://dev.app.agnoshealth.com/ai_dashboard/login';

    locatorUserName = '#Email';
    locatorPassword = '#password';
    // locatorButtonLogin = 'button:has-text("Sign in")';

    /**
     * @param {Page} page
     */
    constructor(page) {
        this.page = page;
        //  login------------------------------------------------------
        this.errorMessage = page.getByText(/Wrong email or password/i);   
        this.loginButton = page.getByRole('button', { name: 'Sign in' }); 
        this.locatorLogoutButton = this.page.getByRole('button', { name: 'Log Out' });
        // Navigation -----------------------------------------------------------------
        this.diagnosisMenu = this.page.getByRole('button', { name: /Diagnosis List/ });  
        this.inProgress = this.page.getByText(/In progress/i);  
        this.patientRow = this.page.getByText('Agnos app').first();
        this.detailPanel = this.page.getByText('Patient symptoms');

        //Search---------------------------------------------------
        this.searchInput = this.page.getByRole('textbox', { name: 'Patient name, Patient contact' });
        this.inProgressTab = this.page.getByText('In progress');
        this.tableBody = this.page.locator('tbody');

        this.searchInput = this.page.getByRole('textbox', { name: 'Patient name, Patient contact' });
        this.noResultMessage = this.page.getByText('ยังไม่มีข้อมูลการวินิจฉัย');

        //Fillter----------------------------------------------------
        this.filterDropdown = this.page.locator('.css-7wqzbl').first();
        this.emergencyOption = this.page.locator('div:nth-child(5) > .css-7wqzbl');
        this.tableBody = this.page.locator('tbody');

        this.calendarButton = this.page.getByRole('img', { name: 'calendar' });
        this.dateCell = (day) => this.page.getByRole('gridcell', { name: day });
        this.applyButton = this.page.getByRole('button', { name: 'Apply' });
        //  record ที่ต้องตรวจ
        this.recordItem = this.page.getByRole('link', { name: /Record ID/i });

        this.calendarButton = this.page.getByRole('img', { name: 'calendar' });

        //  Download----------------------------------------------------------------
        this.downloadButton = this.page.getByRole('button', { name: 'download Download' });
        this.confirmDownloadButton = this.page.getByRole('button', { name: 'ยืนยัน' });
        this.downloadSuccessMessage = this.page.getByText(/Download CSV file successfully/i);

        //  Patient Info ----------------------------------------------------------------
        this.inProgressTab = this.page.getByText('In progress');
        this.patientChatLink = this.page.getByRole('link', { name: /Guest 0/i });

        this.messageInput = this.page.getByRole('textbox', { name: 'พิมพ์ข้อความของคุณ' });
        this.sendButton = this.page.getByRole('button', { name: 'ส่ง' });

        this.sentMessage = this.page.locator('#root');
        
            


    }

    async goto() {
        await this.page.goto(this.baseUrl);
    }

    async fillUserPassword(username, password) {
        await this.page.locator(this.locatorUserName).fill(username);
        await this.page.locator(this.locatorPassword).fill(password);
    }

    // async clickLogin() {
    //     await this.page.click(this.locatorButtonLogin);
    // }
    async clickLogin() {
        await this.loginButton.click();
    }
    
    async getUserName() {
        return await this.page.locator(this.locatorUserName).inputValue()    
 
    }
     async getPassword() {
        return await this.page.locator(this.locatorPassword).inputValue()    
    }
    async clickLogout() {
        await this.locatorLogoutButton.click();
    }    
    async isOnLoginPage() {
        return this.page.url().includes('/login');
    }
    // Diagnosis List
    async clickDiagnosisMenu() {
        await this.diagnosisMenu.click();
    }
    async clickInProgress() {
        await this.inProgress.click();
    }
    async clickFirstPatientRow() {
        await this.patientRow.click();
    }
    async searchPatient(keyword) {
        await this.searchInput.click();
        await this.searchInput.fill(keyword);
    }

    async clickInProgress() {
        await this.inProgressTab.click();
    }

    async getTableText() {
        return await this.tableBody.textContent();
    }
    async selectEmergencyFilter() {
        await this.filterDropdown.click();
        await this.emergencyOption.click();
    }
    async selectDate(day) {
        await this.calendarButton.click();
        await this.dateCell(day).click();
    }

    async applyDateFilter() {
        await this.applyButton.click();
    }
    async clickDownload() {
         await this.downloadButton.click();
    }   

    async confirmAndWaitDownload() {
        const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        this.confirmDownloadButton.click()
        ]);
        return download;
    }

    async openInProgress() {
            await this.inProgressTab.click();
        }

    async openPatientChat() {
            await this.patientChatLink.click();
        }

    async sendMessage(text) {
            await this.messageInput.click();
            await this.messageInput.fill(text);
            await this.sendButton.click();
        }





}

