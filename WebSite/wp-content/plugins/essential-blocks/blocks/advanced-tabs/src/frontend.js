window.addEventListener("DOMContentLoaded", () => {
	const allTabsTitlesList = document.querySelectorAll(
		".eb-advanced-tabs-wrapper > .eb-tabs-nav > ul.tabTitles"
	);

	if (allTabsTitlesList.length === 0) return false;

	for (const titleListsWrap of allTabsTitlesList) {
		//
		// const tabsWrapId = titleListsWrap.dataset.tabsUlId;
		const tabTitlesLiTags = titleListsWrap.children;

		for (const titleLiTag of tabTitlesLiTags) {
			//
			titleLiTag.addEventListener("click", (e) => {
				//

				const thisLiTag = e.currentTarget;

				for (const singleLiTag of tabTitlesLiTags) {
					if (singleLiTag !== thisLiTag) {
						singleLiTag.classList.add("inactive");
						singleLiTag.classList.remove("active");
					} else {
						singleLiTag.classList.add("active");
						singleLiTag.classList.remove("inactive");
					}
				}

				const tabContentWrappers = titleListsWrap.closest(
					".eb-advanced-tabs-wrapper"
				).children[1].children;

				for (const tabContentWrap of tabContentWrappers) {
					//
					if (tabContentWrap.dataset.tabId === thisLiTag.dataset.titleTabId) {
						tabContentWrap.style.display = "block";
						tabContentWrap.style.animation = "fadeIn 0.3s";
					} else {
						tabContentWrap.style.display = "none";
					}
				}
			});
		}
	}

	const allAdvTabsWraps = document.querySelectorAll(
		".eb-advanced-tabs-wrapper .eb-tab-wrapper"
	);

	for (const tabWrapItem of allAdvTabsWraps) {
		tabWrapItem.classList.add("force-display-none-from-js");
	}
});
