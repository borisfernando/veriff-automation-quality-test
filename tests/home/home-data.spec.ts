import {expect, test} from "@playwright/test";
import {BaseTest} from "../base.spec";

test('Veriff Demo homepage has consent visible and privacy policy visible and clickable.',
    async ({page}) => {
        const baseTest = new BaseTest(page);

        const homePage = await baseTest.goToHomePage();
        await expect(homePage.isConsentTextDisplayed()).toBeTruthy();
        await expect(homePage.isPrivacyPolicyVisibleAndClickable()).toBeTruthy();

        await homePage.clickOnPrivacyPolicyLink();
        await expect(page.url()).toContain("https://www.veriff.com/privacy-policy");
    });