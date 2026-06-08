import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Extension should be registered', () => {
        const ext = vscode.extensions.getExtension('undefined_publisher.markdown-code-copy');
        assert.ok(ext, 'Extension should be registered');
    });
});
