import {expect, test} from "@playwright/test";
import {BaseUiSpec} from "./base-ui.spec";

test('Verify users can see all available options for session configuration.',
    async ({page}) => {
        const baseTest = new BaseUiSpec(page);

        const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
        await expect(sessionConfiguration.fullNameInputLocator).toBeVisible();
        await expect(sessionConfiguration.sessionLanguageDropdownLocator).toBeVisible();
        await expect(sessionConfiguration.documentCountryDropdownLocator).toBeVisible();
        await expect(sessionConfiguration.documentTypeDropdownLocator).toBeVisible();
        await expect(sessionConfiguration.launchVeriffInContextRadioLocator).toBeVisible();
        await expect(sessionConfiguration.launchVeriffRedirectRadioLocator).toBeVisible();

        await expect(sessionConfiguration.consentTextLocator).toBeVisible();
        await expect(sessionConfiguration.privacyPolicyAnchorLocator).toBeVisible();

        await expect(sessionConfiguration.veriffMeButtonLocator).toBeVisible();
    });

test('Verify users can fill in information and data is consistent.',
    async ({page}) => {
        const baseTest = new BaseUiSpec(page);

        const sessionConfiguration = await baseTest.goToSessionConfigurationPage();

        await sessionConfiguration.setFullName('Test user');
        await expect(await sessionConfiguration.fullNameInputLocator.getAttribute('value'))
            .toBe('Test user');

        await sessionConfiguration.setSessionLanguage('English');
        await expect(await sessionConfiguration.sessionLanguageDropdownLocator.innerText())
            .toBe('English');

        await sessionConfiguration.setDocumentCountry('Guatemala');
        await expect(await sessionConfiguration.documentCountryDropdownLocator.getAttribute('value'))
            .toBe('Guatemala');

        await sessionConfiguration.setDocumentType('Passport');
        await expect(await sessionConfiguration.documentTypeDropdownLocator.innerText())
            .toBe('Passport');

        await sessionConfiguration.setVeriffLaunch(true);
        await expect(sessionConfiguration.launchVeriffRedirectRadioLocator).toBeChecked();

        await sessionConfiguration.setVeriffLaunch(false);
        await expect(sessionConfiguration.launchVeriffInContextRadioLocator).toBeChecked();
    });

test('Verify users can see the consent and privacy policy information.',
    async ({page}) => {
        const baseTest = new BaseUiSpec(page);

        const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
        await expect(sessionConfiguration.consentTextLocator).toBeVisible();
        await sessionConfiguration.clickOnPrivacyPolicyLink();
        await expect(page.url()).toContain("https://www.veriff.com/privacy-policy");
    });