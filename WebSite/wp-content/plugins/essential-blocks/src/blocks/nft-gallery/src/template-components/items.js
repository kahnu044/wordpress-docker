import Image from "./image";

export default function Items(props) {
    const {
        data,
        attributes,
    } = props;

    const {
        layout,
        displayImage,
        displayTitle,
        displayButton,
        buttonText,
        gridPreset,
        listPreset,
    } = attributes;

    return (
        <div className={`eb_nft_content_wrap eb_nft_${layout} nft_items ${layout === "grid" ? gridPreset : listPreset}`}>
            {(typeof data === "object" && data.length > 0) && (
                <>
                    {data.map((item, index) => (
                        <div key={index} className="eb_nft_item">
                            {displayImage && (
                                <div className="eb_nft_thumbnail">
                                    <Image item={item} />
                                </div>
                            )}

                            <div className="eb_nft_content">
                                {displayTitle && (
                                    <h3 className="eb_nft_title">{item.name || "#" + item.token_id}</h3>
                                )}

                                {displayButton && (
                                    <div className="eb_nft_button"><button><a target="_blank" href={item.opensea_url}>{buttonText}</a></button></div>
                                )}
                            </div>
                        </div>
                    ))}
                </>
            )}
            {(typeof data === "object" && data.length === 0) && (
                <p>No Items Found!</p>
            )}

        </div>
    )
}
