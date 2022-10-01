import {VerificationPage} from "./verification.page";

export class VerificationInRedirectPage extends VerificationPage {
    async initElements(): Promise<void> {
        this.headerTitleLocator = this._page.locator("h1");
    }
}