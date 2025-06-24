import { PlaceholderImage } from "./icons/placeholder-image"

export default function Image(props) {
    const {
        item,
    } = props;

    const {
        name,
        image_url,
        display_image_url,
        display_animation_url
    } = item;

    const imageUrl = image_url || display_image_url;

    return (
        <>
            {imageUrl && (
                <img src={imageUrl} alt={name} />
            )}
            {!imageUrl && (
                <PlaceholderImage />
            )}
        </>
    )
}
