function toggle(search) {
	search.classList.toggle('search_open')
}

function reset(search) {
	const input = search.querySelector('.search__query')
	input.value = ''
}

function init(search) {
	const resetBtn = search.querySelector('.search__reset')
	const toggleBtns = search.querySelectorAll('.search__toggle')

	resetBtn.addEventListener('click', () => reset(search))
	toggleBtns.forEach(btn => {
		btn.addEventListener('click', () => toggle(search))
	})
}

document.querySelectorAll('.search').forEach(search => init(search))