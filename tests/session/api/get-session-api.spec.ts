import {expect, test} from "@playwright/test";
import {ApiDataSpec} from "./api-data.spec";

test('New session data is consistent between APIs.',
    async ({request}) => {
        const newSession = await request.post(ApiDataSpec.newSessionURL, {
            data: ApiDataSpec.actualFullData
        });
        expect(newSession.ok()).toBeTruthy();

        const newSessionResponse = await newSession.json();
        const actualSession = await request.get(`${newSessionResponse.integrationUrl}/api/v2/sessions`, {
            headers: {
                'Authorization': `Bearer ${newSessionResponse.sessionToken}`
            }
        })
        expect(actualSession.ok()).toBeTruthy();

        const actualSessionResponse = await actualSession.json();
        const actualSessionData = actualSessionResponse.activeVerificationSession;
        expect(actualSessionData.status).toBe('created');
        expect(actualSessionResponse.initData.language).toBe(ApiDataSpec.actualFullData.lang);
        expect(actualSessionData.document.country).toBe(ApiDataSpec.actualFullData.document_country);
        expect(actualSessionData.document.type).toBe(ApiDataSpec.actualFullData.document_type);
    });
