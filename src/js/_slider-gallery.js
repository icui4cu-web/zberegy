document.querySelectorAll('.slider-gallery').forEach(container => {
	const swiper = container.querySelector('.swiper')
	const navBtns = container.querySelectorAll('.slider-gallery__btn')
	const pagination = container.querySelector('.swiper-pagination')

	new Swiper(swiper, {
		slidesPerView: 1,
		spaceBetween: 10,
		loop: true,
		navigation: {
			prevEl: navBtns[0],
			nextEl: navBtns[1]
		},
		pagination: {
			el: pagination,
			enabled: true
		},
		breakpoints: {
			420: {
				pagination: { enabled: false }
			},
			480: {
				slidesPerView: 2,
				pagination: { enabled: false }
			},
			768: {
				slidesPerView: 3,
				pagination: { enabled: false }
			}
		}
	})
})
