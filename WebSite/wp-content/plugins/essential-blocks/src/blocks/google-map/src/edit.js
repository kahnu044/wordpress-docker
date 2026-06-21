/**
 * External Dependencies
 */
import { __ } from "@wordpress/i18n";
import { useEffect, useState, useRef, memo } from "@wordpress/element";

/**
 * Internal Dependencies
 */
import Inspector from "./inspector";
import {
    NoticeComponent,
    BlockProps,
    withBlockContext,
    getEditorDocument,
} from "@essential-blocks/controls";

import {
    GOOGLE_MAP_STYLES,
    SNAZZY_MAP_STYLES,
} from "./constants";

import Style from "./style";
import defaultAttributes from './attributes';
import { ReactComponent as Icon } from "./icon.svg";
import { Dashicon } from "@wordpress/components";

function Edit(props) {
    const { attributes, setAttributes, className, clientId, isSelected, name } = props;

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
        imageSize,
        cover,
        themeSource,
        googleMapStyle,
        snazzyMapStyle,
    } = attributes;

    const [isMapInit, setIsMapInit] = useState(true);

    // you must declare this variable
    const enhancedProps = {
        ...props,
        blockPrefix: 'eb-google-map',
        style: <Style {...props} />
    };

    // References
    const mapRef = useRef(null);
    const isMount = useRef(null);

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
        themeSource,
        googleMapStyle,
        snazzyMapStyle,
    ]);

    useEffect(() => {
        if (marker.length > 0) return;

        let defaultMarker = [
            {
                title: searchAddress ? searchAddress : __("Marker 1", "essential-blocks"),
                latitude: latitude,
                longitude: longitude,
                location: searchAddress,
            },
        ];

        setAttributes({ marker: defaultMarker });
    }, []);

    // Resolve the user's chosen inline-styles array. Used both to style the
    // map and to decide whether we can opt into AdvancedMarkerElement (which
    // requires a mapId, and mapId disables inline styles).
    const getCustomStyles = () =>
        "google_theme" === themeSource
            ? GOOGLE_MAP_STYLES[googleMapStyle]
            : SNAZZY_MAP_STYLES[snazzyMapStyle];

    const canUseAdvancedMarker = () => {
        const styles = getCustomStyles();
        return (
            !!window?.google?.maps?.marker?.AdvancedMarkerElement &&
            (!styles || styles.length === 0)
        );
    };

    // initialize map
    const initMap = () => {
        const editor = getEditorDocument();
        if (!window.google || !editor.getElementById(blockId)) {
            setIsMapInit(false);
            return;
        }

        if (!window?.google?.maps) {
            return;
        }

        const useAdvancedMarker = canUseAdvancedMarker();
        const mapOptions = {
            center: {
                lat: Number(marker[0]?.latitude) || Number(latitude),
                lng: Number(marker[0]?.longitude) || Number(longitude),
            },
            gestureHandling: "cooperative",
            zoom: marker.length === 1 ? parseInt(mapZoom) || "13" : 0,
            mapTypeId: mapType,
        };

        if (useAdvancedMarker) {
            mapOptions.mapId = "EB_GOOGLE_MAP";
        } else {
            mapOptions.styles = getCustomStyles();
        }

        mapRef.current = new window.google.maps.Map(
            editor.getElementById(blockId),
            mapOptions
        );

        if (marker.length > 0) {
            multipleMarkers(marker, useAdvancedMarker);
        }
    };

    const multipleMarkers = (locations, useAdvancedMarker) => {
        if (Object.keys(locations).length > 0) {
            var infowindow = new google.maps.InfoWindow();
            var imageSizeNew = imageSize ? imageSize : 32;
            var marker, i;
            var bounds = new google.maps.LatLngBounds();
            const AdvancedMarkerElement =
                window?.google?.maps?.marker?.AdvancedMarkerElement;

            for (i = 0; i < locations.length; i++) {
                let iconUrl = "true" == locations[i].showCustomIcon ? locations[i].imageUrl : locations[i].icon;
                const iconSrc =
                    iconUrl || "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
                const position = new google.maps.LatLng(
                    locations[i].latitude || latitude,
                    locations[i].longitude || longitude
                );

                if (useAdvancedMarker && AdvancedMarkerElement) {
                    const img = document.createElement("img");
                    img.src = iconSrc;
                    img.style.width = imageSizeNew + "px";
                    img.style.height = imageSizeNew + "px";
                    marker = new AdvancedMarkerElement({
                        position,
                        title: locations[i].title,
                        content: img,
                        map: mapRef.current,
                    });
                } else {
                    marker = new google.maps.Marker({
                        position,
                        title: locations[i].title,
                        icon: {
                            url: iconSrc,
                            scaledSize: new google.maps.Size(
                                imageSizeNew,
                                imageSizeNew
                            ),
                        },
                        map: mapRef.current,
                    });
                }

                const contentString = `<div class="eb-google-map-overview"><h6 class="eb-google-map-overview-title">${locations[i].title
                    }</h6><div class="eb-google-map-overview-content">${locations[i].content ? `<p>${locations[i].content}</p>` : ""
                    }</div></div>`;
                bounds.extend(position);
                if (i == 0) {
                    infowindow.setContent(contentString);
                    if (useAdvancedMarker) {
                        infowindow.open({ anchor: marker, map: mapRef.current });
                    } else {
                        infowindow.open(mapRef.current, marker);
                    }
                }
                const clickEvent = useAdvancedMarker ? "gmp-click" : "click";
                google.maps.event.addListener(
                    marker,
                    clickEvent,
                    (function (marker) {
                        return function () {
                            infowindow.setContent(contentString);
                            if (useAdvancedMarker) {
                                infowindow.open({
                                    anchor: marker,
                                    map: mapRef.current,
                                });
                            } else {
                                infowindow.open(mapRef.current, marker);
                            }
                        };
                    })(marker)
                );
            }
            if (locations.length > 1) {
                mapRef.current.fitBounds(bounds);
            }
        }
    };

    return cover.length ? (
        <div>
            <img src={cover} alt="google map" style={{ maxWidth: "100%" }} />
        </div>
    ) : (
        <>
            {isSelected && (
                <Inspector key="inspector" attributes={attributes} setAttributes={setAttributes} map={mapRef.current} />
            )}
            <BlockProps.Edit {...enhancedProps}>
                <div className={`eb-parent-wrapper eb-parent-${blockId} ${classHook}`}>
                    {!isMapInit && (
                        <NoticeComponent
                            Icon={Icon}
                            title={"Google Maps"}
                            description={
                                <>
                                    Please add your Google Map API&nbsp;
                                    <a
                                        target="_blank"
                                        href={`${EssentialBlocksLocalize?.eb_admin_url}admin.php?page=essential-blocks&tab=options`}
                                    >
                                        Here
                                    </a>
                                    &nbsp;to display Google Maps Block
                                </>
                            }
                            externalDocLink={"https://essential-blocks.com/docs/retrieve-google-maps-api"}
                            externalDocText={
                                <>
                                    Learn more about Google Map API <Dashicon icon="external" />
                                </>
                            }
                        />
                    )}
                    {isMapInit && (
                        <div
                            id={blockId}
                            className={`${blockId} eb-google-map-wrapper`}
                            style={{ height: `${mapHeight || 400}px` }}
                        ></div>
                    )}
                </div>
            </BlockProps.Edit>
        </>
    );
}
export default memo(withBlockContext(defaultAttributes)(Edit))
