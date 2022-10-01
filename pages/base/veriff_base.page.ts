import {VeriffPage} from "./veriff.page";
import {Page} from "@playwright/test";

export abstract class VeriffBasePage implements VeriffPage {
    protected readonly _page: Page;

    constructor(page: Page) {
        this._page = page;
        this.initElements();
    }

    abstract openPage(): Promise<void>;

    abstract initElements(): void;
}