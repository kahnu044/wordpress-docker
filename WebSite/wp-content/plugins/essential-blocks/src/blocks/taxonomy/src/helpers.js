import { decodeEntities } from '@wordpress/html-entities';

export function ebLoader() {
    return <img src={`${EssentialBlocksLocalize?.image_url}/ajax-loader.gif`} alt="Loading..." />
}

export const renderCategoryName = (name) =>
    !name ? __('(Untitled)') : decodeEntities(name).trim();
