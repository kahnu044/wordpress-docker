window.addEventListener("DOMContentLoaded", (event) => {
    const imageGalleries = document.querySelectorAll(
        `.eb-gallery-img-wrapper.eb-filterable-img-gallery`
    );

    // filter functions
    var filterFns = {
        // show if number is greater than 50
        numberGreaterThan50: function (itemElem) {
            var number = itemElem.querySelector(".number").textContent;
            return parseInt(number, 10) > 50;
        },
        // show if name ends with -ium
        ium: function (itemElem) {
            var name = itemElem.querySelector(".name").textContent;
            return name.match(/ium$/);
        },
    };

    for (let imageGallery of imageGalleries) {
        let wrapperid = imageGallery.getAttribute("data-id");
        let defaultFilter = imageGallery.getAttribute("data-default-filter");

        // add class is-checked
        const selectFilters = imageGallery.closest(".eb-parent-wrapper").querySelectorAll('.eb-img-gallery-filter-item')
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
                selectFilters[0].classList.add("is-checked");
            }
        }

        var iso = "";

        imagesLoaded(imageGallery, function () {
            if (imageGallery.classList.contains("grid")) {
                iso = new Isotope(`.${wrapperid}`, {
                    itemSelector: ".eb-gallery-img-content",
                    layoutMode: "fitRows",
                });
            } else {
                iso = new Isotope(`.${wrapperid}`, {
                    itemSelector: ".eb-gallery-img-content",
                    percentPosition: true,
                    masonry: {
                        columnWidth: ".eb-gallery-img-content",
                    },
                });
            }
            iso.arrange({ filter: defaultFilter === '*' ? '*' : `.eb-filter-img-${defaultFilter}` });
        });

        // bind filter button click
        var filtersElem = imageGallery.closest(".eb-parent-wrapper").querySelectorAll(`.filter-wrapper-${wrapperid} li`);

        filtersElem.length > 0 && filtersElem.forEach((item) => {
            item.addEventListener("click", function (event) {
                let imageGallery = item
                    .closest(".eb-parent-wrapper")
                    .querySelector(`.${wrapperid}`);

                filterValue = event.target.getAttribute("data-filter");
                // use matching filter function
                filterValue = filterFns[filterValue] || filterValue;

                iso = Isotope.data(imageGallery);

                iso.arrange({ filter: filterValue });
                // iso.destroy();
            });
        });

        // change is-checked class on buttons
        var buttonGroups = document.querySelectorAll(
            `.filter-wrapper-${wrapperid}`
        );
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
            });
        }
    }
});
