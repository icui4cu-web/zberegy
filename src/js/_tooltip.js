const tooltip = document.querySelector('[data-tooltip-container]');
let popperInstance = null;

export function showTooltip(button) {
	const tooltipText = button.getAttribute('data-tooltip');
	tooltip.querySelector('[data-content]').textContent = tooltipText;

	if (popperInstance) {
		popperInstance.destroy();
	}

	popperInstance = Popper.createPopper(button, tooltip, {
		placement: 'top',
		modifiers: [
			{
				name: 'offset',
				options: {
					offset: [0, 18],
				},
			},
			{
				name: 'preventOverflow',
				options: {
					padding: 15,
					boundary: 'viewport',
				},
			},
			{
				name: 'arrow',
				options: {
					element: tooltip.querySelector('[data-arrow]'),
				},
			},
		],
	});

	tooltip.classList.add('tooltip_show');
}

export function hideTooltip() {
	tooltip.classList.remove('tooltip_show');

	if (popperInstance) {
		popperInstance.destroy();
		popperInstance = null;
	}
}

document.querySelectorAll('[data-tooltip]').forEach(button => {
	button.addEventListener('mouseenter', () => showTooltip(button));
	button.addEventListener('mouseleave', hideTooltip);
});