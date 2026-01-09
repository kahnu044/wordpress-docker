window.addEventListener("DOMContentLoaded", () => {
	const instagrams = document.getElementsByClassName(`eb-instagram__gallery`);

	setTimeout(() => {
		for (let instagram of instagrams) {
			imagesLoaded(instagram, function () {
				// Get the hasEqualImages value from data attribute
				const hasEqualImages = instagram.getAttribute('data-has-equal-images') === 'true';

				// Only apply masonry layout when hasEqualImages is false
				if (!hasEqualImages) {
					new Isotope(instagram, {
						itemSelector: ".instagram__gallery__col",
						percentPosition: true,
						masonry: {
							columnWidth: ".instagram__gallery__col",
						},
					});
				}
			});
		}
	}, 1000);
});
