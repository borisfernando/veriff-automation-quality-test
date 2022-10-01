import {VeriffPage} from "./veriff.page";
import {Page} from "@playwright/test";

export abstract class VeriffBasePage implements VeriffPage {
    protected readonly _page: Page;

    abstract _url: string;

    constructor(page: Page) {
        this._page = page;
    }

    async openPage(): Promise<void> {
        // If page doesn't have URL (like an alert), ignore.
        if (this._url != undefined) await this._page.goto(this._url);

        await this._page.waitForLoadState();
        await this.initElements();
    }

    abstract initElements(): void;
}