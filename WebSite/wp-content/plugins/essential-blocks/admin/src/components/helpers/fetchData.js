/**
 * fetchEBSettingsData
 * @param {*} slug 
 * @param {*} file 
 */
export const fetchEBSettingsData = (key) => {
    let data = new FormData();
    data.append("action", "get_eb_admin_options");
    data.append("key", key);
    data.append("admin_nonce", EssentialBlocksLocalize.admin_nonce);

    return fetch(EssentialBlocksLocalize.ajax_url, {
        method: "POST",
        body: data,
    }) // wrapped
        .then((res) => res.text())
        .then((data) => {
            const res = JSON.parse(data);
            if (res.success) {
                return res.data
            }
        })
        .catch((err) => console.log(err));
};

/**
 * fetchEBSettingsData
 * @param {*} slug 
 * @param {*} file 
 */
export const saveEBSettingsData = (key, value, type = 'settings') => {
    let data = new FormData();
    data.append("action", "save_eb_admin_options");
    data.append("type", type);
    data.append("value", value);
    data.append("admin_nonce", EssentialBlocksLocalize.admin_nonce);

    if (type === 'settings') {
        data.append("key", key);
    }

    return fetch(EssentialBlocksLocalize.ajax_url, {
        method: "POST",
        body: data,
    }) // wrapped
        .then((res) => res.text())
        .then((data) => {
            return data
        })
        .catch((err) => console.log(err));
};