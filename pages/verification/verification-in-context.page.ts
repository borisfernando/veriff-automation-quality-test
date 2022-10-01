import {VerificationPage} from "./verification.page";

export class VerificationInContextPage extends VerificationPage {
    async openPage(): Promise<void> {
        await super.openPage();
        await this._page.waitForEvent('framenavigated');
    }

    async initElements(): Promise<void> {
        this.headerTitleLocator = this._page.frameLocator('iframe').locator("h1");
    }
}