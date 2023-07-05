/**
 * WordPress dependencies
*/
import apiFetch from "@wordpress/api-fetch";
const rootURL = EssentialBlocksLocalize ? EssentialBlocksLocalize.rest_rootURL : false;
apiFetch.use(apiFetch.createRootURLMiddleware(rootURL));

window.addEventListener('DOMContentLoaded', function(){
	const isPagination = document.getElementsByClassName('ebpg-pagination');
	if (isPagination.length > 0) {
    const paginationButton = document.querySelectorAll('.ebpg-pagination button');
    if (paginationButton.length > 0) {
        //
        document.querySelectorAll('.ebpg-pagination').forEach((item) => {
            eb_paginationNumberHandler(item)
        })

        paginationButton.forEach((button) => {
            var pageNumber = 1;
            button.addEventListener('click', function () {
                const isLoadMore = eb_hasClass(this, 'ebpg-pagination-button') //Is Pagination Type Load More True
                const isPrevious = eb_hasClass(this, 'ebpg-pagination-item-previous') //Is Pagination Type Previous
                const isNext = eb_hasClass(this, 'ebpg-pagination-item-next') //Is Pagination Type Previous

                if (isLoadMore) {
                    pageNumber = parseInt(pageNumber) + 1 //Get Page Number
                }
                else if (isPrevious) {
                    pageNumber = parseInt(eb_handlePreviousNext(this)) - 1
                }
                else if (isNext) {
                    pageNumber = parseInt(eb_handlePreviousNext(this)) + 1
                }
                else {
                    pageNumber = parseInt(this.dataset.pagenumber) //Get Page Number
                }

                const queryStringSelector = this.closest(".eb-post-grid-wrapper");
                if (queryStringSelector) {
                    const queryString = queryStringSelector.dataset;
                    apiFetch({
                        path: `essential-blocks/v1/queries?query_data=${queryString.querydata}&attributes=${queryString.attributes}&pageNumber=${pageNumber}`,
                    })
                        .then((result) => {
                            if (isLoadMore) {
                                if (!result) {
                                    const noPostsMarkup = '<p class="eb-no-posts">No more Posts</p>';
                                    this.closest('.ebpg-pagination').insertAdjacentHTML('beforebegin', noPostsMarkup);
                                    this.closest('.ebpg-pagination').remove()
                                }
                                else {
                                    this.closest('.ebpg-pagination').insertAdjacentHTML('beforebegin', result);
                                }
                            }
                            else {
                                this.closest('.eb-post-grid-wrapper').querySelectorAll('.ebpg-grid-post').forEach((post) => {
                                    post.remove();
                                })
                                this.closest('.ebpg-pagination').insertAdjacentHTML('beforebegin', result);
                                if (eb_hasClass(this, 'ebpg-pagination-item')) {
                                    this.closest('.ebpg-pagination').querySelectorAll('.ebpg-pagination-item').forEach((post) => {
                                        post.classList.remove('active');
                                    })
                                    this.classList.add('active');
                                }
                                eb_paginationNumberHandler(this.closest('.ebpg-pagination'))
                            }
                        })
                }

            })
        })
    }
}
})

function eb_hasClass(target, className) {
    return new RegExp('(\\s|^)' + className + '(\\s|$)').test(target.className);
}

function eb_paginationNumberHandler(selected) {
    const active = selected.querySelector('.ebpg-pagination-item.active')
    if (active) {
        const active_page_number = parseInt(active.dataset.pagenumber);
        const allPagination = selected.querySelectorAll('.ebpg-pagination-item');
        const totalPages = allPagination.length;

        let thisPageNumber = 1

        allPagination.forEach((item) => {
            thisPageNumber = parseInt(item.dataset.pagenumber)

            eb_paginationHide(item)

            if (active_page_number === 1 && thisPageNumber <= 3) {
                eb_paginationShow(item)
            }
            else if (thisPageNumber >= active_page_number && thisPageNumber <= active_page_number + 2) {
                eb_paginationShow(item)
            }
            else if (thisPageNumber === totalPages) {
                eb_paginationShow(item)
            }
            else if (thisPageNumber === 1 && (active_page_number >= totalPages - 2 || active_page_number >= 4)) {
                eb_paginationShow(item)
            }
        })

        //Remove All Separator HTML and Separator Markup
        const selectSeparator = selected.querySelectorAll('.ebpg-pagination-item-separator');
        if (selectSeparator.length > 0) {
            selectSeparator.forEach((item) => {
                item.remove()
            })
        }
        const sepHtml = '<button class="ebpg-pagination-item-separator">...</button>';

        if (active_page_number < (allPagination.length - 2)) {
            allPagination[allPagination.length - 1].insertAdjacentHTML('beforebegin', sepHtml);
        }

        if (active_page_number >= totalPages - 2 || (totalPages > 4 && active_page_number >= 4)) {
            allPagination[1].insertAdjacentHTML('afterend', sepHtml);
        }

        //Previous Next Sow Hide
        if (active_page_number === 1) {
            selected.querySelector('.ebpg-pagination-item-previous').disabled = true;
            selected.querySelector('.ebpg-pagination-item-next').disabled = false;
        }
        else if (active_page_number === totalPages) {
            selected.querySelector('.ebpg-pagination-item-previous').disabled = false;
            selected.querySelector('.ebpg-pagination-item-next').disabled = true;
        }
        else {
            selected.querySelector('.ebpg-pagination-item-previous').disabled = false;
            selected.querySelector('.ebpg-pagination-item-next').disabled = false;
        }
    }
}

function eb_paginationShow(item) {
    item.classList.remove('hide');
    item.classList.add('show');
}

function eb_paginationHide(item) {
    item.classList.remove('show');
    item.classList.add('hide');
}

function eb_handlePreviousNext(selector) {
    let pageNumber = 1
    const active = selector.closest('.ebpg-pagination').querySelector('.ebpg-pagination-item.active');
    if (active) {
        pageNumber = active.dataset ? active.dataset.pagenumber : 1;

        if (eb_hasClass(selector, 'ebpg-pagination-item-next')) {
            let nextSelector = active.nextElementSibling
            while (nextSelector) {
                if (nextSelector.classList.contains('ebpg-pagination-item')) {
                    break;
                }
                nextSelector = nextSelector.nextElementSibling;
            }

            nextSelector.classList.add('active');
            active.classList.remove('active');
        }
        else if (eb_hasClass(selector, 'ebpg-pagination-item-previous')) {
            let prevSelector = active.previousElementSibling
            while (prevSelector) {
                if (prevSelector.classList.contains('ebpg-pagination-item')) {
                    break;
                }
                prevSelector = prevSelector.previousElementSibling;
            }

            prevSelector.classList.add('active');
            active.classList.remove('active');
        }
        eb_paginationNumberHandler(selector.closest('.ebpg-pagination'))
    }
    return pageNumber
}

//Filter Category
window.addEventListener("DOMContentLoaded", (event) => {
    const filters = document.getElementsByClassName(`eb-post-grid-category-filter`);
    for (let filter of filters) {
        const taxonomy = filter.dataset.ebpgtaxonomy;
        const filterItems = filter.querySelectorAll(`.ebpg-category-filter-list li`);
        filterItems.forEach((item) => {
            if (item.dataset.ebpgcategory === 'all') {
                item.classList.add('active')
            }
            item.addEventListener('click', function (event) {
                const category = event.target.getAttribute('data-ebpgCategory');
                let queryParamString = "";
                if (category === 'all') {
                    queryParamString = `&query_type=filter`;
                }
                else {
                    queryParamString = `&taxonomy=${taxonomy}&category=${category}&query_type=filter`;
                }

                const queryString = this.closest('.eb-post-grid-wrapper').dataset;
                apiFetch({
                    path: `essential-blocks/v1/queries?query_data=${queryString.querydata}&attributes=${queryString.attributes}${queryParamString}`,
                })
                    .then((result) => {
                        this.closest('.eb-post-grid-wrapper').querySelectorAll('.ebpg-grid-post').forEach((post) => {
                            post.remove();
                        })
                        this.closest('.eb-post-grid-category-filter').insertAdjacentHTML('afterend', result);

                        this.closest('.eb-post-grid-category-filter').querySelectorAll('.ebpg-category-filter-list-item').forEach((item) => {
                            item.classList.remove('active');
                        })
                        this.classList.add('active');
                    })
            });
        });
    }
});
