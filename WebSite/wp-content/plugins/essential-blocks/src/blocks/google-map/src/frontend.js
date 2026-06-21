import { GOOGLE_MAP_STYLES, SNAZZY_MAP_STYLES } from "./constants";
document.addEventListener("DOMContentLoaded", function (event) {
    let mapContainers = document.querySelectorAll(".eb-google-map-wrapper");

    if (mapContainers.length <= 0) {
        return;
    }

    if (!window.google) {
        return;
    }

    for (let i = 0; i < mapContainers.length; i++) {
        let map = mapContainers[i];

        let mapType = map.getAttribute("data-map-type");
        let mapZoom = map.getAttribute("data-map-zoom");
        let latitude = map.getAttribute("data-latitude") || "0";
        let longitude = map.getAttribute("data-longitude") || "0";
        let imageSize = map.getAttribute("data-image-size");
        let themeSource = map.getAttribute("data-theme-source");
        let googleMapStyle = map.getAttribute("data-google-style");
        let snazzyMapStyle = map.getAttribute("data-snazzy-style");

        let markersAttribute = map.getAttribute("data-marker");
        let markers;

        // Skip when the marker data is missing — e.g. block is behind Protected
        // Content, so the wrapper renders but data-marker has been stripped.
        // Without this guard, atob(null) → InvalidCharacterError, then
        // decodeURIComponent on the result throws URIError: URI malformed.
        if (!markersAttribute) {
            continue;
        }

        try {
            let parsedData = JSON.parse(markersAttribute);
            if (Array.isArray(parsedData)) {
                markers = parsedData;
            } else {
                let decodedData = decodeURIComponent(escape(atob(markersAttribute)));

                markers = JSON.parse(decodedData);
            }
        } catch (e) {
            try {
                let decodedData = decodeURIComponent(escape(atob(markersAttribute)));
                markers = JSON.parse(decodedData);
            } catch (e2) {
                // Both decoders failed — skip this wrapper instead of crashing.
                continue;
            }
        }

        const customStyles =
            "google_theme" === themeSource
                ? GOOGLE_MAP_STYLES[googleMapStyle]
                : SNAZZY_MAP_STYLES[snazzyMapStyle];

        // mapId and inline styles are mutually exclusive: when a mapId is set,
        // Google ignores inline styles. So we only opt into AdvancedMarkerElement
        // (which requires a mapId) when the user has not picked a custom theme.
        const AdvancedMarkerElement =
            window.google.maps.marker &&
            window.google.maps.marker.AdvancedMarkerElement;
        const useAdvancedMarker =
            !!AdvancedMarkerElement &&
            (!customStyles || customStyles.length === 0);

        const mapOptions = {
            center: {
                lat: Number(markers[0].latitude) || Number(latitude),
                lng: Number(markers[0].longitude) || Number(longitude),
            },
            gestureHandling: "cooperative",
            zoom: markers.length === 1 ? parseInt(mapZoom) : 0,
            mapTypeId: mapType,
            zoomControl: mapZoom,
        };

        if (useAdvancedMarker) {
            mapOptions.mapId = "EB_GOOGLE_MAP";
        } else {
            mapOptions.styles = customStyles;
        }

        const googleMap = new window.google.maps.Map(map, mapOptions);

        if (markers && 0 < markers.length) {
            let bounds = new google.maps.LatLngBounds();
            markers.forEach((marker, index) => {
                const position = new window.google.maps.LatLng(
                    marker.latitude,
                    marker.longitude
                );
                let iconUrl =
                    "true" == marker.showCustomIcon
                        ? marker.imageUrl
                        : marker.icon;

                let icon =
                    iconUrl ||
                    "https://maps.google.com/mapfiles/ms/icons/red-dot.png";

                let mark;
                if (useAdvancedMarker) {
                    const img = document.createElement("img");
                    img.src = icon;
                    img.style.width = imageSize + "px";
                    img.style.height = imageSize + "px";
                    mark = new AdvancedMarkerElement({
                        position,
                        map: googleMap,
                        title: marker.title,
                        content: img,
                    });
                } else {
                    mark = new window.google.maps.Marker({
                        position,
                        map: googleMap,
                        title: marker.title,
                        icon: {
                            url: icon,
                            scaledSize: new google.maps.Size(
                                imageSize,
                                imageSize
                            ),
                        },
                    });
                }

                if (marker.title || marker.content) {
                    const contentString = `<div class="eb-google-map-overview"><h6 class="eb-google-map-overview-title">${marker.title
                        }</h6><div class="eb-google-map-overview-content">${marker.content ? `<p>${marker.content}</p>` : ""
                        }</div></div>`;

                    bounds.extend(position);
                    const infowindow = new window.google.maps.InfoWindow({
                        content: contentString,
                    });

                    if (index == 0) {
                        if (useAdvancedMarker) {
                            infowindow.open({ anchor: mark, map: googleMap });
                        } else {
                            infowindow.open(googleMap, mark);
                        }
                    }
                    if (useAdvancedMarker) {
                        // AdvancedMarkerElement clicks need `gmp-click` and the
                        // anchor passed via the options bag, not the marker arg.
                        mark.addListener("gmp-click", () => {
                            infowindow.open({ anchor: mark, map: googleMap });
                        });
                    } else {
                        mark.addListener("click", () => {
                            infowindow.open(googleMap, mark);
                        });
                    }
                    if (markers.length > 1) {
                        googleMap.fitBounds(bounds);
                    }
                }
            });
        }
    }
});
