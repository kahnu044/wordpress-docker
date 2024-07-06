window.addEventListener("DOMContentLoaded", () => {
    const advNavs = document.querySelectorAll(
        ".eb-advanced-navigation-wrapper"
    );

    // Responsive
    function ebResponsiveNav(selector) {
        var elements = document.querySelectorAll(selector);
        elements.forEach(function (element) {
            // Insert indicator for parent menu items
            var parentItems = element.querySelectorAll('.wp-block-navigation.is-responsive > li.wp-block-navigation-submenu');
            parentItems.forEach(function (parentItem) {
                var link = parentItem.querySelector('a');
                // link.innerHTML += '<span class="parent-menu-dropdown-icon" style="display: none"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 492 492" style="enable-background:new 0 0 492 492;" xml:space="preserve"> <g> <g> <path d="M265.2,390.7l218.9-218.9c5.1-5.1,7.9-11.8,7.9-19s-2.8-14-7.9-19L468,117.5c-10.5-10.5-27.6-10.5-38.1,0L246.1,301.4 L62,117.3c-5.1-5.1-11.8-7.9-19-7.9c-7.2,0-14,2.8-19,7.9L7.9,133.5c-5.1,5.1-7.9,11.8-7.9,19s2.8,14,7.9,19L227,390.7 c5.1,5.1,11.9,7.9,19.1,7.8C253.3,398.5,260.1,395.8,265.2,390.7z"/> </g> </g> </svg></span>';
                parentItem.innerHTML += '<span class="eb-menu-indicator"></span>';
            });
            // Insert indicator for submenu items
            var submenuItems = element.querySelectorAll('.wp-block-navigation.is-responsive > li ul li.wp-block-navigation-submenu');
            submenuItems.forEach(function (submenuItem) {
                var link = submenuItem.querySelector('a');
                // link.innerHTML += '<span class="submenu-menu-dropdown-icon" style="display: none"><svg version="1.1" viewBox="0 0 290 492" xmlns="http://www.w3.org/2000/svg"><g fill="none" fill-rule="evenodd"><g transform="translate(145 246) rotate(-90) translate(-246 -145)" fill="#000"><path d="m265.2 281.7 218.9-218.9c5.1-5.1 7.9-11.8 7.9-19s-2.8-14-7.9-19l-16.1-16.3c-10.5-10.5-27.6-10.5-38.1 0l-183.8 183.9-184.1-184.1c-5.1-5.1-11.8-7.9-19-7.9s-14 2.8-19 7.9l-16.1 16.2c-5.1 5.1-7.9 11.8-7.9 19s2.8 14 7.9 19l219.1 219.2c5.1 5.1 11.9 7.9 19.1 7.8 7.2 0 14-2.7 19.1-7.8z"/></g></g></svg></span>';
                submenuItem.innerHTML += '<span class="eb-menu-indicator"></span>';
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
                if (anchor.hash !== "") {
                    e.preventDefault();
                    advNav
                        .querySelector(
                            ".wp-block-navigation__responsive-container"
                        )
                        .classList.remove("is-menu-open", "has-modal-open");

                    const href = this.getAttribute("href");
                    window.open(href, "_self");
                }
            });
        });
        // }

        // anchor nav active class
        anchors.forEach((anchor) => {
            anchor
                .closest(".wp-block-navigation-item")
                .classList.remove("active");
            anchor.addEventListener("click", function (e) {
                anchors.forEach((a) => {
                    a.closest(".wp-block-navigation-item").classList.remove(
                        "current-menu-item"
                    );
                });

                if (anchor.hash !== "") {
                    anchor
                        .closest(".wp-block-navigation-item")
                        .classList.add("current-menu-item");
                }
            });
        });

        // Call the function passing the selector
        ebResponsiveNav('.eb-advanced-navigation-wrapper');


        // Display indicator
        const indicators = advNav.querySelectorAll('.eb-menu-indicator');
        const hamburgerOpen = advNav.querySelector('.wp-block-navigation__responsive-container-open');
        const hamburgerClose = advNav.querySelector('.wp-block-navigation__responsive-container-close');

        hamburgerOpen?.addEventListener("click", function (e) {
            indicators?.forEach((indicator) => {
                indicator.style.display = 'block';
            });
        });
        hamburgerClose?.addEventListener("click", function (e) {
            indicators?.forEach((indicator) => {
                indicator.style.display = 'none';
            });
        });
    }
});
