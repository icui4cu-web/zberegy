const openBtn = document.querySelector('[data-mobile-nav-open-btn]')
const closeBtn = document.querySelector('[data-mobile-nav-close-btn]')
const overlay = document.querySelector('[data-mobile-nav-overlay]')

function toggle(isActive) {
	const nav = document.querySelector('[data-mobile-nav]')
	nav.classList.toggle('mobile-nav_open', isActive)
}

openBtn?.addEventListener('click', () => toggle(true))
closeBtn?.addEventListener('click', () => toggle(false))
overlay?.addEventListener('click', () => toggle(false))