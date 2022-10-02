import {expect, test} from "@playwright/test";
import {BaseUiSpec} from "./base-ui.spec";

test('Veriff Demo session configuration has all options visible. Specially consent and privacy policy.',
    async ({page}) => {
        const baseTest = new BaseUiSpec(page);

        const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
        await expect(sessionConfiguration.isNameInputDisplayed()).toBeTruthy();
        await expect(sessionConfiguration.isLanguageDisplayed()).toBeTruthy();
        await expect(sessionConfiguration.isCountryInputDisplayed()).toBeTruthy();
        await expect(sessionConfiguration.isDocumentTypeDisplayed()).toBeTruthy();
        await expect(sessionConfiguration.isSessionTypeDisplayed()).toBeTruthy();
        await expect(sessionConfiguration.isSessionTypeDisplayed()).toBeTruthy();

        await expect(sessionConfiguration.isConsentTextDisplayed()).toBeTruthy();
        await expect(sessionConfiguration.isPrivacyPolicyVisible()).toBeTruthy();

        await expect(sessionConfiguration.isVeriffButtonVisible()).toBeTruthy();
    });

test('Veriff Demo session configuration can access privacy policy.',
    async ({page}) => {
        const baseTest = new BaseUiSpec(page);

        const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
        await sessionConfiguration.clickOnPrivacyPolicyLink();
        await expect(page.url()).toContain("https://www.veriff.com/privacy-policy");
    });