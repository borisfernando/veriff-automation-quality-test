import {HomePage} from "../pages/home/home.page";
import {Page} from "@playwright/test";

export class BaseTest {

    readonly _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    async goToHomePage(): Promise<HomePage> {
        const homePage = new HomePage(this._page);
        await homePage.openPage();
        return homePage;
    }

}