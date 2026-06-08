export interface CopyButtonConfig {
    readonly buttonLabel: string;
    readonly successLabel: string;
    readonly successDurationMs: number;
}

export const DEFAULT_CONFIG: CopyButtonConfig = {
    buttonLabel: 'Copy',
    successLabel: 'Copied!',
    successDurationMs: 2000,
};
