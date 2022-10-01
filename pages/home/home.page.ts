import {VeriffBasePage} from "../base/veriff-base.page";
import {Locator} from "@playwright/test";
import {VerificationPage} from "../verification/verification.page";
import {VerificationFactory} from "../verification/verification-factory.page";

export class HomePage extends VeriffBasePage {
    _url: string = "https://demo.saas-3.veriff.me/";

    private fullNameInputLocator: Locator;
    private sessionLanguageDropdownLocator: Locator;

    private documentCountryDropdownLocator: Locator;
    private documentTypeDropdownLocator: Locator;

    private launchVeriffInContextRadioLocator: Locator;
    private launchVeriffRedirectRadioLocator: Locator;

    private consentTextLocator: Locator;
    private privacyPolicyAnchorLocator: Locator;
    
    private veriffMeButtonLocator: Locator;

    async initElements() {
        this.fullNameInputLocator = this._page.locator("input[name='name']");
        this.sessionLanguageDropdownLocator = this._page.locator("button[name='language']");

        this.documentCountryDropdownLocator = this._page.locator("input[name='documentCountry']");
        this.documentTypeDropdownLocator = this._page.locator("button[name='documentType']");

        this.launchVeriffInContextRadioLocator = this._page.locator("input[value='incontext']");
        this.launchVeriffRedirectRadioLocator = this._page.locator("input[value='redirect']");

        this.consentTextLocator = this._page.locator('p', {hasText: 'you consent that'});
        this.privacyPolicyAnchorLocator = this._page.locator("a", {hasText: 'Privacy Policy'});

        this.veriffMeButtonLocator = this._page.locator("button[type='submit']")
    }

    setFullName(fullName: string): Promise<void> {
        return this.fullNameInputLocator.fill(fullName);
    }

    setSessionLanguage(language: string): Promise<void> {
        return this.setCustomDropdown(this.sessionLanguageDropdownLocator, language);
    }

    setDocumentCountry(country: string): Promise<void> {
        this.documentCountryDropdownLocator.fill(country);
        return this.setCustomDropdownValue(country);
    }

    setDocumentType(documentType: string): Promise<void> {
        return this.setCustomDropdown(this.documentTypeDropdownLocator, documentType);
    }

    setVeriffLaunch(launchVeriffRedirect: boolean): Promise<void> {
        return launchVeriffRedirect
            ? this.launchVeriffRedirectRadioLocator.click()
            : this.launchVeriffInContextRadioLocator.click();
    }

    setCustomDropdown(elementLocator: Locator, elementValue: string): Promise<void> {
        elementLocator.click();
        return this.setCustomDropdownValue(elementValue);
    }

    setCustomDropdownValue(elementValue: string): Promise<void> {
        return this._page.locator('li', {hasText: elementValue}).click();
    }

    isConsentTextDisplayed(): Promise<boolean> {
        return this.consentTextLocator.isVisible();
    }

    isPrivacyPolicyVisibleAndClickable(): Promise<boolean> {
        return this.privacyPolicyAnchorLocator.isVisible()
            && this.privacyPolicyAnchorLocator.isEditable();
    }

    async clickOnPrivacyPolicyLink(): Promise<void> {
        await this.privacyPolicyAnchorLocator.click();
        await this._page.waitForLoadState();
    }

    clickOnVeriffMeButton(): Promise<void> {
        return this.veriffMeButtonLocator.click();
    }

    async fillUserData(launchVeriffRedirect: boolean): Promise<void> {
        await this.setFullName('User test');
        await this.setSessionLanguage('English');
        await this.setDocumentCountry('Guatemala');
        await this.setDocumentType('Passport');
        await this.setVeriffLaunch(launchVeriffRedirect);

        await this.clickOnVeriffMeButton();
        await this._page.waitForLoadState();
    }

    async fillUserDataAndContinueToVerificationFlow(launchVeriffRedirect: boolean): Promise<VerificationPage> {
        await this.fillUserData(launchVeriffRedirect);

        const verificationPage = VerificationFactory.createObject(this._page, launchVeriffRedirect);
        await verificationPage.openPage();
        return verificationPage;
    }
}
