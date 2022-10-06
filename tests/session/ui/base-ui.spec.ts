import {SessionConfigurationPage} from "../../../pages/session/session-configuration.page";
import {Page} from "@playwright/test";

export class BaseUiSpec {

    readonly _page: Page;

    constructor(page: Page) {
        this._page = page;
    }

    async goToSessionConfigurationPage(): Promise<SessionConfigurationPage> {
        const sessionConfiguration = new SessionConfigurationPage(this._page);
        await sessionConfiguration.openPage();
        return sessionConfiguration;
    }

}