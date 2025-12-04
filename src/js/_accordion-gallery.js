// Находим все компоненты галереи
const galleries = document.querySelectorAll('[accordion-gallery]');

galleries.forEach((gallery) => {
	// Находим триггеры и изображения внутри конкретной галереи
	const triggers = gallery.querySelectorAll('[accordion-gallery-trigger]');
	const images = gallery.querySelectorAll('[accordion-gallery-image]');

	triggers.forEach((trigger) => {
		trigger.addEventListener('toggle', function () {
			if (this.open) {
				// Получаем индекс открытого details
				const activeIndex = parseInt(this.getAttribute('accordion-gallery-trigger'));

				// Активируем соответствующее фото
				images.forEach((image, imgIndex) => {
					if (imgIndex === activeIndex) {
						// Активное фото
						image.style.zIndex = '0';
						image.style.marginTop = '0';
						image.style.marginLeft = '0';
					} else {
						// Остальные фото
						// Вычисляем новый индекс с учетом активного фото
						let stackIndex;
						if (imgIndex < activeIndex) {
							stackIndex = imgIndex + 1;
						} else {
							stackIndex = imgIndex;
						}
						image.style.zIndex = (stackIndex * -1).toString();
						image.style.marginTop = (stackIndex * 18) + 'px';
						image.style.marginLeft = (stackIndex * 18) + 'px';
					}
					image.classList.toggle('accordion-gallery__slide_active', imgIndex === activeIndex)
				});

				// Прокрутка для мобильных устройств (до 992px)
				if (window.innerWidth < 992) {
					setTimeout(() => {
						this.scrollIntoView({
							behavior: 'smooth',
							block: 'start'
						});
					}, 50);
				}
			}
		});
	});
});