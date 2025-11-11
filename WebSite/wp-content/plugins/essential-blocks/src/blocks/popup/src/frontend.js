document.addEventListener("DOMContentLoaded", function (event) {
    let eb_popups = document.querySelectorAll(".eb-popup-container");
    let main_wrapper = document.querySelectorAll(".modal-main-wrap");

    // Return if there is no popup block
    if (!eb_popups) return;

    var stopVideo = (item) => {
        var iframe = item.querySelector("iframe");
        var video = item.querySelector("video");
        if (iframe) {
            var iframeSrc = iframe.src;
            iframe.src = iframeSrc;
        }
        if (video) {
            video.pause();
        }
    };

    for (let x = 0; x < eb_popups.length; x++) {
        let close_btn = eb_popups[x].getAttribute("data-close-btn");

        // open popup with external identifier
        if ("external" == eb_popups[x].getAttribute("data-popup-type")) {
            let identifier = eb_popups[x].getAttribute(
                "data-external-identifier",
            );

            // Function to open popup
            const openPopup = () => {
                eb_popups[x]
                    .querySelector(".eb-popup-overlay")
                    .classList.remove("inactive");
                eb_popups[x]
                    .querySelector(".modal-main-wrap")
                    .classList.remove("inactive");
                eb_popups[x]
                    .querySelector(".eb-popup-overlay")
                    .classList.add("active");
                eb_popups[x]
                    .querySelector(".modal-main-wrap")
                    .classList.add("active");
                auto_exit(eb_popups[x]);
            };

            // Handle existing elements
            let external_identifiers = document.querySelectorAll(identifier);
            external_identifiers.forEach((item) => {
                item.addEventListener("click", openPopup);
            });

            // Use event delegation for dynamically loaded content (like Buttonizer buttons)
            // Prevent default behavior to avoid duplicate events
            document.addEventListener("click", (event) => {
                // Check if the clicked element matches the identifier
                if (event.target.matches && event.target.matches(identifier)) {
                    event.preventDefault();
                    openPopup();
                } else if (event.target.closest && event.target.closest(identifier)) {
                    // Handle cases where the click is on a child element
                    event.preventDefault();
                    openPopup();
                }
            });
        }

        // open poup on page load
        if ("page_load" == eb_popups[x].getAttribute("data-popup-type")) {
            if ("false" == eb_popups[x].getAttribute("data-use-cookie")) {
                eb_set_popup_cookie(
                    eb_popups[x].getAttribute("data-use-cookie"),
                    eb_popups[x].getAttribute("data-block-id"),
                    eb_popups[x].getAttribute("data-cookie-expire-time"),
                );
            }

            let cookiesValue = eb_get_popup_cookie(
                eb_popups[x].getAttribute("data-block-id"),
            );

            if ("yes" == cookiesValue) {
                eb_popups[x]
                    .querySelector(".eb-popup-overlay")
                    .classList.remove("active");
                eb_popups[x]
                    .querySelector(".modal-main-wrap")
                    .classList.remove("active");
                eb_popups[x]
                    .querySelector(".eb-popup-overlay")
                    .classList.add("inactive");
                eb_popups[x]
                    .querySelector(".modal-main-wrap")
                    .classList.add("inactive");
                document.body.classList.remove("eb-popup-block-overflow");
            } else {
                setTimeout(
                    () => {
                        eb_popups[x]
                            .querySelector(".eb-popup-overlay")
                            .classList.remove("inactive");
                        eb_popups[x]
                            .querySelector(".modal-main-wrap")
                            .classList.remove("inactive");
                        eb_popups[x]
                            .querySelector(".eb-popup-overlay")
                            .classList.add("active");
                        eb_popups[x]
                            .querySelector(".modal-main-wrap")
                            .classList.add("active");
                        eb_set_popup_cookie(
                            eb_popups[x].getAttribute("data-use-cookie"),
                            eb_popups[x].getAttribute("data-block-id"),
                            eb_popups[x].getAttribute(
                                "data-cookie-expire-time",
                            ),
                        );
                    },
                    parseInt(eb_popups[x].getAttribute("data-popup-delay")) *
                        1000,
                );
            }
            auto_exit(eb_popups[x]);
        }

        // open popup on button click
        if ("btn_click" == eb_popups[x].getAttribute("data-popup-type")) {
            eb_popups[x].querySelector(".eb-popup-button-anchor").onclick =
                function () {
                    eb_popups[x]
                        .querySelector(".eb-popup-overlay")
                        .classList.remove("inactive");
                    eb_popups[x]
                        .querySelector(".modal-main-wrap")
                        .classList.remove("inactive");
                    eb_popups[x]
                        .querySelector(".eb-popup-overlay")
                        .classList.add("active");
                    eb_popups[x]
                        .querySelector(".modal-main-wrap")
                        .classList.add("active");

                    eb_popups[x].getAttribute("data-page-scroll") === "true"
                        ? null
                        : document.body.classList.add(
                              "eb-popup-block-overflow",
                          );
                    auto_exit(eb_popups[x]);
                };
        }

        //open popup on exit intent
        if ("exit_intent" == eb_popups[x].getAttribute("data-popup-type")) {
            if ("false" == eb_popups[x].getAttribute("data-use-cookie")) {
                eb_set_popup_cookie(
                    eb_popups[x].getAttribute("data-use-cookie"),
                    eb_popups[x].getAttribute("data-block-id"),
                    eb_popups[x].getAttribute("data-cookie-expire-time"),
                );
            }
            let displayedCookie = false;

            let cookiesValue = eb_get_popup_cookie(
                eb_popups[x].getAttribute("data-block-id"),
            );

            if ("yes" == cookiesValue) {
                eb_popups[x]
                    .querySelector(".eb-popup-overlay")
                    .classList.remove("active");
                eb_popups[x]
                    .querySelector(".modal-main-wrap")
                    .classList.remove("active");
                eb_popups[x]
                    .querySelector(".eb-popup-overlay")
                    .classList.add("inactive");
                eb_popups[x]
                    .querySelector(".modal-main-wrap")
                    .classList.add("inactive");
                document.body.classList.remove("eb-popup-block-overflow");
            } else {
                document.addEventListener("mouseleave", function (e) {
                    if (e.clientY < 0) {
                        if (!displayedCookie) {
                            eb_popups[x]
                                .querySelector(".eb-popup-overlay")
                                .classList.remove("inactive");
                            eb_popups[x]
                                .querySelector(".modal-main-wrap")
                                .classList.remove("inactive");
                            eb_popups[x]
                                .querySelector(".eb-popup-overlay")
                                .classList.add("active");
                            eb_popups[x]
                                .querySelector(".modal-main-wrap")
                                .classList.add("active");
                            eb_popups[x].getAttribute("data-page-scroll") ===
                            "true"
                                ? null
                                : document.body.classList.add(
                                      "eb-popup-block-overflow",
                                  );
                            auto_exit(eb_popups[x]);

                            //Set Cookies
                            eb_set_popup_cookie(
                                eb_popups[x].getAttribute("data-use-cookie"),
                                eb_popups[x].getAttribute("data-block-id"),
                                eb_popups[x].getAttribute(
                                    "data-cookie-expire-time",
                                ),
                            );
                        }
                        displayedCookie = true;
                    }
                });
            }
        }

        // Add scroll trigger handling with simplified units
        if ("scroll" == eb_popups[x].getAttribute("data-popup-type")) {
            const scrollType = eb_popups[x].getAttribute("data-scroll-type");
            let popupTriggered = false;

            if ("percentage" === scrollType) {
                const scrollPercentage = parseInt(
                    eb_popups[x].getAttribute("data-scroll-percentage") || 50,
                );

                window.addEventListener("scroll", function () {
                    if (popupTriggered) return;

                    const scrollTop =
                        window.pageYOffset ||
                        document.documentElement.scrollTop;
                    const docHeight =
                        document.documentElement.scrollHeight -
                        document.documentElement.clientHeight;
                    const scrollPercent = (scrollTop / docHeight) * 100;

                    if (scrollPercent >= scrollPercentage) {
                        popupTriggered = true;
                        eb_popups[x]
                            .querySelector(".eb-popup-overlay")
                            .classList.remove("inactive");
                        eb_popups[x]
                            .querySelector(".modal-main-wrap")
                            .classList.remove("inactive");
                        eb_popups[x]
                            .querySelector(".eb-popup-overlay")
                            .classList.add("active");
                        eb_popups[x]
                            .querySelector(".modal-main-wrap")
                            .classList.add("active");
                        eb_popups[x].getAttribute("data-page-scroll") === "true"
                            ? null
                            : document.body.classList.add(
                                  "eb-popup-block-overflow",
                              );
                        auto_exit(eb_popups[x]);
                    }
                });
            } else if ("fixed" === scrollType) {
                const scrollDistance =
                    eb_popups[x].getAttribute("data-scroll-distance") ||
                    "100px";
                const value = parseFloat(scrollDistance);
                const unit = scrollDistance.replace(value, "");

                window.addEventListener("scroll", function () {
                    if (popupTriggered) return;

                    const scrollTop =
                        window.pageYOffset ||
                        document.documentElement.scrollTop;
                    let threshold;

                    if (unit === "px") {
                        threshold = value;
                    } else if (unit === "em") {
                        // Convert em to px using the base font size
                        const baseFontSize = parseFloat(
                            getComputedStyle(document.documentElement).fontSize,
                        );
                        threshold = value * baseFontSize;
                    }

                    if (scrollTop >= threshold) {
                        popupTriggered = true;
                        eb_popups[x]
                            .querySelector(".eb-popup-overlay")
                            .classList.remove("inactive");
                        eb_popups[x]
                            .querySelector(".modal-main-wrap")
                            .classList.remove("inactive");
                        eb_popups[x]
                            .querySelector(".eb-popup-overlay")
                            .classList.add("active");
                        eb_popups[x]
                            .querySelector(".modal-main-wrap")
                            .classList.add("active");
                        eb_popups[x].getAttribute("data-page-scroll") === "true"
                            ? null
                            : document.body.classList.add(
                                  "eb-popup-block-overflow",
                              );
                        auto_exit(eb_popups[x]);
                    }
                });
            } else if ("element" === scrollType) {
                const scrollElement = eb_popups[x].getAttribute(
                    "data-scroll-element",
                );

                if (scrollElement && document.querySelector(scrollElement)) {
                    const targetElement = document.querySelector(scrollElement);
                    const scrollOffset = parseInt(
                        eb_popups[x].getAttribute("data-scroll-offset") || 0,
                    );

                    const observer = new IntersectionObserver(
                        (entries) => {
                            entries.forEach((entry) => {
                                if (entry.isIntersecting && !popupTriggered) {
                                    popupTriggered = true;

                                    if (scrollOffset > 0) {
                                        // Get current scroll position when element is in viewport
                                        const currentScrollPos =
                                            window.pageYOffset ||
                                            document.documentElement.scrollTop;

                                        // Add event listener to check for additional scroll
                                        const scrollHandler = function () {
                                            const newScrollPos =
                                                window.pageYOffset ||
                                                document.documentElement
                                                    .scrollTop;
                                            const scrolledDistance =
                                                newScrollPos - currentScrollPos;

                                            // If scrolled the required additional distance, show popup
                                            if (
                                                scrolledDistance >= scrollOffset
                                            ) {
                                                window.removeEventListener(
                                                    "scroll",
                                                    scrollHandler,
                                                );

                                                eb_popups[x]
                                                    .querySelector(
                                                        ".eb-popup-overlay",
                                                    )
                                                    .classList.remove(
                                                        "inactive",
                                                    );
                                                eb_popups[x]
                                                    .querySelector(
                                                        ".modal-main-wrap",
                                                    )
                                                    .classList.remove(
                                                        "inactive",
                                                    );
                                                eb_popups[x]
                                                    .querySelector(
                                                        ".eb-popup-overlay",
                                                    )
                                                    .classList.add("active");
                                                eb_popups[x]
                                                    .querySelector(
                                                        ".modal-main-wrap",
                                                    )
                                                    .classList.add("active");
                                                eb_popups[x].getAttribute(
                                                    "data-page-scroll",
                                                ) === "true"
                                                    ? null
                                                    : document.body.classList.add(
                                                          "eb-popup-block-overflow",
                                                      );
                                                auto_exit(eb_popups[x]);
                                            }
                                        };

                                        window.addEventListener(
                                            "scroll",
                                            scrollHandler,
                                        );
                                    } else {
                                        // No additional scroll needed, show popup immediately
                                        eb_popups[x]
                                            .querySelector(".eb-popup-overlay")
                                            .classList.remove("inactive");
                                        eb_popups[x]
                                            .querySelector(".modal-main-wrap")
                                            .classList.remove("inactive");
                                        eb_popups[x]
                                            .querySelector(".eb-popup-overlay")
                                            .classList.add("active");
                                        eb_popups[x]
                                            .querySelector(".modal-main-wrap")
                                            .classList.add("active");
                                        eb_popups[x].getAttribute(
                                            "data-page-scroll",
                                        ) === "true"
                                            ? null
                                            : document.body.classList.add(
                                                  "eb-popup-block-overflow",
                                              );
                                        auto_exit(eb_popups[x]);
                                    }

                                    observer.disconnect();
                                }
                            });
                        },
                        { threshold: 0.1 },
                    );

                    observer.observe(targetElement);
                }
            }
        }

        // click on close icon
        if (
            "true" === close_btn &&
            eb_popups[x].querySelector(".eb-popup-close-icon")
        ) {
            eb_popups[x].querySelector(".eb-popup-close-icon").onclick =
                function () {
                    eb_popups[x]
                        .querySelector(".eb-popup-overlay")
                        .classList.remove("active");
                    eb_popups[x]
                        .querySelector(".modal-main-wrap")
                        .classList.remove("active");
                    eb_popups[x]
                        .querySelector(".eb-popup-overlay")
                        .classList.add("inactive");
                    eb_popups[x]
                        .querySelector(".modal-main-wrap")
                        .classList.add("inactive");
                    document.body.classList.remove("eb-popup-block-overflow");

                    stopVideo(eb_popups[x].querySelector(".modal-main-wrap"));
                };
        }

        // close on esc button
        if ("true" == eb_popups[x].getAttribute("data-esc-btn")) {
            document.onkeyup = function (e) {
                if (
                    e.keyCode == 27 &&
                    "true" === eb_popups[x].getAttribute("data-esc-btn")
                ) {
                    [...eb_popups[x].querySelectorAll(".eb-popup-overlay")].map(
                        (item) => {
                            item.classList.remove("active");
                            item.classList.add("inactive");
                        },
                    );

                    [...eb_popups[x].querySelectorAll(".modal-main-wrap")].map(
                        (item) => {
                            item.classList.remove("active");
                            item.classList.add("inactive");

                            stopVideo(item);
                        },
                    );

                    document.body.classList.remove("eb-popup-block-overflow");
                }
            };
        }

        // close on overlay click
        for (let x = 0; x < main_wrapper.length; x++) {
            if ("true" == eb_popups[x].getAttribute("data-click-exit")) {
                main_wrapper[x].onclick = function (event) {
                    const popup_content =
                        main_wrapper[x].querySelector(".eb-popup-content");

                    if (!popup_content.contains(event.target)) {
                        [...document.querySelectorAll(".eb-popup-overlay")].map(
                            (item) => {
                                item.classList.remove("active");
                                item.classList.add("inactive");
                            },
                        );

                        [...document.querySelectorAll(".modal-main-wrap")].map(
                            (item) => {
                                item.classList.remove("active");
                                item.classList.add("inactive");

                                stopVideo(item);
                            },
                        );

                        document.body.classList.remove(
                            "eb-popup-block-overflow",
                        );
                    }
                };
            }
        }
    }

    function auto_exit(element) {
        if ("true" == element.getAttribute("data-auto-exit")) {
            setTimeout(
                () => {
                    element
                        .querySelector(".eb-popup-overlay")
                        .classList.remove("active");
                    element
                        .querySelector(".modal-main-wrap")
                        .classList.remove("active");
                    element
                        .querySelector(".eb-popup-overlay")
                        .classList.add("inactive");
                    element
                        .querySelector(".modal-main-wrap")
                        .classList.add("inactive");
                    document.body.classList.remove("eb-popup-block-overflow");
                },
                parseInt(element.getAttribute("data-auto-exit-time")) * 1000,
            );
        }
    }

    function eb_set_popup_cookie(isCookie, popup_id, exdays) {
        if ("false" == isCookie) {
            document.cookie = popup_id + "=no;path=/";
        } else if (typeof exdays == "string" && exdays.length > 0) {
            const d = new Date();
            d.setTime(d.getTime() + parseInt(exdays) * 24 * 60 * 60 * 1000);
            let expires = "expires=" + d.toUTCString();
            document.cookie = popup_id + "=yes;" + expires + ";path=/";
        } else {
            document.cookie = popup_id + "=yes";
        }
    }

    function eb_get_popup_cookie(popup_id) {
        let name = popup_id + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }
});
