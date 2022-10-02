import {expect, test} from "@playwright/test";
import {BaseUiSpec} from "./base-ui.spec";

test('Verify users can start an InContext session without session configuration.',
    async ({page}) => {
        const baseTest = new BaseUiSpec(page);

        const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
        await sessionConfiguration.setSessionLanguage('English');
        await sessionConfiguration.setVeriffLaunch(false);

        const verificationPage = await sessionConfiguration.continueToVerificationFlow(false);
        await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
    });

test('Verify users can start a Redirect session without session configuration.',
    async ({page}) => {
        const baseTest = new BaseUiSpec(page);

        const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
        await sessionConfiguration.setSessionLanguage('English');
        await sessionConfiguration.setVeriffLaunch(true);

        const verificationPage = await sessionConfiguration.continueToVerificationFlow(true);
        await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
    });

test('Verify users can fill in information and start an InContext session.',
    async ({page}) => {
        const baseTest = new BaseUiSpec(page);

        const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
        const verificationPage = await sessionConfiguration.fillUserDataAndContinueToVerificationFlow(false);
        await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
    });

test('Verify users can fill in information and start a Redirect session.',
    async ({page}) => {
        const baseTest = new BaseUiSpec(page);

        const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
        const verificationPage = await sessionConfiguration.fillUserDataAndContinueToVerificationFlow(true);
        await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
    });