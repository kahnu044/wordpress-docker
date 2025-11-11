/**
 * WordPress dependencies
 */
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";
const rootURL = EssentialBlocksLocalize
    ? EssentialBlocksLocalize.rest_rootURL
    : false;
apiFetch.use(apiFetch.createRootURLMiddleware(rootURL));

/**
 * Spinner/Loader utility functions
 */
function createSpinner() {
    const spinner = document.createElement("div");
    spinner.className = "ebpg-loading-spinner";
    spinner.innerHTML = `
        <div class="ebpg-spinner-wrapper">
            <div class="ebpg-spinner"></div>
            <span class="ebpg-loading-text">Loading...</span>
        </div>
    `;
    return spinner;
}

function showSpinner(container, type = "overlay") {
    // Remove any existing spinner
    hideSpinner(container);

    const spinner = createSpinner();

    if (type === "overlay") {
        spinner.classList.add("ebpg-spinner-overlay");
        container.style.position = "relative";
    } else if (type === "inline") {
        spinner.classList.add("ebpg-spinner-inline");
    }

    container.appendChild(spinner);
    return spinner;
}

function hideSpinner(container) {
    const existingSpinners = container.querySelectorAll(
        ".ebpg-loading-spinner",
    );
    existingSpinners.forEach((spinner) => spinner.remove());
}

function showButtonSpinner(button) {
    if (button.querySelector(".ebpg-button-spinner")) return;

    const spinner = document.createElement("span");
    spinner.className = "ebpg-button-spinner";
    spinner.innerHTML = '<div class="ebpg-button-spinner-icon"></div>';

    button.classList.add("ebpg-loading");
    button.insertBefore(spinner, button.firstChild);
    button.disabled = true;
}

function hideButtonSpinner(button) {
    const spinner = button.querySelector(".ebpg-button-spinner");
    if (spinner) {
        spinner.remove();
    }
    button.classList.remove("ebpg-loading");
    button.disabled = false;
}

window.addEventListener("DOMContentLoaded", function () {
    ebPaginationFunc("");
});

function ebPaginationFunc(queryParamString) {
    const isPagination = document.getElementsByClassName("ebpg-pagination");

    if (isPagination.length > 0) {
        const paginationButton = document.querySelectorAll(
            ".ebpg-pagination button",
        );

        if (paginationButton.length > 0) {
            //
            document
                .querySelectorAll(".ebpostgrid-pagination")
                .forEach((item) => {
                    eb_paginationNumberHandler(item);
                });

            paginationButton.forEach((button) => {
                // Skip if button already has our event listener
                if (button.hasAttribute('data-eb-pagination-initialized')) {
                    return;
                }
                button.setAttribute('data-eb-pagination-initialized', 'true');

                var pageNumber = 1;
                button.addEventListener("click", function () {
                    const isLoadMore = eb_hasClass(
                        this,
                        "ebpg-pagination-button",
                    ); //Is Pagination Type Load More True
                    const isPrevious = eb_hasClass(
                        this,
                        "ebpg-pagination-item-previous",
                    ); //Is Pagination Type Previous
                    const isNext = eb_hasClass(
                        this,
                        "ebpg-pagination-item-next",
                    ); //Is Pagination Type Previous

                    if (isLoadMore) {
                        pageNumber = parseInt(pageNumber) + 1; //Get Page Number
                    } else if (isPrevious) {
                        pageNumber = parseInt(eb_handlePreviousNext(this)) - 1;
                    } else if (isNext) {
                        pageNumber = parseInt(eb_handlePreviousNext(this)) + 1;
                    } else {
                        pageNumber = parseInt(this.dataset.pagenumber); //Get Page Number
                    }

                    const queryStringSelector = this.closest(
                        ".eb-post-grid-wrapper",
                    );
                    if (queryStringSelector) {
                        const queryString = queryStringSelector.dataset;

                        // Get current filter state from the wrapper element
                        const currentFilter = queryStringSelector.dataset.currentFilter || "";
                        const queryParamStringToUse = queryParamString || currentFilter;

                        const attributes = JSON.parse(queryString.attributes);
                        const version = attributes?.version
                            ? attributes?.version
                            : "";

                        // Show spinner based on pagination type
                        if (isLoadMore) {
                            showButtonSpinner(this);
                        } else {
                            // For regular pagination, show overlay spinner on posts container
                            const postsContainer =
                                version === "v2"
                                    ? queryStringSelector.querySelector(
                                          ".eb-post-grid-posts-wrapper",
                                      )
                                    : queryStringSelector;
                            if (postsContainer) {
                                showSpinner(postsContainer, "overlay");
                            }
                        }

                        apiFetch({
                            path: "essential-blocks/v1/queries",
                            method: "POST",
                            data: {
                                query_data: queryString.querydata,
                                attributes: queryString.attributes,
                                query_param_string: queryParamStringToUse,
                                pageNumber: pageNumber,
                            },
                        })
                            .then((result) => {
                                // Hide spinners after successful response
                                if (isLoadMore) {
                                    hideButtonSpinner(this);
                                    if (!result) {
                                        // const noPostsMarkup = `<p class="eb-no-posts">${noPostText}</p>`;
                                        // this.closest(
                                        //     ".ebpostgrid-pagination",
                                        // ).insertAdjacentHTML(
                                        //     "beforebegin",
                                        //     noPostsMarkup,
                                        // );
                                        const noPost = queryStringSelector.querySelector(".eb-loadmore-no-post");
                                        noPost.style.display = "block";
                                        this.closest(
                                            ".ebpostgrid-pagination",
                                        ).innerHTML = "";
                                    } else {
                                        if ("v2" === version) {
                                            const selector = this.closest(
                                                ".eb-post-grid-wrapper",
                                            ).querySelector(
                                                ".eb-post-grid-posts-wrapper",
                                            );
                                            if (selector) {
                                                selector.insertAdjacentHTML(
                                                    "beforeend",
                                                    result,
                                                );
                                            }
                                        } else {
                                            this.closest(
                                                ".ebpostgrid-pagination",
                                            )
                                                ? this.closest(
                                                      ".ebpostgrid-pagination",
                                                  ).insertAdjacentHTML(
                                                      "beforebegin",
                                                      result,
                                                  )
                                                : "";
                                        }
                                    }
                                } else {
                                    // Hide overlay spinner for regular pagination
                                    const postsContainer =
                                        version === "v2"
                                            ? queryStringSelector.querySelector(
                                                  ".eb-post-grid-posts-wrapper",
                                              )
                                            : queryStringSelector;
                                    if (postsContainer) {
                                        hideSpinner(postsContainer);
                                    }

                                    this.closest(".eb-post-grid-wrapper")
                                        .querySelectorAll(".ebpg-grid-post")
                                        .forEach((post) => {
                                            post.remove();
                                        });
                                    if ("v2" === version) {
                                        const selector = this.closest(
                                            ".eb-post-grid-wrapper",
                                        ).querySelector(
                                            ".eb-post-grid-posts-wrapper",
                                        );
                                        if (selector) {
                                            selector.innerHTML = result;
                                        }
                                    } else {
                                        this.closest(".ebpostgrid-pagination")
                                            ? this.closest(
                                                  ".ebpostgrid-pagination",
                                              ).insertAdjacentHTML(
                                                  "beforebegin",
                                                  result,
                                              )
                                            : "";
                                    }
                                    if (
                                        eb_hasClass(
                                            this,
                                            "ebpg-pagination-item",
                                        )
                                    ) {
                                        this.closest(".ebpostgrid-pagination")
                                            .querySelectorAll(
                                                ".ebpg-pagination-item",
                                            )
                                            .forEach((post) => {
                                                post.classList.remove("active");
                                            });
                                        this.classList.add("active");
                                    }
                                    eb_paginationNumberHandler(
                                        this.closest(".ebpostgrid-pagination"),
                                    );
                                }
                            })
                            .catch((error) => {
                                // Hide spinners on error
                                if (isLoadMore) {
                                    hideButtonSpinner(this);
                                } else {
                                    const postsContainer =
                                        version === "v2"
                                            ? queryStringSelector.querySelector(
                                                  ".eb-post-grid-posts-wrapper",
                                              )
                                            : queryStringSelector;
                                    if (postsContainer) {
                                        hideSpinner(postsContainer);
                                    }
                                }
                                console.error(
                                    "Essential Blocks: Failed to load posts",
                                    error,
                                );
                            });
                    }
                });
            });
        }
    }
}

function eb_hasClass(target, className) {
    return new RegExp("(\\s|^)" + className + "(\\s|$)").test(target.className);
}

function eb_paginationNumberHandler(selected) {
    const active = selected.querySelector(".ebpg-pagination-item.active");
    if (active) {
        const active_page_number = parseInt(active.dataset.pagenumber);
        const allPagination = selected.querySelectorAll(
            ".ebpg-pagination-item",
        );
        const totalPages = allPagination.length;

        let thisPageNumber = 1;

        allPagination.forEach((item) => {
            thisPageNumber = parseInt(item.dataset.pagenumber);

            eb_paginationHide(item);

            if (active_page_number === 1 && thisPageNumber <= 3) {
                eb_paginationShow(item);
            } else if (
                thisPageNumber >= active_page_number &&
                thisPageNumber <= active_page_number + 2
            ) {
                eb_paginationShow(item);
            } else if (thisPageNumber === totalPages) {
                eb_paginationShow(item);
            } else if (
                thisPageNumber === 1 &&
                (active_page_number >= totalPages - 2 ||
                    active_page_number >= 4)
            ) {
                eb_paginationShow(item);
            }
        });

        //Remove All Separator HTML and Separator Markup
        const selectSeparator = selected.querySelectorAll(
            ".ebpg-pagination-item-separator",
        );
        if (selectSeparator.length > 0) {
            selectSeparator.forEach((item) => {
                item.remove();
            });
        }
        const sepHtml =
            '<button class="ebpg-pagination-item-separator">...</button>';

        if (active_page_number < allPagination.length - 2) {
            allPagination[allPagination.length - 1].insertAdjacentHTML(
                "beforebegin",
                sepHtml,
            );
        }

        if (
            active_page_number >= totalPages - 2 ||
            (totalPages > 4 && active_page_number >= 4)
        ) {
            allPagination[1].insertAdjacentHTML("afterend", sepHtml);
        }

        //Previous Next Sow Hide
        if (active_page_number === 1) {
            selected.querySelector(
                ".ebpg-pagination-item-previous",
            ).disabled = true;
            selected.querySelector(
                ".ebpg-pagination-item-next",
            ).disabled = false;
        } else if (active_page_number === totalPages) {
            selected.querySelector(
                ".ebpg-pagination-item-previous",
            ).disabled = false;
            selected.querySelector(
                ".ebpg-pagination-item-next",
            ).disabled = true;
        } else {
            selected.querySelector(
                ".ebpg-pagination-item-previous",
            ).disabled = false;
            selected.querySelector(
                ".ebpg-pagination-item-next",
            ).disabled = false;
        }
    }
}

function eb_paginationShow(item) {
    item.classList.remove("hide");
    item.classList.add("show");
}

function eb_paginationHide(item) {
    item.classList.remove("show");
    item.classList.add("hide");
}

function eb_handlePreviousNext(selector) {
    let pageNumber = 1;
    const active = selector
        .closest(".ebpostgrid-pagination")
        ?.querySelector(".ebpg-pagination-item.active");
    if (active) {
        pageNumber = active.dataset ? active.dataset.pagenumber : 1;

        if (eb_hasClass(selector, "ebpg-pagination-item-next")) {
            let nextSelector = active.nextElementSibling;
            while (nextSelector) {
                if (nextSelector.classList.contains("ebpg-pagination-item")) {
                    break;
                }
                nextSelector = nextSelector.nextElementSibling;
            }

            nextSelector.classList.add("active");
            active.classList.remove("active");
        } else if (eb_hasClass(selector, "ebpg-pagination-item-previous")) {
            let prevSelector = active.previousElementSibling;
            while (prevSelector) {
                if (prevSelector.classList.contains("ebpg-pagination-item")) {
                    break;
                }
                prevSelector = prevSelector.previousElementSibling;
            }

            prevSelector.classList.add("active");
            active.classList.remove("active");
        }
        eb_paginationNumberHandler(selector.closest(".ebpostgrid-pagination"));
    }
    return pageNumber;
}

//Filter Category
window.addEventListener("DOMContentLoaded", () => {
    const filters = document.getElementsByClassName(
        `eb-post-grid-category-filter`,
    );
    for (let filter of filters) {
        const taxonomy = filter.dataset.ebpgtaxonomy;
        const filterItems = filter.querySelectorAll(
            `.ebpg-category-filter-list li`,
        );
        filterItems.forEach((item) => {
            item.addEventListener("click", function (event) {
                const category = event.target.getAttribute("data-ebpgCategory");
                let queryParamString = "";
                if (category === "all") {
                    queryParamString = `&query_type=filter`;
                } else {
                    queryParamString = `&taxonomy=${taxonomy}&category=${category}`;
                }

                const gridWrapper = this.closest(".eb-post-grid-wrapper");
                const queryString = gridWrapper.dataset;
                const attributes = JSON.parse(queryString.attributes);
                const version = attributes?.version ? attributes?.version : "";

                // Store current filter state in the wrapper element
                if (category === "all") {
                    // Clear filter state when showing all posts
                    gridWrapper.dataset.currentFilter = "";
                } else {
                    gridWrapper.dataset.currentFilter = queryParamString;
                }

                // Show spinner overlay on posts container during filter operation
                const postsContainer =
                    version === "v2"
                        ? gridWrapper.querySelector(
                              ".eb-post-grid-posts-wrapper",
                          )
                        : gridWrapper;
                if (postsContainer) {
                    showSpinner(postsContainer, "overlay");
                }

                apiFetch({
                    path: "essential-blocks/v1/queries",
                    method: "POST",
                    data: {
                        query_data: queryString.querydata,
                        attributes: queryString.attributes,
                        query_param_string: queryParamString,
                    },
                    parse: false,
                }).then(
                    (result) => {
                        let totalPosts = result.headers.get("X-WP-Total");
                        if (totalPosts) {
                            // pagination initiate
                            let data = new FormData();
                            data.append("action", "post_grid_block_pagination");
                            data.append(
                                "post_grid_pagination_nonce",
                                EssentialBlocksLocalize.post_grid_pagination_nonce,
                            );
                            data.append("querydata", queryString?.querydata);
                            data.append("attributes", queryString?.attributes);
                            data.append("totalPosts", totalPosts);

                            fetch(EssentialBlocksLocalize.ajax_url, {
                                method: "POST",
                                body: data,
                            }) // wrapped
                                .then((res) => res.text())
                                .then((data) => {
                                    const paginationSelector = gridWrapper.querySelector(".ebpostgrid-pagination");
                                    if (paginationSelector) {
                                        paginationSelector.innerHTML = data;
                                    } else {
                                        const newPaginationDiv =
                                            document.createElement("div");
                                        newPaginationDiv.className =
                                            "ebpostgrid-pagination ebpg-pagination ";
                                        newPaginationDiv.innerHTML = data;

                                        // Insert the new div where you want it
                                        gridWrapper.appendChild(
                                            newPaginationDiv,
                                        );
                                    }
                                    // Pass the current filter state to pagination function
                                    ebPaginationFunc(queryParamString);
                                })
                                .catch((err) => console.log(err));

                            apiFetch({
                                path: "essential-blocks/v1/queries",
                                method: "POST",
                                data: {
                                    query_data: queryString.querydata,
                                    attributes: queryString.attributes,
                                    query_param_string: queryParamString,
                                },
                            })
                                .then((result) => {
                                    // Hide spinner after successful filter operation
                                    const postsContainer =
                                        version === "v2"
                                            ? this.closest(
                                                  ".eb-post-grid-wrapper",
                                              ).querySelector(
                                                  ".eb-post-grid-posts-wrapper",
                                              )
                                            : this.closest(
                                                  ".eb-post-grid-wrapper",
                                              );
                                    if (postsContainer) {
                                        hideSpinner(postsContainer);
                                    }

                                    this.closest(".eb-post-grid-wrapper")
                                        .querySelectorAll(".ebpg-grid-post")
                                        .forEach((post) => {
                                            post.remove();
                                        });
                                    if (
                                        this.closest(
                                            ".eb-post-grid-wrapper",
                                        ).querySelector("p")
                                    ) {
                                        this.closest(".eb-post-grid-wrapper")
                                            .querySelector("p")
                                            .remove();
                                    }
                                    // need to change for v2
                                    if ("v2" === version) {
                                        const selector = this.closest(
                                            ".eb-post-grid-wrapper",
                                        ).querySelector(
                                            ".eb-post-grid-posts-wrapper",
                                        );
                                        if (selector) {
                                            selector.innerHTML = result;
                                        } else {
                                            const newSelector =
                                                document.createElement("div");
                                            newSelector.className =
                                                "eb-post-grid-posts-wrapper";
                                            newSelector.innerHTML = result;
                                            this.closest(
                                                ".eb-post-grid-category-filter",
                                            ).insertAdjacentHTML(
                                                "afterend",
                                                newSelector.outerHTML,
                                            );
                                        }
                                    } else {
                                        this.closest(
                                            ".eb-post-grid-category-filter",
                                        ).insertAdjacentHTML(
                                            "afterend",
                                            result,
                                        );
                                    }

                                    this.closest(
                                        ".eb-post-grid-category-filter",
                                    )
                                        .querySelectorAll(
                                            ".ebpg-category-filter-list-item",
                                        )
                                        .forEach((item) => {
                                            item.classList.remove("active");
                                        });
                                    this.classList.add("active");
                                })
                                .catch((error) => {
                                    // Hide spinner on error
                                    const postsContainer =
                                        version === "v2"
                                            ? this.closest(
                                                  ".eb-post-grid-wrapper",
                                              ).querySelector(
                                                  ".eb-post-grid-posts-wrapper",
                                              )
                                            : this.closest(
                                                  ".eb-post-grid-wrapper",
                                              );
                                    if (postsContainer) {
                                        hideSpinner(postsContainer);
                                    }
                                    console.error(
                                        "Essential Blocks: Failed to load filtered posts",
                                        error,
                                    );
                                });
                        } else {
                            // Hide spinner when no posts found
                            const postsContainer =
                                version === "v2"
                                    ? this.closest(
                                          ".eb-post-grid-wrapper",
                                      ).querySelector(
                                          ".eb-post-grid-posts-wrapper",
                                      )
                                    : this.closest(".eb-post-grid-wrapper");
                            if (postsContainer) {
                                hideSpinner(postsContainer);
                            }

                            this.closest(".eb-post-grid-category-filter")
                                .querySelectorAll(
                                    ".ebpg-category-filter-list-item",
                                )
                                .forEach((item) => {
                                    item.classList.remove("active");
                                });
                            this.classList.add("active");

                            const noPostsGridWrapper = this.closest(".eb-post-grid-wrapper");
                            // Store current filter state even when no posts found
                            noPostsGridWrapper.dataset.currentFilter = queryParamString;

                            noPostsGridWrapper
                                .querySelectorAll(".ebpg-grid-post")
                                .forEach((post) => {
                                    post.remove();
                                });
                            if (
                                noPostsGridWrapper.querySelector(".ebpostgrid-pagination")
                            ) {
                                noPostsGridWrapper.querySelector(
                                    ".ebpostgrid-pagination",
                                ).innerHTML = "";
                            }
                            if (
                                noPostsGridWrapper.querySelector("p")
                            ) {
                                noPostsGridWrapper
                                    .querySelectorAll("p")
                                    .forEach((item) => {
                                        item.remove();
                                    });
                            }

                            noPostsGridWrapper.insertAdjacentHTML(
                                "beforeend",
                                `<p>${__(
                                    "No Posts Found",
                                    "essential-blocks",
                                )}</p>`,
                            );
                        }
                    },
                    (error) => {
                        // Hide spinner on error
                        const postsContainer =
                            version === "v2"
                                ? this.closest(
                                      ".eb-post-grid-wrapper",
                                  ).querySelector(".eb-post-grid-posts-wrapper")
                                : this.closest(".eb-post-grid-wrapper");
                        if (postsContainer) {
                            hideSpinner(postsContainer);
                        }
                        console.log("error", error);
                    },
                );
            });
        });
    }
});
