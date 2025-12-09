// Находим все компоненты галереи
const galleries = document.querySelectorAll('[data-accordion-gallery]');

galleries.forEach((gallery) => {
	// Находим триггеры и изображения внутри конкретной галереи
	const triggers = gallery.querySelectorAll('[data-accordion-gallery-trigger]');
	const slides = gallery.querySelectorAll('[data-accordion-gallery-slide]');

	triggers.forEach((trigger) => {
		trigger.addEventListener('toggle', function () {
			if (this.open) {
				// Получаем индекс открытого details
				const activeIndex = parseInt(this.dataset.accordionGalleryTrigger);

				// Активируем соответствующий слайд
				slides.forEach((slide, slideIndex) => {
					if (slideIndex === activeIndex) {
						// Активный trigger
						slide.style.zIndex = '0';
						slide.style.marginTop = '0';
						slide.style.marginLeft = '0';
					} else {
						// Остальные слайды
						// Вычисляем новый индекс с учетом активного слайда
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

				// Прокрутка для мобильных устройств (до 992px)
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