import {VeriffBasePage} from "../base/veriff-base.page";
import {Locator} from "@playwright/test";

export abstract class VerificationPage extends VeriffBasePage {
    _url: string;

    protected headerTitleLocator: Locator;

    getHeaderLocator(): Locator {
        return this.headerTitleLocator;
    }
}