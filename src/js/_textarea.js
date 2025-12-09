const textareas = document.querySelectorAll('[data-textarea-field]');

textareas.forEach(textarea => {
	const counter = textarea.closest('[data-textarea]')?.querySelector('[data-textarea-counter]');
	const maxLength = textarea.getAttribute('maxlength');

	if (!counter || !maxLength) return;

	function updateCounter() {
		const currentLength = textarea.value.length;
		counter.textContent = `${currentLength}/${maxLength}`;
	}

	updateCounter();

	textarea.addEventListener('input', updateCounter);
});