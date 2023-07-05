/**
 * WordPress dependencies
 */
import { useBlockProps, RichText } from "@wordpress/block-editor";
import { useEffect, useState } from "@wordpress/element";
import { select } from "@wordpress/data";
/**
 * Internal depenencies
 */
import classnames from "classnames";

import Inspector from "./inspector";
import Style from "./style";

const {
	duplicateBlockIdFix,
} = window.EBControls;

import Items from "./template-components/items";
import Collections from "./template-components/collections";
import Loading from "./template-components/loading";

export default function Edit(props) {
	const { attributes, setAttributes, className, clientId, isSelected } = props;
	const {
		blockId,
		blockMeta,
		// responsive control attribute ⬇
		resOption,
		source,
		settings,
		classHook,
	} = attributes;

	const [nftData, setNftData] = useState({});
	const [nftError, setNftError] = useState({ status: false });
	const [loading, setLoading] = useState(true);

	// this useEffect is for creating a unique id for each block's unique className by a random unique number
	useEffect(() => {
		// const current_block_id = attributes.blockId;

		const BLOCK_PREFIX = "eb-nft-gallery";
		duplicateBlockIdFix({
			BLOCK_PREFIX,
			blockId,
			setAttributes,
			select,
			clientId,
		});
	}, []);

	const blockProps = useBlockProps({
		className: classnames(className, `eb-guten-block-main-parent-wrapper`),
	});

	//Is JSON test
	const isJsonStr = (str) => {
		try {
			JSON.parse(str);
		} catch (e) {
			return false;
		}
		return true;
	}

	useEffect(() => {
		setLoading(true);

		let data = new FormData();
		data.append("action", 'opensea_nft_collections');
		data.append("nft_nonce", EssentialBlocksLocalize.nft_nonce);
		data.append("nft_source", source);
		if (source === "opensea" && settings) {

			//If Type = items and no wallet address/collection slug found, show instructions
			if (settings.opensea.type === 'items' && settings.opensea.filterBy !== '') {
				if (settings.opensea.filterBy === 'slug' && !settings.opensea.collectionSlug) {
					setNftError({
						status: true,
						message: 'Please insert a valid collection slug.'
					});
					setLoading(false);
					return;
				}
				else if (settings.opensea.filterBy === 'wallet' && !settings.opensea.itemWalletId) {
					setNftError({
						status: true,
						message: 'Please insert a valid wallet Address.'
					});
					setLoading(false);
					return;
				}
			}

			//If Type = collections and no wallet address found, show instructions
			if (settings.opensea.type === 'collections' && (!settings.opensea.collectionWalletId || settings.opensea.collectionWalletId.length === 0)) {
				setNftError({
					status: true,
					message: 'Please insert a valid wallet Address.'
				});
				setLoading(false);
				return;
			}

			data.append("openseaType", settings.opensea.type);
			if (settings.opensea.apiKey && (settings.opensea.apiKey.trim()).length > 0) {
				data.append("openseaApiKey", settings.opensea.apiKey);
			}
			data.append("openseaItemFilterBy", settings.opensea.filterBy);
			data.append("openseaCollectionSlug", settings.opensea.collectionSlug);
			data.append("openseaItemWalletId", settings.opensea.itemWalletId);
			data.append("openseaCollectionmWalletId", settings.opensea.collectionWalletId);
			data.append("openseaItemLimit", settings.opensea.itemLimit);
			data.append("openseaItemOrderBy", settings.opensea.orderBy);
			data.append("openseaCollectionLimit", settings.opensea.collectionLimit);

			fetch(EssentialBlocksLocalize.ajax_url, {
				method: 'POST',
				body: data,
			}) // wrapped
				.then(res => res.text())
				.then(data => {
					const response = JSON.parse(data);
					if (response.success) {
						setNftData(JSON.parse(response.data));
						setLoading(false);
						setNftError({
							status: false,
						});
					}
					else {
						const error = (typeof response.data === 'object') ? response.data : isJsonStr(response.data) ? JSON.parse(response.data) : response.data;
						setNftError({
							status: true,
							message: typeof error === "string" ? error : "Invalid Wallet Address/Collection Slug"
						});
						setLoading(false);
					}
				})
				.catch(err => console.log(err));
		}

	}, [settings]);

	return (
		<>
			{isSelected && <Inspector {...props} setLoading={setLoading} />}
			<div {...blockProps}>

				<Style {...props} />

				<div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
					<div className={`eb-nft-gallery-wrapper ${blockId}`} data-id={blockId}>
						{loading && (
							<Loading attributes={attributes} />
						)}
						{!loading && (
							<>
								{nftError.status && (
									<span className="nft-error">{nftError.message}</span>
								)}

								{!nftError.status && (
									<>
										{settings.opensea.type === "items" && (
											<Items
												data={nftData.assets}
												attributes={attributes}
											/>
										)}

										{settings.opensea.type === "collections" && (
											<Collections
												data={settings.opensea.collectionWalletId ? nftData : nftData?.collections}
												attributes={attributes}
											/>
										)}
									</>
								)}
							</>
						)}
					</div>
				</div>
			</div>
		</>
	);
}