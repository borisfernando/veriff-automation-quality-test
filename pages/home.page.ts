import {VeriffBasePage} from "./base/veriff_base.page";
import {expect, Locator} from "@playwright/test";

export class HomePage extends VeriffBasePage {
    private readonly url: string = "https://demo.saas-3.veriff.me/";

    private fullNameInputLocator: Locator;
    private sessionLanguageDropdownLocator: Locator;

    private documentCountryDropdownLocator: Locator;
    private documentTypeDropdownLocator: Locator;

    private launchVeriffInContextRadioLocator: Locator;
    private launchVeriffRedirectRadioLocator: Locator;

    private consentTextLocator: Locator;
    private privacyPolicyAnchorLocator: Locator;
    
    private veriffMeButtonLocator: Locator;

    initElements(): void {
        this.fullNameInputLocator = this._page.locator("input[name='name']");
        this.sessionLanguageDropdownLocator = this._page.locator("input[name='language']");

        this.documentCountryDropdownLocator = this._page.locator("input[name='documentCountry']");
        this.documentTypeDropdownLocator = this._page.locator("input[name='documentType']");

        this.launchVeriffInContextRadioLocator = this._page.locator("input[value='incontext']");
        this.launchVeriffRedirectRadioLocator = this._page.locator("input[value='redirect']");

        this.consentTextLocator = this._page.locator("p:has-text('you consent that')");
        this.privacyPolicyAnchorLocator = this._page.locator("a:has-text('Privacy Policy')");

        this.veriffMeButtonLocator = this._page.locator("button[text='Veriff Me']")
    }

    isConsentTextDisplayed(): Promise<boolean> {
        return this.consentTextLocator.isVisible();
    }

    isPrivacyPolicyVisibleAndClickable(): Promise<boolean> {
        return this.privacyPolicyAnchorLocator.isVisible()
            && this.privacyPolicyAnchorLocator.isEditable();
    }

    async openPage(): Promise<void> {
        await this._page.goto(this.url);
    }
}
