import {expect, test} from "@playwright/test";
import {BaseUiSpec} from "./base-ui.spec";
import {SessionConfigurationPage} from "../../../pages/session/session-configuration-page";

test.describe("session-config-flow", () => {
    let sessionConfiguration: SessionConfigurationPage;

    test.beforeEach(async ({page}) => {
        const baseUiSpec = new BaseUiSpec(page);
        sessionConfiguration = await baseUiSpec.goToSessionConfigurationPage();
    });

    test('Verify users can start an InContext session without session configuration.',
        async () => {
            await sessionConfiguration.setSessionLanguage('English');
            await sessionConfiguration.setVeriffLaunch(false);

            const verificationPage = await sessionConfiguration.continueToVerificationFlow(false);
            await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
        });

    test('Verify users can start a Redirect session without session configuration.',
        async () => {
            await sessionConfiguration.setSessionLanguage('English');
            await sessionConfiguration.setVeriffLaunch(true);

            const verificationPage = await sessionConfiguration.continueToVerificationFlow(true);
            await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
        });

    test('Verify users can fill in information and start an InContext session.',
        async () => {
            const verificationPage = await sessionConfiguration.fillUserDataAndContinueToVerificationFlow(false);
            await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
        });

    test('Verify users can fill in information and start a Redirect session.',
        async () => {
            const verificationPage = await sessionConfiguration.fillUserDataAndContinueToVerificationFlow(true);
            await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
        });
});