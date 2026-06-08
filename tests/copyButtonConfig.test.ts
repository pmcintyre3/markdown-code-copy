import * as assert from 'assert';
import { DEFAULT_CONFIG, CopyButtonConfig } from '../src/models/copyButtonConfig';

suite('CopyButtonConfig', () => {
    test('DEFAULT_CONFIG has expected button label', () => {
        assert.strictEqual(DEFAULT_CONFIG.buttonLabel, 'Copy');
    });

    test('DEFAULT_CONFIG has expected success label', () => {
        assert.strictEqual(DEFAULT_CONFIG.successLabel, 'Copied!');
    });

    test('DEFAULT_CONFIG has positive success duration', () => {
        assert.ok(DEFAULT_CONFIG.successDurationMs > 0);
    });

    test('DEFAULT_CONFIG satisfies CopyButtonConfig interface', () => {
        const config: CopyButtonConfig = DEFAULT_CONFIG;
        assert.strictEqual(typeof config.buttonLabel, 'string');
        assert.strictEqual(typeof config.successLabel, 'string');
        assert.strictEqual(typeof config.successDurationMs, 'number');
    });
});
