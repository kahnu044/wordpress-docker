
window.addEventListener("DOMContentLoaded", (event) => {
    const imageGalleries = document.querySelectorAll(`.eb-gallery-img-wrapper`);

    for (let imageGallery of imageGalleries) {
        let wrapperid = imageGallery.getAttribute("data-id");
        let defaultFilter = imageGallery.getAttribute("data-default-filter");
        let searchfilter = imageGallery.getAttribute("data-searchfilter");

        const loadMoreBtn = imageGallery.closest(".eb-parent-wrapper").querySelectorAll('.eb-img-gallery-loadmore')[0];
        const enableLoadmore = loadMoreBtn?.getAttribute("data-loadmore");;
        const enableInfiniteScroll = loadMoreBtn?.getAttribute("data-infinite-scroll");
        const initShow = Number(loadMoreBtn?.getAttribute("data-images-per-page")); //number of images loaded on init & onclick load more button
        let counter = initShow;

        // filter wrap
        const buttonGroups = imageGallery.closest(".eb-parent-wrapper").querySelectorAll(`.filter-wrapper-${wrapperid}`);

        // gallery item
        const selectFilters = imageGallery.closest(".eb-parent-wrapper").querySelectorAll('.eb-img-gallery-filter-item');

        // Dropdown filter selector
        const filterButton = imageGallery.closest(".eb-parent-wrapper").querySelectorAll(".eb-filter-select")[0];
        const navControls = imageGallery.closest(".eb-parent-wrapper").querySelectorAll(".eb-img-gallery-filter-wrapper")[0];
        const filterSpan = filterButton?.querySelector("span");

        // search input
        let showSearch = searchfilter === 'true' ? true : false;
        const quicksearch = imageGallery.closest(".eb-parent-wrapper").querySelector('.eb-search-gallery-input');
        const searchClose = imageGallery.closest(".eb-parent-wrapper").querySelector('.eb-search-gallery-close');

        // not found image
        const notFoundDiv = imageGallery.closest(".eb-parent-wrapper").querySelector('#eb-img-gallery-not-found');

        // add class is-checked
        if (selectFilters) {
            if (defaultFilter) {
                for (let selectFilter of selectFilters) {
                    const dataFilter = selectFilter.getAttribute("data-filter")
                    if (dataFilter === `.eb-filter-img-${defaultFilter}` || dataFilter === defaultFilter) {
                        selectFilter.classList.add("is-checked");
                    }
                }
            }
            else {
                selectFilters[0]?.classList.add("is-checked");
            }
        }

        // change is-checked class on buttons
        for (var i = 0, len = buttonGroups.length; i < len; i++) {
            var buttonGroup = buttonGroups[i];
            radioButtonGroup(buttonGroup);
        }

        function radioButtonGroup(buttonGroup) {
            buttonGroup.addEventListener("click", function (event) {
                // only work with buttons
                if (!matchesSelector(event.target, "li")) {
                    return;
                }
                buttonGroup.querySelector(".is-checked").classList.remove("is-checked");
                event.target.classList.add("is-checked");

                if (showSearch) {
                    // Set the button span text to the clicked item's text
                    filterSpan.textContent = event.target.textContent;

                    navControls.classList.remove("open-filters");
                }
            });
        }

        if (showSearch) {
            // Toggle the visibility of nav-controls when button is clicked
            filterButton?.addEventListener("click", function () {
                navControls.classList.toggle("open-filters");
            });
            // Remove 'open-filters' class on blur
            filterButton?.addEventListener("blur", () => {
                setTimeout(() => {
                    // Check if focus is still within navControls or filterButton
                    if (!document.activeElement.closest('.nav-controls') && document.activeElement !== filterButton) {
                        navControls.classList.remove("open-filters");
                    }
                }, 500);
            });
        }

        let iso;
        let qsRegex = null;
        let filterValue = "*";

        imagesLoaded(imageGallery, function () {
            const layoutMode = imageGallery.classList.contains("grid") ? "fitRows" : "masonry";
            const uneven = imageGallery.classList.contains("masonry-uneven") ? true : false;

            iso = new Isotope(`.${wrapperid}`, {
                itemSelector: ".eb-gallery-img-content",
                layoutMode: layoutMode,
                transitionDuration: '0.5s',
                percentPosition: layoutMode !== "fitRows",
                masonry: layoutMode !== "fitRows" ? { columnWidth: uneven ? '.grid-sizer' : '.eb-gallery-img-content' } : null,
                filter: function (itemElem, itemElem2) {
                    const element = itemElem || itemElem2; // Fallback to the one that's defined
                    if (!element) {
                        return false;
                    }

                    // Perform filtering based on text search and selected filter
                    var textContent = element?.textContent || "";
                    var matchesSearch = qsRegex ? textContent.match(qsRegex) : true;
                    var matchesFilter = filterValue === '*' || element.matches(filterValue);

                    // Check both search and filter criteria
                    return matchesSearch && matchesFilter;
                }
            });

            if (defaultFilter) {
                iso.arrange({ filter: defaultFilter === '*' ? '*' : `.eb-filter-img-${defaultFilter}` });
            }
            else {
                iso.arrange();
            }

            // Set up the search functionality
            if (showSearch) {
                quicksearch.addEventListener('keyup', function () {
                    searchClose.style.display = quicksearch.value.length > 0 ? "block" : "none";

                    iso.arrange({
                        filter: function (itemElem, itemElem2) {
                            const element = itemElem || itemElem2; // Fallback to the one that's defined
                            if (!element) {
                                return false;
                            }

                            // Perform filtering based on text search and selected filter
                            var textContent = element?.textContent || "";
                            var matchesSearch = qsRegex ? textContent.match(qsRegex) : true;
                            var matchesFilter = filterValue === '*' || element.matches(filterValue);

                            // Check both search and filter criteria
                            return matchesSearch && matchesFilter;
                        }
                    })
                    qsRegex = new RegExp(quicksearch.value, 'gi');

                    // Trigger Isotope rearrange based on new qsRegex
                    iso.arrange();

                    // Update Load More button state based on remaining items
                    const filteredCount = iso.filteredItems.length;

                    if (filteredCount > initShow) {
                        loadMoreBtn.style.display = "block";
                    } else {
                        loadMoreBtn.style.display = "none";
                    }
                });

                // clear search
                searchClose.addEventListener("click", (event) => {
                    event.preventDefault();
                    searchClose.style.display = "none";
                    quicksearch.value = '';
                    qsRegex = null;

                    // Arrange Isotope to show all items (reset filter and search)
                    iso.arrange();
                });
            }

            if (enableLoadmore === 'true' && enableInfiniteScroll === 'false') loadMore(iso, initShow);
            if (enableLoadmore === 'true' && enableInfiniteScroll === 'true') {
                // Enable infinite scroll
                window.addEventListener('scroll', function (e) {
                    if ((window.innerHeight + window.scrollY) >= imageGallery.offsetHeight) {
                        loadMore(iso, counter);
                        counter += initShow;
                    }
                });

                // Trigger initial load
                loadMore(iso, counter);
                counter += initShow;
            };


            // filter item
            var filtersElem = imageGallery.closest(".eb-parent-wrapper").querySelectorAll(`.filter-wrapper-${wrapperid} li`);

            // bind filter button click
            filtersElem.length > 0 && filtersElem.forEach((item) => {
                item.addEventListener("click", function (event) {
                    let imageGallery = item.closest(".eb-parent-wrapper").querySelector(`.${wrapperid}`);

                    filterValue = event.target.getAttribute("data-filter");

                    iso = Isotope.data(imageGallery);

                    if (iso) {
                        iso.arrange({ filter: filterValue });
                    }

                    // iso.destroy();
                });
            });

            // not found image
            if (notFoundDiv) {
                iso.on('arrangeComplete', function (filteredItems) {
                    if (filteredItems.length === 0) {
                        notFoundDiv.classList.add('show');
                        if (loadMoreBtn) {
                            loadMoreBtn.style.display = "none";
                        }
                    } else {
                        notFoundDiv.classList.remove('show');
                        if (loadMoreBtn) {
                            loadMoreBtn.style.display = "block";
                        }
                    }
                });
            }
        });

        // loadmore function
        function loadMore(isotopInstance, toShow) {
            const hiddenElements = imageGallery.querySelectorAll('.hidden');
            const layouts = imageGallery.classList.contains("grid") ? "fitRows" : "masonry";
            hiddenElements.forEach(function (element) {
                element.classList.remove('hidden');
            });

            const hiddenElems = isotopInstance.filteredItems?.slice(toShow, isotopInstance.filteredItems.length).map(function (item) {
                return item.element;
            });

            hiddenElems?.forEach(function (element) {
                element.classList.add('hidden');
            });

            iso.arrange({ layoutMode: layouts });

            // isotopInstance.isotope('layout');

            //when no more to load, hide show more button
            if (hiddenElems?.length == 0) {
                loadMoreBtn.style.display = "none";
            }
            else {
                loadMoreBtn.style.display = 'block';
            };

        }

        // Loadmore Btn
        if (enableLoadmore === 'true' && enableInfiniteScroll === 'false') {
            const filtersWrapper = imageGallery.closest(".eb-parent-wrapper").querySelector('.eb-img-gallery-filter-wrapper');

            if (filtersWrapper) { filtersWrapper.dataset.clicked = 'true' };

            loadMoreBtn.addEventListener("click", function (event) {
                iso = Isotope.data(`.${wrapperid}`);

                if (filtersWrapper?.dataset.clicked === 'true') {
                    // When filter button clicked, set the initial value for counter
                    counter = initShow;
                    filtersWrapper.dataset.clicked = 'false';
                } else {
                    counter = counter;
                }

                counter = counter + initShow;
                loadMore(iso, counter);
            });

            filtersWrapper?.addEventListener('click', function () {
                iso = Isotope.data(`.${wrapperid}`);
                this.dataset.clicked = 'true'; // Set data-clicked attribute to 'true'

                loadMore(iso, initShow);
            });
        }

        // Run re-layout when images load dynamically (if lazy loading affects)
        document.addEventListener("lazyloaded", function () {
            iso?.layout();
        });

        // Ensure layout is correct on window resize
        window.addEventListener("resize", function () {
            iso?.layout();
        });

    }
});
