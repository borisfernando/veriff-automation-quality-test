import {Page} from "@playwright/test";
import {VerificationInRedirectPage} from "./verification-in-redirect.page";
import {VerificationInContextPage} from "./verification-in-context.page";
import {VerificationPage} from "./verification.page";

export class VerificationFactory {
    static createObject(page: Page, launchVeriffRedirect: boolean): VerificationPage {
        return launchVeriffRedirect
            ? new VerificationInRedirectPage(page)
            : new VerificationInContextPage(page);
    }
}