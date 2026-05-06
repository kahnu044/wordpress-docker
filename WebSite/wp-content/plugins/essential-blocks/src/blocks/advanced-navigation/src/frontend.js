window.addEventListener("DOMContentLoaded", () => {
    const advNavs = document.querySelectorAll(
        ".eb-advanced-navigation-wrapper"
    );

    // Responsive
    function ebResponsiveNav(selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (element) {
            // Insert indicator for parent menu items.
            // Use insertAdjacentHTML instead of `innerHTML +=` so we don't re-parse
            // and destroy existing children — that strips WP core's Interactivity
            // API bindings (data-wp-*) on the nav, which breaks the hamburger menu
            // and causes "Failed to resolve module specifier @wordpress/interactivity".
            var parentItems = element.querySelectorAll('.wp-block-navigation.is-responsive > li.wp-block-navigation-submenu');
            parentItems.forEach(function (parentItem) {
                if (!parentItem.querySelector(':scope > .eb-menu-indicator')) {
                    parentItem.insertAdjacentHTML('beforeend', '<span class="eb-menu-indicator"></span>');
                }
            });
            // Insert indicator for submenu items
            var submenuItems = element.querySelectorAll('.wp-block-navigation.is-responsive > li ul li.wp-block-navigation-submenu');
            submenuItems.forEach(function (submenuItem) {
                if (!submenuItem.querySelector(':scope > .eb-menu-indicator')) {
                    submenuItem.insertAdjacentHTML('beforeend', '<span class="eb-menu-indicator"></span>');
                }
            });

            // Add event listener for toggle button
            // element.nextElementSibling.addEventListener('click', function (e) {
            //     e.preventDefault();
            //     var navMenu = this.previousElementSibling;
            //     if (navMenu.style.display === 'none' || navMenu.style.display === '') {
            //         navMenu.style.display = 'block';
            //     } else {
            //         navMenu.style.display = 'none';
            //     }
            //     // this.classList.toggle('eb-menu-toggle-open');
            // });

            // Clear responsive properties
            function clearResponsiveProps() {
                var navMenu = element.querySelector('.wp-block-navigation.is-responsive');

                if (navMenu) {
                    var menuIndicators = element.querySelectorAll('.eb-menu-indicator');
                    menuIndicators.forEach(function (indicator) {
                        indicator.classList.remove('eb-menu-indicator-open');
                    });
                    var allMenus = element.querySelectorAll('.nav-menu, .nav-menu ul');
                    allMenus.forEach(function (menu) {
                        menu.style.display = '';
                    });
                }
            }

            // window.addEventListener('resize', clearResponsiveProps);
            // window.addEventListener('load', clearResponsiveProps);

            window.addEventListener('load', function () {
                /**
                 * menu indicator height
                 */
                element.querySelectorAll('.eb-menu-indicator').forEach(function (indicator) {
                    indicator?.addEventListener('click', function (e) {
                        e.preventDefault();
                        // Find the parent li element and its corresponding anchor tag
                        const parentLi = this.parentNode;
                        const anchor = parentLi.querySelector('a');
                        const anchorHeight = anchor.getBoundingClientRect().height;
                        const indecatorHeight = 25;
                        const elementTop = anchorHeight - indecatorHeight;
                        // Set the height of the indicator to match the height of the anchor
                        // this.style.height = anchor.getBoundingClientRect().height + 'px';
                        this.style.top = elementTop / 2 + 'px';
                    });
                });
            });

            // Add event listener for menu indicators
            element.addEventListener('click', function (e) {
                if (e.target.classList.contains('eb-menu-indicator')) {
                    e.preventDefault();
                    e.target.classList.toggle('eb-menu-indicator-open');
                    var submenu = e.target.previousElementSibling;
                    if (submenu.style.display === 'none' || submenu.style.display === '') {
                        submenu.style.display = 'block';
                    } else {
                        submenu.style.display = 'none';
                    }
                }
            });



        });
    }

    for (let advNav of advNavs) {
        let anchors = advNav.querySelectorAll(
            ".wp-block-navigation-item__content"
        );

        const mediaQuery = window.matchMedia("(max-width: 767px)");
        // if (mediaQuery.matches) {
        anchors.forEach((anchor) => {
            anchor?.addEventListener("click", function (e) {
                const href = this.getAttribute("href");
                if (anchor.hash !== "" && href && href !== "#") {
                    e.preventDefault();
                    advNav
                        .querySelector(
                            ".wp-block-navigation__responsive-container"
                        )
                        ?.classList.remove("is-menu-open", "has-modal-open");

                    window.open(href, "_self");
                }
            });
        });
        // }

        // anchor nav active class
        anchors.forEach((anchor) => {
            anchor
                .closest(".wp-block-navigation-item")
                ?.classList.remove("active");
            anchor.addEventListener("click", function (e) {
                anchors.forEach((a) => {
                    a.closest(".wp-block-navigation-item")?.classList.remove(
                        "current-menu-item"
                    );
                });

                if (anchor.hash !== "") {
                    anchor
                        .closest(".wp-block-navigation-item")
                        ?.classList.add("current-menu-item");
                }
            });
        });

        // Display indicator
        const hamburgerOpen = advNav.querySelector('.wp-block-navigation__responsive-container-open');
        const hamburgerClose = advNav.querySelector('.wp-block-navigation__responsive-container-close');

        hamburgerOpen?.addEventListener("click", function (e) {
            advNav.querySelectorAll('.eb-menu-indicator').forEach((indicator) => {
                indicator.style.display = 'block';
            });
        });
        hamburgerClose?.addEventListener("click", function (e) {
            advNav.querySelectorAll('.eb-menu-indicator').forEach((indicator) => {
                indicator.style.display = 'none';
            });
        });
    }

    // Call once after the per-wrapper setup so we don't process every wrapper
    // N times (the selector inside ebResponsiveNav re-queries the whole DOM).
    ebResponsiveNav('.eb-advanced-navigation-wrapper');
});
