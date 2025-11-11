/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState, memo } from "@wordpress/element";
/**
 * Internal depenencies
 */
import Inspector from "./inspector";
import Style from "./style";

import {
    NoticeComponent, BlockProps, withBlockContext
} from "@essential-blocks/controls";

import Items from "./template-components/items";
import Collections from "./template-components/collections";
import Loading from "./template-components/loading";
import { ReactComponent as Icon } from "./icon.svg";
import { Dashicon } from "@wordpress/components";
import defaultAttributes from './attributes';

function Edit(props) {
    const { attributes, setAttributes, isSelected } = props;
    const {
        blockId,
        blockMeta,
        // responsive control attribute ⬇
        resOption,
        source,
        settings,
        classHook,
        cover,
    } = attributes;

    const [nftData, setNftData] = useState({});
    const [nftError, setNftError] = useState({ status: false });
    const [nftErrorType, setNftErrorType] = useState('');
    const [loading, setLoading] = useState(true);
    const [isShowingDummyData, setIsShowingDummyData] = useState(false);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-nft-gallery',
        style: <Style {...props} />
    };

    //Is JSON test
    const isJsonStr = (str) => {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    };

    const [openseaApi, setOpenseaApi] = useState("");

    //Initial UseEffect
    useEffect(() => {
        if (!settings) {
            setAttributes({
                settings: {
                    opensea: {
                        apiKey: "",
                        type: "items",
                        filterBy: "",
                        itemLimit: 6,
                        collectionLimit: 6,
                        orderBy: "desc",
                    },
                },
            });
        }

        //Get Opensea API
        let data = new FormData();
        data.append("action", "opensea_api_key");
        data.append("admin_nonce", EssentialBlocksLocalize.admin_nonce);
        fetch(EssentialBlocksLocalize.ajax_url, {
            method: "POST",
            body: data,
        }) // wrapped
            .then((res) => res.text())
            .then((data) => {
                const response = JSON.parse(data);
                if (response.success && response.data) {
                    setOpenseaApi(response.data);

                    // Check if this is a dummy API key for non-admin users
                    if (response.data === 'dummy_opensea_api_key_for_editor_preview') {
                        setIsShowingDummyData(true);
                    } else {
                        setIsShowingDummyData(false);
                    }

                    // update api key
                    if (settings) {
                        let newSettings = { ...settings };
                        newSettings.opensea.apiKey = response.data;
                        setAttributes({ settings: newSettings });
                    }
                } else {
                    setIsShowingDummyData(false);
                }
            })
            .catch((err) => console.log(err));

    }, []);

    useEffect(() => {
        setLoading(true);
        let data = new FormData();
        data.append("action", "opensea_nft_collections");
        data.append("nft_nonce", EssentialBlocksLocalize.nft_nonce);
        data.append("nft_source", source);
        if (source === "opensea" && settings) {
            //If Type = items and no collection slug found, show instructions
            if (settings.opensea.type === "items") {
                if (!settings.opensea.collectionSlug) {
                    setNftError({
                        status: true,
                        message: "Please insert a valid collection slug.",
                    });
                    setNftErrorType("slug");
                    setLoading(false);
                    return;
                } else {
                    setNftErrorType("");
                }
            }

            //If Type = collections found, show instructions
            if (
                settings.opensea.type === "collections" &&
                (!settings.opensea.collectionWalletId || settings.opensea.collectionWalletId.length === 0)
            ) {
                setNftError({
                    status: true,
                    message: "Please insert a valid creator username.",
                });
                setNftErrorType("wallet");
                setLoading(false);
                return;
            }

            data.append("openseaType", settings.opensea.type);
            if (settings.opensea.apiKey && settings.opensea.apiKey.trim().length > 0) {
                // Check if this is a dummy API key for non-admin users
                if (settings.opensea.apiKey === 'dummy_opensea_api_key_for_editor_preview') {
                    // Provide dummy NFT data for editor preview
                    const dummyNftData = {
                        nfts: [
                            {
                                identifier: 'dummy_1',
                                name: 'Sample NFT #1',
                                description: 'This is a sample NFT for preview purposes',
                                image_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                                opensea_url: '#',
                                collection: 'Sample Collection',
                                creator: { username: 'sample_creator' }
                            },
                            {
                                identifier: 'dummy_2',
                                name: 'Sample NFT #2',
                                description: 'Another sample NFT for preview',
                                image_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                                opensea_url: '#',
                                collection: 'Sample Collection',
                                creator: { username: 'sample_creator' }
                            },
                            {
                                identifier: 'dummy_3',
                                name: 'Sample NFT #3',
                                description: 'Third sample NFT for preview',
                                image_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                                opensea_url: '#',
                                collection: 'Sample Collection',
                                creator: { username: 'sample_creator' }
                            },
                            {
                                identifier: 'dummy_4',
                                name: 'Sample NFT #4',
                                description: 'Fourth sample NFT for preview',
                                image_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                                opensea_url: '#',
                                collection: 'Sample Collection',
                                creator: { username: 'sample_creator' }
                            },
                            {
                                identifier: 'dummy_5',
                                name: 'Sample NFT #5',
                                description: 'Fifth sample NFT for preview',
                                image_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                                opensea_url: '#',
                                collection: 'Sample Collection',
                                creator: { username: 'sample_creator' }
                            },
                            {
                                identifier: 'dummy_6',
                                name: 'Sample NFT #6',
                                description: 'Sixth sample NFT for preview',
                                image_url: `${EssentialBlocksLocalize?.image_url}/image-placeholder.jpg`,
                                opensea_url: '#',
                                collection: 'Sample Collection',
                                creator: { username: 'sample_creator' }
                            }
                        ]
                    };

                    setNftData(dummyNftData);
                    setIsShowingDummyData(true);
                    setLoading(false);
                    setNftError({ status: false });
                    setNftErrorType("");
                    return;
                }

                data.append("openseaApiKey", settings.opensea.apiKey);
            }
            data.append("openseaCollectionSlug", settings.opensea.collectionSlug);
            data.append("openseaCollectionmWalletId", settings.opensea.collectionWalletId);
            data.append("openseaItemLimit", settings.opensea.itemLimit);
            data.append("openseaCollectionLimit", settings.opensea.collectionLimit);
            fetch(EssentialBlocksLocalize.ajax_url, {
                method: "POST",
                body: data,
            }) // wrapped
                .then((res) => res.text())
                .then((data) => {
                    const response = JSON.parse(data);
                    if (response.success) {
                        setNftData(JSON.parse(response.data));
                        setIsShowingDummyData(false);
                        setLoading(false);
                        setNftError({
                            status: false,
                        });
                        setNftErrorType("");
                    } else {
                        const error =
                            typeof response.data === "object"
                                ? response.data
                                : isJsonStr(response.data)
                                    ? JSON.parse(response.data)
                                    : response.data;
                        setNftError({
                            status: true,
                            message: typeof error === "string" ? error : "Invalid Collection Slug",
                        });
                        setNftErrorType("");
                        setIsShowingDummyData(false);
                        setLoading(false);
                    }
                })
                .catch((err) => console.log(err));
        }
    }, [settings]);

    return cover.length ? (
        <div>
            <img src={cover} alt="nft gallery" style={{ maxWidth: "100%" }} />
        </div>
    ) : (
        <>
            {isSelected && openseaApi && <Inspector {...props} setLoading={setLoading} />}
            <BlockProps.Edit {...enhancedProps}>
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    <div className={`eb-nft-gallery-wrapper ${blockId}`} data-id={blockId}>
                        {isShowingDummyData && !loading && (
                            <div style={{
                                background: '#fff3cd',
                                border: '1px solid #ffeaa7',
                                borderRadius: '4px',
                                padding: '12px',
                                marginBottom: '16px',
                                fontSize: '14px',
                                color: '#856404'
                            }}>
                                <strong>{__("Preview Mode:", "essential-blocks")}</strong> {__("You're seeing placeholder NFT content because you don't have administrator permissions. The actual NFT gallery will display on the frontend if properly configured by an administrator.", "essential-blocks")}
                            </div>
                        )}
                        {loading && <Loading attributes={attributes} />}
                        {!loading && (
                            <>
                                {!openseaApi && (
                                    <>
                                        <NoticeComponent
                                            Icon={Icon}
                                            title={__("NFT Gallery", "essential-blocks")}
                                            description={
                                                <>
                                                    <span>Please add NFT API&nbsp;
                                                        <a
                                                            target="_blank"
                                                            href={`${EssentialBlocksLocalize?.eb_admin_url}admin.php?page=essential-blocks&tab=options`}
                                                        >
                                                            Here
                                                        </a>
                                                        &nbsp;to display NFT Gallery Block</span>
                                                </>
                                            }
                                            externalDocLink={"https://essential-blocks.com/docs/retrieve-opensea-nft-api/"}
                                            externalDocText={
                                                <>
                                                    Learn more about NFT Gallery Block <Dashicon icon="external" />
                                                </>
                                            }
                                        />
                                    </>
                                )}
                                {openseaApi && (
                                    <>
                                        {nftError.status && <>
                                            <NoticeComponent
                                                Icon={Icon}
                                                title={__("NFT Gallery", "essential-blocks")}
                                                description={
                                                    <>
                                                        <span style={{ color: "#cc1818" }}><Dashicon icon="warning" /> <strong>Error: {nftError.message}.</strong></span><br />
                                                        {nftErrorType == '' && <span>Please add proper NFT API&nbsp;
                                                            <a
                                                                target="_blank"
                                                                href={`${EssentialBlocksLocalize?.eb_admin_url}admin.php?page=essential-blocks&tab=options`}
                                                            >
                                                                Here
                                                            </a>
                                                            &nbsp;to display NFT Gallery Block</span>}
                                                        {nftErrorType !== '' && <span>To add <strong>collection slug.</strong> Go to General Tab of block settings.</span>}
                                                    </>
                                                }
                                                externalDocLink={"https://essential-blocks.com/docs/retrieve-opensea-nft-api/"}
                                                externalDocText={
                                                    <>
                                                        Learn more about NFT Gallery Block <Dashicon icon="external" />
                                                    </>
                                                }
                                            />
                                        </>}
                                        {!nftError.status && (
                                            <>
                                                {settings.opensea.type === "items" && (
                                                    <Items data={nftData.nfts} attributes={attributes} />
                                                )}

                                                {settings.opensea.type === "collections" && (
                                                    <Collections
                                                        data={nftData?.collections}
                                                        attributes={attributes}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </>
                                )}

                            </>
                        )}

                    </div>
                </div>
            </BlockProps.Edit >
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
