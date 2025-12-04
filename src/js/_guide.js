if (typeof Swiper !== 'undefined') {
	let swiperInstance = null;

	function handleBreakpoint(e) {
		if (e.matches) {
			if (swiperInstance) {
				swiperInstance.destroy();
				swiperInstance = null;
			}
		} else {
			if (!swiperInstance) {
				swiperInstance = new Swiper('[data-guide-slider]', {
					pagination: {
						el: '.swiper-pagination'
					}
				});
			}
		}
	}

	const mediaQuery = matchMedia('(min-width: 768px)');
	mediaQuery.addEventListener('change', handleBreakpoint);

	handleBreakpoint(mediaQuery);
}