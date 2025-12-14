const openBtn = document.querySelector('.header__nav-btn')
const closeBtn = document.querySelector('.mobile-nav__close-btn')
const overlay = document.querySelector('.mobile-nav-overlay')

function toggle(isActive) {
	const nav = document.querySelector('.mobile-nav')
	nav.classList.toggle('mobile-nav_open', isActive)
	document.body.classList.toggle('mobile-nav-scroll-lock')
}

openBtn?.addEventListener('click', () => toggle(true))
closeBtn?.addEventListener('click', () => toggle(false))
overlay?.addEventListener('click', () => toggle(false))