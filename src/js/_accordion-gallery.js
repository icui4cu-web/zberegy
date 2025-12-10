const galleries = document.querySelectorAll('.accordion-gallery');

galleries.forEach((gallery) => {
	const triggers = gallery.querySelectorAll('.accordion-gallery__accordion');
	const slides = gallery.querySelectorAll('.accordion-gallery__slide');

	triggers.forEach((trigger) => {
		trigger.addEventListener('toggle', function () {
			if (this.open) {
				const activeIndex = parseInt(this.dataset.index);

				slides.forEach((slide, slideIndex) => {
					if (slideIndex === activeIndex) {
						slide.style.zIndex = '0';
						slide.style.marginTop = '0';
						slide.style.marginLeft = '0';
					} else {
						let stackIndex;
						if (slideIndex < activeIndex) {
							stackIndex = slideIndex + 1;
						} else {
							stackIndex = slideIndex;
						}
						slide.style.zIndex = (stackIndex * -1).toString();
						slide.style.marginTop = (stackIndex * 18) + 'px';
						slide.style.marginLeft = (stackIndex * 18) + 'px';
					}
					slide.classList.toggle('accordion-gallery__slide_active', slideIndex === activeIndex)
				});

				if (window.innerWidth < 992) {
					const supportsInterpolateSize = CSS.supports('interpolate-size', 'allow-keywords');
					const delay = supportsInterpolateSize ? 550 : 50;

					setTimeout(() => {
						this.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						});
					}, delay);
				}
			}
		});
	});
});