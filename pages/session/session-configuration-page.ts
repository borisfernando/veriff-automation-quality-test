import {VeriffBasePage} from "../base/veriff-base.page";
import {Locator} from "@playwright/test";
import {VerificationPage} from "../verification/verification.page";
import {VerificationFactory} from "../verification/verification-factory.page";

export class SessionConfigurationPage extends VeriffBasePage {
    _url: string = "https://demo.saas-3.veriff.me/";

    private _fullNameInputLocator: Locator;
    private _sessionLanguageDropdownLocator: Locator;

    private _documentCountryDropdownLocator: Locator;
    private _documentTypeDropdownLocator: Locator;

    private _launchVeriffInContextRadioLocator: Locator;
    private _launchVeriffRedirectRadioLocator: Locator;

    private _consentTextLocator: Locator;
    private _privacyPolicyAnchorLocator: Locator;
    
    private _veriffMeButtonLocator: Locator;

    async initElements() {
        this._fullNameInputLocator = this._page.locator("input[name='name']");
        this._sessionLanguageDropdownLocator = this._page.locator("button[name='language']");

        this._documentCountryDropdownLocator = this._page.locator("input[name='documentCountry']");
        this._documentTypeDropdownLocator = this._page.locator("button[name='documentType']");

        this._launchVeriffInContextRadioLocator = this._page.locator("input[value='incontext']");
        this._launchVeriffRedirectRadioLocator = this._page.locator("input[value='redirect']");

        this._consentTextLocator = this._page.locator('p', {hasText: 'you consent that'});
        this._privacyPolicyAnchorLocator = this._page.locator("a", {hasText: 'Privacy Policy'});

        this._veriffMeButtonLocator = this._page.locator("button[type='submit']")
    }

    setFullName(fullName: string): Promise<void> {
        return this._fullNameInputLocator.fill(fullName);
    }

    setSessionLanguage(language: string): Promise<void> {
        return this.setCustomDropdown(this._sessionLanguageDropdownLocator, language);
    }

    setDocumentCountry(country: string): Promise<void> {
        this._documentCountryDropdownLocator.fill(country);
        return this.setCustomDropdownValue(country);
    }

    setDocumentType(documentType: string): Promise<void> {
        return this.setCustomDropdown(this._documentTypeDropdownLocator, documentType);
    }

    setVeriffLaunch(launchVeriffRedirect: boolean): Promise<void> {
        return launchVeriffRedirect
            ? this._launchVeriffRedirectRadioLocator.click()
            : this._launchVeriffInContextRadioLocator.click();
    }

    setCustomDropdown(elementLocator: Locator, elementValue: string): Promise<void> {
        elementLocator.click();
        return this.setCustomDropdownValue(elementValue);
    }

    setCustomDropdownValue(elementValue: string): Promise<void> {
        return this._page.locator('li', {hasText: elementValue}).click();
    }

    get fullNameInputLocator(): Locator {
        return this._fullNameInputLocator;
    }

    get sessionLanguageDropdownLocator(): Locator {
        return this._sessionLanguageDropdownLocator;
    }

    get documentCountryDropdownLocator(): Locator {
        return this._documentCountryDropdownLocator;
    }

    get documentTypeDropdownLocator(): Locator {
        return this._documentTypeDropdownLocator;
    }

    get launchVeriffInContextRadioLocator(): Locator {
        return this._launchVeriffInContextRadioLocator;
    }

    get launchVeriffRedirectRadioLocator(): Locator {
        return this._launchVeriffRedirectRadioLocator;
    }

    get consentTextLocator(): Locator {
        return this._consentTextLocator;
    }

    get privacyPolicyAnchorLocator(): Locator {
        return this._privacyPolicyAnchorLocator;
    }

    get veriffMeButtonLocator(): Locator {
        return this._veriffMeButtonLocator;
    }

    async clickOnPrivacyPolicyLink(): Promise<void> {
        await this._privacyPolicyAnchorLocator.click();
        await this._page.waitForLoadState();
    }

    clickOnVeriffMeButton(): Promise<void> {
        return this._veriffMeButtonLocator.click();
    }

    async fillUserData(launchVeriffRedirect: boolean): Promise<void> {
        await this.setFullName('User test');
        await this.setSessionLanguage('English');
        await this.setDocumentCountry('Guatemala');
        await this.setDocumentType('Passport');
        await this.setVeriffLaunch(launchVeriffRedirect);
    }

    async continueToVerificationFlow(launchVeriffRedirect: boolean): Promise<VerificationPage> {
        await this.clickOnVeriffMeButton();
        await this._page.waitForLoadState();

        const verificationPage = VerificationFactory.createObject(this._page, launchVeriffRedirect);
        await verificationPage.openPage();
        return verificationPage;
    }

    async fillUserDataAndContinueToVerificationFlow(launchVeriffRedirect: boolean): Promise<VerificationPage> {
        await this.fillUserData(launchVeriffRedirect);
        return await this.continueToVerificationFlow(launchVeriffRedirect);
    }
}
