import {expect, test} from "@playwright/test";
import {BaseUiSpec} from "./base-ui.spec";
import {SessionConfigurationPage} from "../../../pages/session/session-configuration.page";

test.describe("session-config-elements", () => {
    let sessionConfiguration: SessionConfigurationPage;

    test.beforeEach(async ({page}) => {
        const baseUiSpec = new BaseUiSpec(page);
        sessionConfiguration = await baseUiSpec.goToSessionConfigurationPage();
    });

    test('Verify users can see all available options for session configuration.',
        async () => {
            await expect(sessionConfiguration.logoLocator).toBeVisible();

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
        async () => {
            const fullName = 'Test user';
            await sessionConfiguration.setFullName(fullName);
            await expect(await sessionConfiguration.fullNameInputLocator.getAttribute('value'))
                .toBe(fullName);

            const language = 'English';
            await sessionConfiguration.setSessionLanguage(language);
            await expect(await sessionConfiguration.sessionLanguageDropdownLocator.innerText())
                .toBe(language);

            const documentCountry = 'Guatemala';
            await sessionConfiguration.setDocumentCountry(documentCountry);
            await expect(await sessionConfiguration.documentCountryDropdownLocator.getAttribute('value'))
                .toBe(documentCountry);

            const documentType = 'Passport';
            await sessionConfiguration.setDocumentType(documentType);
            await expect(await sessionConfiguration.documentTypeDropdownLocator.innerText())
                .toBe(documentType);

            await sessionConfiguration.setVeriffLaunch(true);
            await expect(sessionConfiguration.launchVeriffRedirectRadioLocator).toBeChecked();

            await sessionConfiguration.setVeriffLaunch(false);
            await expect(sessionConfiguration.launchVeriffInContextRadioLocator).toBeChecked();
        });

    test('Verify users can see the consent and privacy policy information.',
        async ({page}) => {
            await expect(sessionConfiguration.consentTextLocator).toBeVisible();
            await expect(sessionConfiguration.consentTextLocator)
                .toContainText('your audio, video and technical information may be recorded and processed ' +
                    'for the purposes of testing Veriff’s verification flow');

            await expect(sessionConfiguration.privacyPolicyAnchorLocator).toBeVisible();
            await expect(sessionConfiguration.privacyPolicyAnchorLocator)
                .toContainText('Privacy Policy');

            await sessionConfiguration.clickOnPrivacyPolicyLink();
            await expect(page.url()).toContain("https://www.veriff.com/privacy-policy");
        });
});