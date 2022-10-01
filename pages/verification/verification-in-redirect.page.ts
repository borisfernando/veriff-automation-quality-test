import {VerificationPage} from "./verification.page";

export class VerificationInRedirectPage extends VerificationPage {
    async openPage(): Promise<void> {
        await super.openPage();
        await this._page.waitForNavigation();
    }

    async initElements(): Promise<void> {
        this.headerTitleLocator = this._page.locator("h1");
    }
}