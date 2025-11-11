const { EBGetIconClass, EBGetIconType } = window.eb_frontend;
document.addEventListener("DOMContentLoaded", function (event) {

    let accordions = document.querySelectorAll(
        ".eb-accordion-container > .eb-accordion-inner",
    );

    // Return if there is no accoridion block
    if (!accordions) return;

    const root = document.documentElement;
    let tabletBreakpoint = getComputedStyle(root)
        .getPropertyValue("--eb-tablet-breakpoint")
        .trim();
    tabletBreakpoint = tabletBreakpoint
        ? parseInt(tabletBreakpoint, 10)
        : "1024";
    const windowWidth = window.innerWidth;

    for (let x = 0; x < accordions.length; x++) {
        let accordion = accordions[x].parentElement;

        let transitionDuration = Number(
            accordion.getAttribute("data-transition-duration"),
        );
        let accordionWrapper = accordion.children[0].children;

        let titleNodes = [];
        Array.from(accordionWrapper).forEach(function (item) {
            titleNodes.push(item.querySelector(".eb-accordion-title-wrapper"));
        });

        let accordionType = accordion.getAttribute("data-accordion-type");

        // remove horizontal accordion from tab
        if (accordionType === "horizontal" && windowWidth <= tabletBreakpoint) {
            accordion.classList.remove("eb-accordion-type-horizontal");
            accordionType = "accordion";
        }

        // Take action based on accordion type
        accordionType === "toggle"
            ? setToggleAction(titleNodes)
            : setAccordionAction(titleNodes);

        let hashTag = window.location.hash.substr(1);
        let hashTagExists = false;

        window.addEventListener("hashchange", () => {
            let hashTag = window.location.hash.substr(1);
            titleNodes.forEach(function (item) {
                let id = item.parentElement.getAttribute("id");
                if (id === hashTag) {
                    hashTagExists = true;
                    if (accordionType === "toggle") {
                        onToggleTabClick.call(item);
                    } else {
                        onAccordionTabClick.call(item);
                    }
                }
            });
        });

        titleNodes.forEach(function (item, index) {
            let uniqueId = Math.random().toString(36).substr(2, 7);
            item.setAttribute("id", "eb-accordion-header-" + uniqueId);
            item.setAttribute(
                "aria-controls",
                "eb-accordion-panel-" + uniqueId,
            );
            item.setAttribute("aria-expanded", false);
            item.setAttribute("role", "button");
            let contentWrapper = item.nextElementSibling;
            contentWrapper.setAttribute("id", "eb-accordion-panel-" + uniqueId);
            contentWrapper.setAttribute(
                "aria-labelledby",
                "eb-accordion-header-" + uniqueId,
            );
            contentWrapper.setAttribute("role", "region");
            item.addEventListener("keydown", function (event) {
                let key = event.which.toString();
                let ctrlModifier = event.ctrlKey && key.match(/33|34/);
                if (key.match(/38|40/) || ctrlModifier) {
                    let direction = key.match(/34|40/) ? 1 : -1;
                    let length = titleNodes.length;
                    let newIndex = (index + length + direction) % length;
                    titleNodes[newIndex].focus();
                    event.preventDefault();
                } else if (key.match(/35|36/)) {
                    switch (key) {
                        case "36":
                            titleNodes[0].focus();
                            break;
                        case "35":
                            titleNodes[titleNodes.length - 1].focus();
                            break;
                    }
                    event.preventDefault();
                }
            });
        });

        let contentNodes = [];
        Array.from(accordionWrapper).forEach(function (item) {
            contentNodes.push(
                item.querySelector(".eb-accordion-content-wrapper"),
            );
        });

        let hide = "eb-accordion-hidden";
        //  add a className after the domcontent has been loaded
        accordion.classList.add("eb_accdn_loaded");
        if (accordionType !== "horizontal") {
            for (let i = 0; i < contentNodes.length; i++) {
                contentNodes[i].style.height = "0px";
            }
        }

        const testEl = document.createElement("span");

        // Get all data attributes
        let tabIcon = accordion.getAttribute("data-tab-icon") || "_ _";
        let expandedIcon =
            accordion.getAttribute("data-expanded-icon") || "_ _";

        tabIcon = EBGetIconClass(tabIcon);
        expandedIcon = EBGetIconClass(expandedIcon);

        // Seperate fontawesome 5 prefix and postfix classes.
        let faTabPrefix = tabIcon.split(" ")[0];
        let faTabPostfix =
            "fontawesome" === EBGetIconType(tabIcon)
                ? tabIcon.split(" ")[1]
                : tabIcon.split(" ")[2];
        let faExpandPrefix = expandedIcon.split(" ")[0];
        let faExpandPostfix =
            "fontawesome" === EBGetIconType(expandedIcon)
                ? expandedIcon.split(" ")[1]
                : expandedIcon.split(" ")[2];

        function changeIcon(clickedTab) {
            // Replace tab icon with expanded or vice versa
            let iconNode =
                clickedTab.querySelector(".eb-accordion-icon") || testEl;
            let isExpanded = iconNode.classList.contains(faExpandPostfix);
            if (isExpanded) {
                if ("dashicon" === EBGetIconType(faExpandPostfix)) {
                    iconNode.classList.remove("dashicons");
                }
                iconNode.classList.remove(faExpandPrefix, faExpandPostfix);
                if ("dashicon" === EBGetIconType(faTabPostfix)) {
                    iconNode.classList.add("dashicons");
                }
                iconNode.classList.add(faTabPrefix, faTabPostfix);
            } else {
                if ("dashicon" === EBGetIconType(faTabPostfix)) {
                    iconNode.classList.remove("dashicons");
                }
                iconNode.classList.remove(faTabPrefix, faTabPostfix);
                if ("dashicon" === EBGetIconType(faExpandPostfix)) {
                    iconNode.classList.add("dashicons");
                }
                iconNode.classList.add(faExpandPrefix, faExpandPostfix);
            }
        }

        // without clicked on accordion
        for (let i = 0; i < accordionWrapper.length; i++) {
            // if (accordionType !== "horizontal") {
            let clickable = accordionWrapper[i].getAttribute("data-clickable");
            if (clickable == "true") {
                contentNodes[i].setAttribute("data-collapsed", "false");
                if (accordionType !== "horizontal") {
                    slideDown(contentNodes[i], transitionDuration);
                }
                changeIcon(
                    contentNodes[i].parentElement.querySelector(
                        ".eb-accordion-title-wrapper",
                    ),
                );
                if (accordionType === "image") {
                    const container = accordionWrapper[i].closest(
                        ".eb-accordion-container",
                    );
                    const imgElement = container?.querySelector(
                        ".eb-accordion-image-container img",
                    );
                    const clickedTab = accordionWrapper[i]?.querySelector(
                        ".eb-accordion-title-wrapper",
                    );

                    if (imgElement) {
                        const imageUrl =
                            clickedTab.getAttribute("data-image-url") || "";
                        const imageAlt =
                            clickedTab.getAttribute("data-image-alt") || "";

                        imgElement.classList.add("eb-image-fade-out");

                        setTimeout(() => {
                            imgElement.setAttribute("src", imageUrl);
                            imgElement.setAttribute("alt", imageAlt);

                            imgElement.classList.remove("eb-image-fade-out");
                        }, 500);
                    }
                }
                if (
                    accordionType === "horizontal" &&
                    tabletBreakpoint <= windowWidth
                ) {
                    const clickedTab = accordionWrapper[i]?.querySelector(
                        ".eb-accordion-title-wrapper",
                    );

                    const titleContent = clickedTab.querySelector(
                        ".eb-accordion-title-content-wrap",
                    );
                    const contentWrapper = contentNodes[i].querySelector(
                        ".eb-accordion-content",
                    );
                    setTimeout(() => {
                        contentNodes[i].style.display = "block";
                        contentNodes[i].style.opacity = 1;
                        contentNodes[i].style.visibility = 'visible';
                        contentNodes[i].style.transform = 'translateY(0)';
                    }, transitionDuration);

                    if (titleContent && contentWrapper) {
                        const existingTitleContent =
                            contentWrapper.querySelector(
                                ".eb-accordion-title-content-wrap",
                            );
                        if (existingTitleContent) {
                            existingTitleContent.remove();
                        }
                        const titleContentCopy = titleContent.cloneNode(true);

                        contentWrapper.prepend(titleContentCopy);
                    }

                    // collapseOtherAccordions(clickedTab, transitionDuration);
                    // contentNodes[i].parentElement.classList.remove(hide);
                    clickedTab.style.display = "none";
                    expandHorizontalAccordionContent(
                        clickedTab,
                        contentNodes[i],
                    );
                }
            } else {
                contentNodes[i].setAttribute("data-collapsed", "true");
                if (accordionType !== "horizontal") {
                    slideUp(contentNodes[i], transitionDuration);
                }
                contentNodes[i].parentElement.classList.add(hide);
            }
            // }
        }

        function changeAllExpandIcons(accordion) {
            let iconNodes = accordion.querySelectorAll(".eb-accordion-icon");
            // Replace expand icon with tab icon & change color
            for (let i = 0; i < iconNodes.length; i++) {
                if (iconNodes[i].classList.contains(faExpandPostfix)) {
                    iconNodes[i].classList.remove(
                        faExpandPrefix,
                        faExpandPostfix,
                    );
                    iconNodes[i].classList.add(faTabPrefix, faTabPostfix);
                }
            }
        }

        // Toggle action here
        function setToggleAction(titleNodes) {
            for (let i = 0; i < titleNodes.length; i++) {
                let selectedTab = titleNodes[i];

                if (hashTag && !hashTagExists) {
                    let id = selectedTab.parentElement.getAttribute("id");
                    if (id === hashTag) {
                        hashTagExists = true;
                        onToggleTabClick.call(selectedTab);
                    }
                }

                (function (selectedTab) {
                    selectedTab.addEventListener("click", onToggleTabClick);
                    selectedTab.addEventListener("keydown", function (event) {
                        if (event.key === " " || event.key === "Enter") {
                            event.preventDefault();
                            onToggleTabClick.call(selectedTab);
                        }
                    });
                })(selectedTab);
            }
        }

        function onToggleTabClick() {
            let clickedTab = this;
            let contentNode = this.nextElementSibling;
            let isCollapsed =
                contentNode.getAttribute("data-collapsed") === "true";

            if (isCollapsed) {
                slideDown(contentNode, transitionDuration);
                contentNode.setAttribute("data-collapsed", "false");
                clickedTab.setAttribute("aria-expanded", "true");
                clickedTab.parentElement.classList.remove(hide);
            } else {
                slideUp(contentNode, transitionDuration);
                contentNode.setAttribute("data-collapsed", "true");
                clickedTab.setAttribute("aria-expanded", "false");
                clickedTab.parentElement.classList.add(hide);
            }
            // Change tab icon
            changeIcon(clickedTab);
        }

        // Accordion action here
        function setAccordionAction(titleNodes) {
            for (let i = 0; i < titleNodes.length; i++) {
                let selectedTab = titleNodes[i];
                if (hashTag && !hashTagExists) {
                    let id = selectedTab.parentElement.getAttribute("id");
                    if (id === hashTag) {
                        hashTagExists = true;
                        onAccordionTabClick.call(selectedTab);
                    }
                }

                (function (selectedTab) {
                    selectedTab.addEventListener("click", onAccordionTabClick);
                    selectedTab.addEventListener("keydown", function (event) {
                        if (event.key === " " || event.key === "Enter") {
                            event.preventDefault();
                            onAccordionTabClick.call(selectedTab);
                        }
                    });
                })(selectedTab);
            }
        }

        function onAccordionTabClick() {
            let clickedTab = this;
            let contentNode = clickedTab.nextElementSibling;
            changeAllExpandIcons(accordion);
            if (accordionType !== "horizontal") {
                // Find the accordion directly above the clicked one (if it exists)
                let previousAccordion = findOpenAccordionAbove(clickedTab);

                if (previousAccordion) {
                    let previousContentNode = previousAccordion.querySelector(
                        ".eb-accordion-content-wrapper",
                    );
                    let previousHeight = previousContentNode.offsetHeight;
                    let windowHeight = window.innerHeight;

                    if (previousHeight > windowHeight) {
                        // Collapse the accordion above if its height is greater than the window height
                        slideUp(previousContentNode, 0);
                        previousContentNode.setAttribute(
                            "data-collapsed",
                            "true",
                        );

                        // Scroll to the top only if the previous accordion is collapsed
                        scrollToPageTop(() => {
                            collapseOtherAccordions(clickedTab, 0);
                            expandAccordionContent(
                                clickedTab,
                                contentNode,
                                true,
                            );
                        });
                    } else {
                        collapseOtherAccordions(clickedTab, transitionDuration);
                        expandAccordionContent(clickedTab, contentNode);
                    }
                } else {
                    collapseOtherAccordions(clickedTab);
                    expandAccordionContent(
                        clickedTab,
                        contentNode,
                        false,
                        true,
                    );
                }
            }
            // storyboard accordion
            if (accordionType === "image") {
                const container = clickedTab.closest(".eb-accordion-container");
                const imgElement = container?.querySelector(
                    ".eb-accordion-image-container img",
                );

                if (imgElement) {
                    const imageUrl =
                        clickedTab.getAttribute("data-image-url") || "";
                    const imageAlt =
                        clickedTab.getAttribute("data-image-alt") || "";

                    imgElement.classList.add("eb-image-fade-out");

                    setTimeout(() => {
                        imgElement.setAttribute("src", imageUrl);
                        imgElement.setAttribute("alt", imageAlt);

                        imgElement.classList.remove("eb-image-fade-out");
                    }, 500);
                }
            }
            // horizontal accordion
            if (
                accordionType === "horizontal" &&
                windowWidth > tabletBreakpoint
            ) {
                clickedTab.classList.add("eb-transition-add");
                setTimeout(() => {
                    clickedTab.style.display = "none";
                    clickedTab.classList.remove("eb-transition-add");
                }, transitionDuration)
                collapseOtherAccordions(clickedTab, transitionDuration);
                setTimeout(() => {
                    contentNode.style.display = 'block';
                    contentNode.style.opacity = 1;
                    contentNode.style.visibility = 'visible';
                    contentNode.style.transform = 'translateY(0)';
                }, transitionDuration);

                const titleContent = clickedTab.querySelector(
                    ".eb-accordion-title-content-wrap",
                );
                const contentWrapper = contentNode.querySelector(
                    ".eb-accordion-content",
                );
                if (titleContent && contentWrapper) {
                    const existingTitleContent = contentWrapper.querySelector(
                        ".eb-accordion-title-content-wrap",
                    );
                    if (existingTitleContent) {
                        existingTitleContent.remove();
                    }
                    const titleContentCopy = titleContent.cloneNode(true);

                    contentWrapper.prepend(titleContentCopy);
                }

                expandHorizontalAccordionContent(clickedTab, contentNode);
            }
        }

        function expandAccordionContent(
            clickedTab,
            contentNode,
            toTheTop = false,
            checkCondition = false,
        ) {
            let isCollapsed =
                contentNode.getAttribute("data-collapsed") === "true";
            if (isCollapsed) {
                if (toTheTop) {
                    slideDown(contentNode, transitionDuration, function () {
                        scrollToAccordionTitle(clickedTab);
                    });
                } else if (checkCondition) {
                    slideDown(contentNode, transitionDuration, function () {
                        let contentHeight = contentNode.offsetHeight;
                        let windowHeight = window.innerHeight;
                        if (contentHeight > windowHeight) {
                            scrollToAccordionTitle(clickedTab);
                        }
                    });
                } else {
                    slideDown(contentNode, transitionDuration);
                }

                contentNode.setAttribute("data-collapsed", "false");
                clickedTab.setAttribute("aria-expanded", "true");
                clickedTab.parentElement.classList.remove(
                    "eb-accordion-hidden",
                );
            } else {
                // If it's already open, no need to scroll or change anything
                slideUp(contentNode, transitionDuration);
                contentNode.setAttribute("data-collapsed", "true");
                clickedTab.setAttribute("aria-expanded", "false");
                changeIcon(clickedTab);
                clickedTab.parentElement.classList.add("eb-accordion-hidden");
            }
            // Change tab icon (optional)
            changeIcon(clickedTab);
        }

        // Collapse all other accordions except the clicked one
        function collapseOtherAccordions(clickedTab, transitionDuration) {
            let allAccordions = clickedTab
                .closest(".eb-accordion-container")
                .querySelectorAll(".eb-accordion-content-wrapper");
            if (
                accordionType === "horizontal" &&
                tabletBreakpoint <= windowWidth
            ) {
                let allAccordionsTitle = clickedTab
                    .closest(".eb-accordion-inner")
                    .querySelectorAll(".eb-accordion-title-wrapper");
                let allAccordionsContent = clickedTab
                    .closest(".eb-accordion-inner")
                    .querySelectorAll(".eb-accordion-content-wrapper");
                allAccordionsTitle.forEach((title) => {
                    if (title !== clickedTab) {
                        title.style.display = "flex";
                    }
                });
                allAccordionsContent.forEach((item) => {
                    item.style.display = "none";
                    item.style.opacity = 0;
                    item.style.visibility = 'hidden';
                    item.style.transform = 'translateY(-100%)';
                });
            }

            allAccordions.forEach((accordion) => {
                if (
                    accordion !== clickedTab.nextElementSibling &&
                    accordion.getAttribute("data-collapsed") === "false"
                ) {
                    if (accordionType !== "horizontal") {
                        slideUp(accordion, transitionDuration);
                    }

                    accordion.setAttribute("data-collapsed", "true");
                    accordion.previousElementSibling.setAttribute(
                        "aria-expanded",
                        "false",
                    );
                    accordion.parentElement.classList.add(
                        "eb-accordion-hidden",
                    );
                }
            });
            // changeIcon(clickedTab);
        }

        function expandHorizontalAccordionContent(clickedTab, contentNode) {
            let isCollapsed =
                contentNode.getAttribute("data-collapsed") === "true";
            let accordionWrapper = clickedTab
                .closest(".eb-accordion-inner")
                .querySelectorAll(".eb-accordion-wrapper");
            let currentAccordionWrapper = clickedTab.closest(
                ".eb-accordion-wrapper",
            );
            if (isCollapsed) {
                contentNode.setAttribute("data-collapsed", "false");
                clickedTab.setAttribute("aria-expanded", "true");
                clickedTab.parentElement.classList.remove(
                    "eb-accordion-hidden",
                );
            } else {
                contentNode.setAttribute("data-collapsed", "true");
                clickedTab.setAttribute("aria-expanded", "false");
                changeIcon(clickedTab);
                clickedTab.parentElement.classList.add("eb-accordion-hidden");
            }
            const expanded =
                currentAccordionWrapper.getAttribute("aria-expanded") ===
                "true";
            accordionWrapper.forEach((i) => {
                i.setAttribute("aria-expanded", "false");
            });

            currentAccordionWrapper.setAttribute(
                "aria-expanded",
                expanded ? "false" : "true",
            );

            // Change tab icon (optional)
            changeIcon(clickedTab);
        }
    }
});

const hideAccordionContents = (accordion, transitionDuration) => {
    let contentNodes = [];
    Array.from(accordion.children).forEach(function (item) {
        contentNodes = item.querySelectorAll(".eb-accordion-content-wrapper");
    });

    for (let i = 0; i < contentNodes.length; i++) {
        if (contentNodes[i].getAttribute("data-collapsed") === "false") {
            slideUp(contentNodes[i], transitionDuration);
            contentNodes[i].setAttribute("data-collapsed", true);
            contentNodes[i].setAttribute("aria-expanded", "false");
        }
    }
};

/* SLIDE UP */
const slideUp = (target, duration = 500) => {
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.boxSizing = "border-box";
    target.style.height = target.offsetHeight + "px";
    target.offsetHeight;
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    if (duration <= 0) {
        target.style.display = "none";
        target.style.removeProperty("height");
        target.style.removeProperty("padding-top");
        target.style.removeProperty("padding-bottom");
        target.style.removeProperty("margin-top");
        target.style.removeProperty("margin-bottom");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
    } else {
        window.setTimeout(() => {
            target.style.display = "none";
            target.style.removeProperty("height");
            target.style.removeProperty("padding-top");
            target.style.removeProperty("padding-bottom");
            target.style.removeProperty("margin-top");
            target.style.removeProperty("margin-bottom");
            target.style.removeProperty("overflow");
            target.style.removeProperty("transition-duration");
            target.style.removeProperty("transition-property");
            //alert("!");
        }, duration);
    }
};

/* SLIDE DOWN */
const slideDown = (target, duration = 500, callback = null) => {
    target.style.removeProperty("display");
    let display = window.getComputedStyle(target).display;
    if (display === "none") display = "block";
    setTimeout(function () {
        target.style.display = display;
    }, duration + 1);
    let height = getHiddenElementHeight(target);
    target.style.overflow = "hidden";
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.boxSizing = "border-box";
    target.style.transitionProperty = "height, margin, padding";
    target.style.transitionDuration = duration + "ms";
    target.style.height = height + "px";
    target.style.removeProperty("padding-top");
    target.style.removeProperty("padding-bottom");
    target.style.removeProperty("margin-top");
    target.style.removeProperty("margin-bottom");
    window.setTimeout(() => {
        target.style.removeProperty("height");
        target.style.removeProperty("overflow");
        target.style.removeProperty("transition-duration");
        target.style.removeProperty("transition-property");
        // Ensure callback after expansion completes
        if (typeof callback === "function") {
            callback();
        }
    }, duration);
};

/* TOOGLE */
const slideToggle = (target, duration = 500) => {
    if (window.getComputedStyle(target).display === "none") {
        return slideDown(target, duration);
    } else {
        return slideUp(target, duration);
    }
};

function getHiddenElementHeight(el) {
  // Save original styles
  const originalDisplay = el.style.display;
  const originalVisibility = el.style.visibility;
  const originalPosition = el.style.position;

  // Apply temporary styles
  el.style.display = 'block';
  el.style.visibility = 'hidden';
  el.style.position = 'absolute';

  const height = el.offsetHeight;

  // Revert original styles
  el.style.display = originalDisplay;
  el.style.visibility = originalVisibility;
  el.style.position = originalPosition;

  return height;
}

// Helper function to get the accordion directly above the clicked one
function findOpenAccordionAbove(clickedTab) {
    let previousSiblings = [];
    let sibling = clickedTab.parentElement.previousElementSibling;

    while (sibling) {
        if (sibling.querySelector(".eb-accordion-title-wrapper")) {
            let contentNode = sibling.querySelector(
                ".eb-accordion-content-wrapper",
            );
            if (contentNode.getAttribute("data-collapsed") === "false") {
                previousSiblings.push(sibling);
            }
        }
        sibling = sibling.previousElementSibling;
    }

    return previousSiblings.length ? previousSiblings[0] : null;
}

// Only scroll the accordion title to the top if content height is greater than window height
function scrollToAccordionTitle(accordionTitle, duration = 500) {
    const startPosition = window.pageYOffset;
    const targetPosition =
        accordionTitle.getBoundingClientRect().top + window.pageYOffset;
    const offset = 10; // Adjust if you want some padding at the top
    const distance = targetPosition - startPosition - offset;

    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    // Ease function for smooth scrolling
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

function scrollToPageTop(callback, duration = 10) {
    const startPosition = window.pageYOffset;
    const distance = -startPosition; // Scroll to top
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animation);
        } else if (typeof callback === "function") {
            callback();
        }
    }

    // Ease function for smooth scrolling
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}
