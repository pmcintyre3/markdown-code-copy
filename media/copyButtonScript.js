(function() {
    'use strict';

    const FEEDBACK_DURATION_MS = 2000;
    const COPIED_CLASS = 'copied';
    const FAILED_CLASS = 'copy-failed';

    // Add click handlers to copy buttons
    document.addEventListener('click', (event) => {
        const target = event.target;

        // Handle fenced code block copy buttons
        if (target?.classList && target.classList.contains('copy-button')) {
            const blockId = target.getAttribute('data-code-block-id');
            const codeBlock = blockId ? document.getElementById(blockId) : null;

            if(codeBlock) {
                const codeElement = codeBlock.querySelector('code');
                if(codeElement) {
                    const code = codeElement.textContent || codeElement.innerText;
                    copyToClipboard(code, target);
                }
            }
            return;
        }

        // Handle inline code copy buttons
        if (target?.classList && target.classList.contains('copy-button-inline')) {
            const inlineId = target.getAttribute('data-inline-code-id');
            const inlineWrapper = inlineId ? document.getElementById(inlineId) : null;

            if (inlineWrapper) {
                const codeElement = inlineWrapper.querySelector('code');
                if (codeElement) {
                    const code = codeElement.textContent || codeElement.innerText;
                    copyToClipboard(code, target);
                }
            }
        }
    });

    /**
     * Copies the given text to the clipboard and provides feedback to the user.
     * 
     * Uses the CLipboard API and falls back to `execCommand()` when unavailable
     * or when the API rejects (e.g. permission denied, insecure context, etc.)
     * @param {string} text 
     * @param {HTMLElement} button
     * @returns {Promise<boolean>} Resolves to true if the copy was successful, false otherwise
     */
    async function copyToClipboard(text, button) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            try {
                await navigator.clipboard.writeText(text);
                showCopyFeedback(button, 'Copied!');
                return true;
            } catch (err) {
                console.error('Clipboard API copy failed:', err);
                return fallbackCopy(text, button, 'Failed to copy (clipboard blocked)');
            }
        }

        return Promise.resolve(fallbackCopy(text, button, 'Failed to copy (browser unsupported)'));
    }

    /**
     * Fallback method for copying text to the clipboard via a hidden textarea.
     * @param {string} text 
     * @param {HTMLElement} button 
     * @param {string} failureMessage
     * @returns {boolean} True if the copy was successful, false otherwise
     */
    function fallbackCopy(text, button, failureMessage) {
        try {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge.
            textarea.style.opacity = '0';  // Make it invisible
            textarea.style.pointerEvents = 'none';  // Prevent interaction
            document.body.appendChild(textarea);

            // 'execCommand' is depreciated but still hte only sync clipboard API available when the Clipboard API is unavailable or rejected.
            textarea.select();
            textarea.setSelectionRange(0, text.length);  // For mobile devices
            const successful = document.execCommand('copy');
            document.body.removeChild(textarea);

            if (successful) {
                showCopyFeedback(button, 'Copied!');
                return true;
            }

            showCopyFeedback(button, failureMessage, true);
            return false;
        } catch (err) {
            console.error('Fallback copy failed:', err);
            showCopyFeedback(button, failureMessage, true);
            return false;
        }
    }

    /**
     * Shows feedback to the user after a copy attempt by toggling a CSS class
     * (so theme variables in `styles.css` drive the colors instead of inline styles).
     * @param {HTMLElement} button 
     * @param {string} message 
     * @param {boolean} isError
     */
    function showCopyFeedback(button, message, isError = false) {
        const originalText = button.textContent;
        const isInlineButton = button.classList.contains('copy-button-inline');
        const stateClass = isError ? FAILED_CLASS : COPIED_CLASS;

        button.classList.remove(COPIED_CLASS, FAILED_CLASS);
        button.classList.add(stateClass);

        if (isInlineButton) {
            button.textContent = isError ? 'X' : '✓';
        } else {
            button.textContent = message;
        }
        setTimeout(() => {
            button.textContent = originalText;
            button.classList.remove(stateClass);
        }, FEEDBACK_DURATION_MS);
    }
})();