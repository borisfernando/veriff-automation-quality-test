import {expect, test} from "@playwright/test";
import {BaseTest} from "../base.spec";

test('User can continue to session without entering data in context.',
    async ({page}) => {
            const baseTest = new BaseTest(page);

            const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
            await sessionConfiguration.setSessionLanguage('English');
            await sessionConfiguration.setVeriffLaunch(false);

            const verificationPage = await sessionConfiguration.continueToVerificationFlow(false);
            await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
    });

test('User can continue to session without entering data in redirect.',
    async ({page}) => {
            const baseTest = new BaseTest(page);

            const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
            await sessionConfiguration.setSessionLanguage('English');
            await sessionConfiguration.setVeriffLaunch(true);

            const verificationPage = await sessionConfiguration.continueToVerificationFlow(true);
            await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
    });

test('User can fill session configuration data in context.',
    async ({page}) => {
            const baseTest = new BaseTest(page);

            const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
            const verificationPage = await sessionConfiguration.fillUserDataAndContinueToVerificationFlow(false);
            await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
    });

test('User can fill Veriff Demo data in redirect.',
    async ({page}) => {
            const baseTest = new BaseTest(page);

            const sessionConfiguration = await baseTest.goToSessionConfigurationPage();
            const verificationPage = await sessionConfiguration.fillUserDataAndContinueToVerificationFlow(true);
            await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
    });