(function () {
    'use strict';

    const COPY_LABEL = 'Copy';
    const COPIED_LABEL = 'Copied!';
    const COPIED_DURATION_MS = 2000;

    async function copyText(text) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
        } else {
            // Fallback for environments without clipboard API
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.cssText = 'position:fixed;opacity:0;pointer-events:none';
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
    }

    function createCopyButton(codeText) {
        const button = document.createElement('button');
        button.className = 'markdown-copy-btn';
        button.textContent = COPY_LABEL;
        button.setAttribute('aria-label', 'Copy code to clipboard');
        button.setAttribute('title', 'Copy code');

        button.addEventListener('click', async (e) => {
            e.preventDefault();
            e.stopPropagation();
            try {
                await copyText(codeText);
                button.textContent = COPIED_LABEL;
                button.classList.add('markdown-copy-btn--copied');
                setTimeout(() => {
                    button.textContent = COPY_LABEL;
                    button.classList.remove('markdown-copy-btn--copied');
                }, COPIED_DURATION_MS);
            } catch (err) {
                console.error('[markdown-code-copy] Failed to copy:', err);
            }
        });

        return button;
    }

    function processCodeBlocks() {
        document.querySelectorAll('pre:not([data-copy-processed])').forEach(pre => {
            pre.setAttribute('data-copy-processed', 'true');
            const code = pre.querySelector('code');
            if (!code) { return; }

            const button = createCopyButton(code.textContent || '');
            pre.appendChild(button);
        });
    }

    function processInlineCode() {
        document.querySelectorAll('code:not(pre code):not([data-copy-processed])').forEach(code => {
            code.setAttribute('data-copy-processed', 'true');
            code.setAttribute('title', 'Click to copy');

            code.addEventListener('click', async () => {
                try {
                    await copyText(code.textContent || '');
                    code.setAttribute('data-copy-state', 'copied');
                    setTimeout(() => {
                        code.removeAttribute('data-copy-state');
                    }, COPIED_DURATION_MS);
                } catch (err) {
                    console.error('[markdown-code-copy] Failed to copy:', err);
                }
            });
        });
    }

    function init() {
        processCodeBlocks();
        processInlineCode();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Re-process after VS Code markdown preview re-renders content
    const observer = new MutationObserver(mutations => {
        const hasNewNodes = mutations.some(m => m.addedNodes.length > 0);
        if (hasNewNodes) {
            processCodeBlocks();
            processInlineCode();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}());
