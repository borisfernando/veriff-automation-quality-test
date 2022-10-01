import {HomePage} from "../pages/home.page";
import {Page} from "@playwright/test";

export class BaseTest {

    readonly _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    async goToHomePage() {
        const homePage = new HomePage(this._page);
        await homePage.openPage();
    }

}