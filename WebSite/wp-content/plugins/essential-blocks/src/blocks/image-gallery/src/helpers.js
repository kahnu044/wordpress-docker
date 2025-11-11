/**
 * Helper Functions
 */

const validURL = (str) => {
    var pattern = new RegExp(
        "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
        "i"
    ); // fragment locator
    return !!pattern.test(str);
};

export const handleCustomURL = (customLink, id, images, setAttributes) => {
    const validUrl = customLink.length > 0 && validURL(customLink);
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return {
                ...item,
                customLink: customLink,
                isValidUrl: validUrl,
            };
        }
        return item;
    });

    setAttributes({ sources: updatedImageArray });
};

export const handleOpenNewTab = (openNewTab, id, images, setAttributes) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return { ...item, openNewTab: openNewTab === true ? true : false };
        }
        return item;
    });

    setAttributes({ sources: updatedImageArray });
};
export const handleImageData = (key, value, id, images, setAttributes) => {
    let updatedImageArray = images.map((item) => {
        if (item.id == id) {
            return { ...item, [key]: value };
        }
        return item;
    });

    setAttributes({ sources: updatedImageArray });
};

export const handleImage = (value, position, images, setAttributes) => {
    const newImage = { ...images[position] };
    const newImages = [...images];
    newImages[position] = newImage;

    newImages[position].id = value.id;
    newImages[position].url = value.url;
    newImages[position].alt = value.alt;
    newImages[position].caption = value.caption;
    newImages[position].content = value.description;

    setAttributes({ sources: newImages });
};


export const NotFoundImg = () => {
    return (
        <svg width="72" height="73" viewBox="0 0 72 73" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1.64053" y="1.82071" width="68.7189" height="68.7189" rx="14.3595" fill="url(#paint0_linear_2906_31)" />
            <rect x="1.64053" y="1.82071" width="68.7189" height="68.7189" rx="14.3595" stroke="white" strokeWidth="3.28107" />
            <path d="M49.3953 27.2499C49.3953 29.716 47.3962 31.7151 44.9302 31.7151C42.4642 31.7151 40.4651 29.716 40.4651 27.2499C40.4651 24.7839 42.4642 22.7848 44.9302 22.7848C47.3962 22.7848 49.3953 24.7839 49.3953 27.2499Z" fill="white" />
            <path fillRule="evenodd" clipRule="evenodd" d="M35.8719 12.1802H36.1281C41.2817 12.1801 45.3205 12.1801 48.4717 12.6038C51.6972 13.0374 54.2423 13.9424 56.2401 15.9401C58.2378 17.9378 59.1427 20.483 59.5764 23.7084C60 26.8597 60 30.8985 60 36.0521V36.2492C60 40.5107 60 43.9992 59.7686 46.8396C59.536 49.694 59.0594 52.0792 57.9927 54.0601C57.5222 54.9339 56.944 55.7163 56.2401 56.4202C54.2423 58.418 51.6972 59.3229 48.4717 59.7566C45.3205 60.1802 41.2817 60.1802 36.1281 60.1802H35.8719C30.7183 60.1802 26.6795 60.1802 23.5283 59.7566C20.3028 59.3229 17.7576 58.418 15.7599 56.4202C13.9889 54.6492 13.0743 52.4449 12.5879 49.7104C12.1102 47.0243 12.0228 43.6823 12.0046 39.5323C12 38.4767 12 37.3603 12 36.1824V36.0521C12 30.8985 12 26.8597 12.4236 23.7084C12.8573 20.483 13.7622 17.9378 15.7599 15.9401C17.7576 13.9424 20.3028 13.0374 23.5283 12.6038C26.6795 12.1801 30.7183 12.1801 35.8719 12.1802ZM23.9745 15.9228C21.1204 16.3065 19.3997 17.0363 18.1279 18.3081C16.8561 19.5799 16.1263 21.3006 15.7426 24.1547C15.3524 27.057 15.3488 30.8707 15.3488 36.1802C15.3488 36.8288 15.3488 37.456 15.3496 38.0633L17.5847 36.1076C19.6192 34.3275 22.6854 34.4296 24.5969 36.3411L34.174 45.9182C35.7083 47.4525 38.1235 47.6617 39.8987 46.4141L40.5644 45.9462C43.119 44.1509 46.5752 44.3589 48.8961 46.4476L55.2152 52.1348C55.8513 50.799 56.229 49.0438 56.4308 46.5676C56.6499 43.8786 56.6512 40.5244 56.6512 36.1802C56.6512 30.8707 56.6476 27.057 56.2574 24.1547C55.8737 21.3006 55.1439 19.5799 53.8721 18.3081C52.6003 17.0363 50.8796 16.3065 48.0255 15.9228C45.1232 15.5326 41.3095 15.529 36 15.529C30.6905 15.529 26.8768 15.5326 23.9745 15.9228Z" fill="white" />
            <defs>
                <linearGradient id="paint0_linear_2906_31" x1="50.8401" y1="5.70096" x2="36" y2="72.1802" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#D8E1ED" />
                    <stop offset="1" stopColor="#C0CAD8" />
                </linearGradient>
            </defs>
        </svg>
    )
}

export const gridGapCal = (index, columnsRange, sources) => {
    let gridGap;
    if (columnsRange === 3 || columnsRange === 4 || columnsRange === 5 || columnsRange === 7) {
        gridGap =
            index % 7 === 1 || // After position 1 (index 0 in array terms)
            index % 7 === 4 || // After position 5 (index 4 in array terms)
            index % 7 === 5 || // After position 6 (index 5 in array terms)
            index % 7 === 6 || // After position 6 (index 5 in array terms)
            index === sources.length - 1; // Last element

    } else if (columnsRange === 6 || columnsRange === 8) {
        gridGap = index % 3 === 0 || index % 3 === 2;
    } else {
        // Default logic when columnRange is not 4
        gridGap = index % 1 === 0;
    }
    return gridGap;
}
