const textareas = document.querySelectorAll('.textarea');

textareas.forEach(textarea => {
	const counter = textarea.nextElementSibling;
	const maxLength = textarea.getAttribute('maxlength');

	if (!counter.classList.contains('textarea-counter') || !maxLength) return;

	function updateCounter() {
		const currentLength = textarea.value.length;
		counter.textContent = `${currentLength}/${maxLength}`;
	}

	updateCounter();

	textarea.addEventListener('input', updateCounter);
});