/**
 * External Dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useRef } from "@wordpress/element";
import { useBlockProps } from "@wordpress/block-editor";
import { select } from "@wordpress/data";
import classnames from "classnames";

/**
 * Internal Dependencies
 */
import Inspector from "./inspector";
const {
    softMinifyCssStrings,
    duplicateBlockIdFix,
    generateDimensionsControlStyles,
    generateBorderShadowStyles,
    generateTypographyStyles,
    generateBackgroundControlStyles,
} = EBControls;

import {
    wrapMarginConst,
    wrapPaddingConst,
    WrpBgConst,
    WrpBdShadowConst,
} from "./constants";
import {
    typoPrefix_title,
    typoPrefix_desc,
} from "./constants/typographyConstants";

const edit = (props) => {
    const {
        attributes,
        setAttributes,
        className,
        clientId,
        isSelected,
    } = props;

    const {
        blockId,
        blockMeta,
        // responsive control attribute ⬇
        resOption,
        classHook,
        mapType,
        mapZoom,
        mapHeight,
        latitude,
        longitude,
        searchAddress,
        marker,
        titleColor,
        titleHoverColor,
        descColor,
        imageSize,
    } = attributes;

    useEffect(() => {
        // this useEffect is for creating an unique id for each block's unique className by a random unique number
        const BLOCK_PREFIX = "eb-google-map";
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

    const {
        dimensionStylesDesktop: wrpMarginDesktop,
        dimensionStylesTab: wrpMarginTab,
        dimensionStylesMobile: wrpMarginMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: wrapMarginConst,
        styleFor: "margin",
    });

    const {
        dimensionStylesDesktop: wrpPaddingDesktop,
        dimensionStylesTab: wrpPaddingTab,
        dimensionStylesMobile: wrpPaddingMobile,
    } = generateDimensionsControlStyles({
        attributes,
        controlName: wrapPaddingConst,
        styleFor: "padding",
    });

    const {
        backgroundStylesDesktop: wrpBackgroundStylesDesktop,
        hoverBackgroundStylesDesktop: wrpHoverBackgroundStylesDesktop,
        backgroundStylesTab: wrpBackgroundStylesTab,
        hoverBackgroundStylesTab: wrpHoverBackgroundStylesTab,
        backgroundStylesMobile: wrpBackgroundStylesMobile,
        hoverBackgroundStylesMobile: wrpHoverBackgroundStylesMobile,
        overlayStylesDesktop: wrpOverlayStylesDesktop,
        hoverOverlayStylesDesktop: wrpHoverOverlayStylesDesktop,
        overlayStylesTab: wrpOverlayStylesTab,
        hoverOverlayStylesTab: wrpHoverOverlayStylesTab,
        overlayStylesMobile: wrpOverlayStylesMobile,
        hoverOverlayStylesMobile: wrpHoverOverlayStylesMobile,
        bgTransitionStyle: wrpBgTransitionStyle,
        ovlTransitionStyle: wrpOvlTransitionStyle,
    } = generateBackgroundControlStyles({
        attributes,
        controlName: WrpBgConst,
        // noOverlay: true,
        // noMainBgi: true,
        // noOverlayBgi: true, // if 'noOverlay : true' is given then there's no need to give 'noOverlayBgi : true'
    });

    const {
        styesDesktop: wrpBdShdStyesDesktop,
        styesTab: wrpBdShdStyesTab,
        styesMobile: wrpBdShdStyesMobile,
        stylesHoverDesktop: wrpBdShdStylesHoverDesktop,
        stylesHoverTab: wrpBdShdStylesHoverTab,
        stylesHoverMobile: wrpBdShdStylesHoverMobile,
        transitionStyle: wrpBdShdTransitionStyle,
    } = generateBorderShadowStyles({
        controlName: WrpBdShadowConst,
        attributes,
        // noShadow: true,
        // noBorder: true,
    });

    const {
        typoStylesDesktop: titleTypoStylesDesktop,
        typoStylesTab: titleTypoStylesTab,
        typoStylesMobile: titleTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_title,
        defaultFontSize: "14",
    });

    const {
        typoStylesDesktop: descTypoStylesDesktop,
        typoStylesTab: descTypoStylesTab,
        typoStylesMobile: descTypoStylesMobile,
    } = generateTypographyStyles({
        attributes,
        prefixConstant: typoPrefix_desc,
        defaultFontSize: "13",
    });

    const desktopStyles = `
	.${blockId}.eb-google-map-wrapper {
		${wrpMarginDesktop}
		${wrpPaddingDesktop}
		${wrpBackgroundStylesDesktop}
		${wrpBdShdStyesDesktop}
		transition:${wrpBgTransitionStyle}, ${wrpBdShdTransitionStyle};
	}
	.${blockId}.eb-google-map-wrapper:hover{
		${wrpHoverBackgroundStylesDesktop}
		${wrpBdShdStylesHoverDesktop}
	}
	.${blockId}.eb-google-map-wrapper:before{
		${wrpOverlayStylesDesktop}
		transition:${wrpOvlTransitionStyle};
	}
	.${blockId}.eb-google-map-wrapper:hover:before{
		${wrpHoverOverlayStylesDesktop}
	}
	.${blockId}.eb-google-map-wrapper .eb-google-map-overview  .eb-google-map-overview-title {
		color: ${titleColor};
		${titleTypoStylesDesktop};
	}
	.${blockId}.eb-google-map-wrapper .eb-google-map-overview  .eb-google-map-overview-title:hover {
		color: ${titleHoverColor};
	}
	.${blockId}.eb-google-map-wrapper .eb-google-map-overview  .eb-google-map-overview-content {
		color: ${descColor};
		${descTypoStylesDesktop};
	}
	`;
    const tabStyles = `
	.${blockId}.eb-google-map-wrapper {
		${wrpMarginTab}
		${wrpPaddingTab}
		${wrpBackgroundStylesTab}
		${wrpBdShdStyesTab}
	}
	.${blockId}.eb-google-map-wrapper:hover{
		${wrpHoverBackgroundStylesTab}
		${wrpBdShdStylesHoverTab}
	}
	.${blockId}.eb-google-map-wrapper:hover{
		${wrpHoverBackgroundStylesMobile}
		${wrpBdShdStylesHoverMobile}
	}
	.${blockId}.eb-google-map-wrapper:before{
		${wrpOverlayStylesTab}
	}
	.${blockId}.eb-google-map-wrapper:hover:before{
		${wrpHoverOverlayStylesTab}
	}
	.${blockId}.eb-google-map-wrapper .eb-google-map-overview  .eb-google-map-overview-title {
		${titleTypoStylesTab};
	}
	.${blockId}.eb-google-map-wrapper .eb-google-map-overview  .eb-google-map-overview-content {
		${descTypoStylesTab};
	}
	`;
    const mobileStyles = `
	.${blockId}.eb-google-map-wrapper {
		${wrpMarginMobile}
		${wrpPaddingMobile}
		${wrpBackgroundStylesMobile}
		${wrpBdShdStyesMobile}
	}
	.${blockId}.eb-google-map-wrapper:before{
		${wrpOverlayStylesMobile}
	}

	.${blockId}.eb-google-map-wrapper:hover:before{
		${wrpHoverOverlayStylesMobile}
	}
	.${blockId}.eb-google-map-wrapper .eb-google-map-overview  .eb-google-map-overview-title {
		${titleTypoStylesMobile};
	}
	.${blockId}.eb-google-map-wrapper .eb-google-map-overview  .eb-google-map-overview-content {
		${descTypoStylesMobile};
	}
	`;

    // all css styles for large screen width (desktop/laptop) in strings ⬇
    const desktopAllStyles = softMinifyCssStrings(`
		${desktopStyles}
	`);

    // all css styles for Tab in strings ⬇
    const tabAllStyles = softMinifyCssStrings(`
		${tabStyles}
	`);

    // all css styles for Mobile in strings ⬇
    const mobileAllStyles = softMinifyCssStrings(`
		${mobileStyles}
	`);
    // Set All Style in "blockMeta" Attribute
    useEffect(() => {
        const styleObject = {
            desktop: desktopAllStyles,
            tab: tabAllStyles,
            mobile: mobileAllStyles,
        };
        if (JSON.stringify(blockMeta) != JSON.stringify(styleObject)) {
            setAttributes({ blockMeta: styleObject });
        }
    }, [attributes]);

    // References
    const mapRef = useRef(null);
    const isMount = useRef(null);

    const getEditorIframe = () => {
        return document.querySelector('iframe[name^="editor-canvas"]');
    };

    useEffect(() => {
        isMount.current = true;
        return () => {
            isMount.current = false;
        };
    }, []);

    useEffect(() => {
        if (isMount.current && blockId) {
            initMap();
        }
    }, [
        mapZoom,
        mapType,
        searchAddress,
        longitude,
        latitude,
        marker,
        isMount,
        imageSize,
        blockId,
    ]);

    useEffect(() => {
        if (marker.length > 0) return;

        let defaultMarker = [
            {
                title: searchAddress
                    ? searchAddress
                    : __("Marker 1", "essential-block"),
                latitude: latitude,
                longitude: longitude,
                location: searchAddress,
            },
        ];

        setAttributes({ marker: defaultMarker });
    }, []);

    // initialize map
    const initMap = () => {
        const editor = getEditorIframe()?.contentWindow?.document ?? document;
        mapRef.current = new window.google.maps.Map(
            editor.getElementById(blockId),
            {
                center: {
                    lat: Number(marker[0]?.latitude) || Number(latitude),
                    lng: Number(marker[0]?.longitude) || Number(longitude),
                },
                gestureHandling: "cooperative",
                zoom: marker.length === 1 ? parseInt(mapZoom) || "13" : 0,
                mapTypeId: mapType,
            }
        );
        if (marker.length > 0) {
            multipleMarkers(marker);
        }
    };

    const multipleMarkers = (locations) => {
        if (Object.keys(locations).length > 0) {
            var infowindow = new google.maps.InfoWindow();
            var imageSizeNew = imageSize ? imageSize : 32;
            var marker, i;
            var bounds = new google.maps.LatLngBounds();
            for (i = 0; i < locations.length; i++) {
                let iconUrl =
                    "true" == locations[i].showCustomIcon
                        ? locations[i].imageUrl
                        : locations[i].icon;
                let icon = {
                    url:
                        iconUrl ||
                        "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    scaledSize: new google.maps.Size(
                        imageSizeNew,
                        imageSizeNew
                    ),
                };

                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(
                        locations[i].latitude || latitude,
                        locations[i].longitude || longitude
                    ),
                    title: locations[i].title,
                    icon: icon,
                    map: mapRef.current,
                });

                const contentString = `<div class="eb-google-map-overview"><h6 class="eb-google-map-overview-title">${
                    locations[i].title
                }</h6><div class="eb-google-map-overview-content">${
                    locations[i].content ? `<p>${locations[i].content}</p>` : ""
                }</div></div>`;
                bounds.extend(marker.getPosition());
                if (i == 0) {
                    infowindow.setContent(contentString);
                    infowindow.open(mapRef.current, marker);
                }
                google.maps.event.addListener(
                    marker,
                    "click",
                    (function (marker, i) {
                        return function () {
                            infowindow.setContent(contentString);
                            infowindow.open(mapRef.current, marker);
                        };
                    })(marker, i)
                );
            }
            if (locations.length > 1) {
                mapRef.current.fitBounds(bounds);
            }
        }
    };

    return (
        <>
            {isSelected && (
                <Inspector
                    key="inspector"
                    attributes={attributes}
                    setAttributes={setAttributes}
                    map={mapRef.current}
                />
            )}
            <div {...blockProps}>
                <style>
                    {`
				 ${desktopAllStyles}

				 /* mimmikcssStart */

				 ${resOption === "Tablet" ? tabAllStyles : " "}
				 ${resOption === "Mobile" ? tabAllStyles + mobileAllStyles : " "}

				 /* mimmikcssEnd */

				 @media all and (max-width: 1024px) {

					 /* tabcssStart */
					 ${softMinifyCssStrings(tabAllStyles)}
					 /* tabcssEnd */

				 }

				 @media all and (max-width: 767px) {

					 /* mobcssStart */
					 ${softMinifyCssStrings(mobileAllStyles)}
					 /* mobcssEnd */

				 }
				 `}
                </style>
                <div
                    className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}
                >
                    <div
                        id={blockId}
                        className={`${blockId} eb-google-map-wrapper`}
                        style={{ height: `${mapHeight || 400}px` }}
                    ></div>
                </div>
            </div>
        </>
    );
};
export default edit;
