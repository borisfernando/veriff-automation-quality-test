export interface VeriffPage {
    _url: string;

    openPage(): Promise<void>;
    initElements(): void;
}