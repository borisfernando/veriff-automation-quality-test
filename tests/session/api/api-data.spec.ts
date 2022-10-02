export class ApiDataSpec {
    static newSessionURL = 'https://demo.saas-3.veriff.me/';

    static expectedIntegrationUrl: string = "https://magic.saas-3.veriff.me";

    static actualMinimalData = {
        full_name: "User test",
        lang: "en",
        additionalData: {"isTest": false}
    };

    static actualFullData = {
        full_name: "User test",
        lang: "en",
        document_country: "GT",
        document_type: "PASSPORT",
        additionalData: {"isTest": false}
    }
}