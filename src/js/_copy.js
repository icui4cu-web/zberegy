import { showTooltip, hideTooltip } from './_tooltip.js';

async function copyToClipboard(text) {
    if (!navigator.clipboard) {
        throw new Error('Clipboard API не підтримується');
    }
    await navigator.clipboard.writeText(text);
}

function handleCopyButton(button) {
    const type = button.getAttribute('data-copy-type');
    const originalTooltip = button.getAttribute('data-tooltip');
    
    let textToCopy = '';
    
    try {
        if (type === 'url') {
            textToCopy = window.location.href;
        } else if (type === 'element') {
            const target = button.getAttribute('data-copy-target');
            const element = document.querySelector(target);
            
            if (!element) {
                throw new Error('Елемент не знайдено');
            }
            
            textToCopy = element.textContent.trim();
        } else {
            throw new Error('Невідомий тип копіювання');
        }
        
        copyToClipboard(textToCopy)
            .then(() => {
                button.setAttribute('data-tooltip', 'Скопійовано!');
                showTooltip(button);
                
                setTimeout(() => {
                    button.setAttribute('data-tooltip', originalTooltip);
                    hideTooltip();
                }, 3000);
            })
            .catch(() => {
                button.setAttribute('data-tooltip', 'Помилка копіювання');
                showTooltip(button);
                
                setTimeout(() => {
                    button.setAttribute('data-tooltip', originalTooltip);
                    hideTooltip();
                }, 3000);
            });
            
    } catch (error) {
        button.setAttribute('data-tooltip', 'Помилка копіювання');
        showTooltip(button);
        
        setTimeout(() => {
            button.setAttribute('data-tooltip', originalTooltip);
            hideTooltip();
        }, 3000);
    }
}

document.querySelectorAll('[data-copy-type]').forEach(button => {
    button.addEventListener('click', () => handleCopyButton(button));
});