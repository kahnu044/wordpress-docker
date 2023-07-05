/**
 * installPlugin
 * @param {*} slug
 * @param {*} file
 */
export const installPlugin = (slug, file) => {
    let data = new FormData();
    data.append("action", "plugin_installer");
    data.append("slug", slug);
    data.append("plugin_file", file);
    data.append("admin_nonce", EssentialBlocksLocalize.admin_nonce);

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
