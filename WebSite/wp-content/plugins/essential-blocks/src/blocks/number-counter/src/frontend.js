/**
 * WordPress dependencies
 */
import domReady from '@wordpress/dom-ready';

domReady(function () {
	var counters = document.querySelectorAll(".eb-counter-wrapper .eb-counter");
	if (!counters) return;

	// Function to format the inner text based on separator settings
	function textInsideFrontEnd(value, isShowSeparator, separator) {
		return isShowSeparator === "true"
			? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, separator)
			: value.toString();
	}

	// Function to start the counter animation
	function startCounter(counter) {
		var target = +counter.getAttribute("data-target");
		var duration = +counter.getAttribute("data-duration");
		var startValue = +counter.getAttribute("data-startValue");
		var isShowSeparator = counter.getAttribute("data-isShowSeparator");
		var separator = counter.getAttribute("data-separator");

		var x = startValue < target ? startValue : 0;
		var increaseBy = ((target - x) / duration) * 53;

		function updateCount() {
			x += increaseBy;
			counter.innerText = textInsideFrontEnd(
				Math.floor(x),
				isShowSeparator,
				separator
			);

			if (x < target) {
				setTimeout(updateCount, 53);
			} else {
				counter.innerText = textInsideFrontEnd(
					target,
					isShowSeparator,
					separator
				);
			}
		}

		updateCount();
	}

	// IntersectionObserver setup
	var observerOptions = {
		threshold: 0.25, // Trigger when 25% of the element is visible
	};

	var observer = new IntersectionObserver(function (entries, observer) {
		entries.forEach(function (entry) {
			if (entry.isIntersecting) {
				// Start counter animation when the element is in view
				startCounter(entry.target);
				// Remove observer after animation starts to prevent re-triggering
				observer.unobserve(entry.target);
			}
		});
	}, observerOptions);

	// Observe each counter element
	counters.forEach(function (counter) {
		observer.observe(counter);
	});
});
