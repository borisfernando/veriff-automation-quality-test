import {expect, test} from "@playwright/test";
import {ApiDataSpec} from "./api-data.spec";

test('New session api without additional configuration works as expected.',
    async ({request}) => {
        const newSession = await request.post(ApiDataSpec.newSessionURL, {
            data: ApiDataSpec.actualMinimalData
        });
        expect(newSession.ok()).toBeTruthy();

        const newSessionResponse = await newSession.json();
        expect(newSessionResponse.integrationUrl).toBe(ApiDataSpec.expectedIntegrationUrl);
        expect(newSessionResponse.sessionToken).toBeTruthy();
    });

test('New session api with additional configuration works as expected.',
    async ({request}) => {
        const newSession = await request.post(ApiDataSpec.newSessionURL, {
            data: ApiDataSpec.actualFullData
        });
        expect(newSession.ok()).toBeTruthy();

        const newSessionResponse = await newSession.json();
        expect(newSessionResponse.integrationUrl).toBe(ApiDataSpec.expectedIntegrationUrl);
        expect(newSessionResponse.sessionToken).toBeTruthy();
    });
