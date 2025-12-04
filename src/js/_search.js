function toggle(search, isOpen) {
	search.classList.toggle('search_open', isOpen)
}

function reset(search) {
	const input = search.querySelector('[data-input]')
	input.value = ''
}

function init(search) {
	const resetBtn = search.querySelector('[data-reset-btn]')
	const openBtn = search.querySelector('[data-open-btn]')
	const closeBtn = search.querySelector('[data-close-btn]')

	resetBtn.addEventListener('click', () => reset(search))
	openBtn.addEventListener('click', () => toggle(search, true))
	closeBtn.addEventListener('click', () => toggle(search, false))
}

document.querySelectorAll('[data-search]').forEach(search => init(search))