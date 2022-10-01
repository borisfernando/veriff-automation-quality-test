import {expect, test} from "@playwright/test";
import {BaseTest} from "../base.spec";

test('User can fill Veriff Demo data in context.',
    async ({page}) => {
            const baseTest = new BaseTest(page);

            const homePage = await baseTest.goToHomePage();
            const verificationPage = await homePage.fillUserDataAndContinueToVerificationFlow(false);
            await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
    });

test('User can fill Veriff Demo data in redirect.',
    async ({page}) => {
            const baseTest = new BaseTest(page);

            const homePage = await baseTest.goToHomePage();
            const verificationPage = await homePage.fillUserDataAndContinueToVerificationFlow(true);
            await expect(verificationPage.getHeaderLocator()).toHaveText("Let's get you verified");
    });