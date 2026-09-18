/**
 * Provider strategies.
 *
 * Identity only: which service a video URL belongs to. Used to decide whether
 * provider-specific embed parameters apply — see `cropsYouTubeChrome` in
 * edit.js and `cropsYouTubeChromeFor` in frontend.js.
 */

const PROVIDERS = [
    {
        id: "youtube",
        matches: (url) => /youtube\.com|youtu\.be/i.test(url),
    },
    {
        id: "vimeo",
        matches: (url) => /vimeo\.com/i.test(url),
    },
];

/**
 * Self-hosted files and every unrecognised source resolve to null, and every
 * caller reads that as "no provider-specific handling".
 */
export const resolveProvider = (url) =>
    PROVIDERS.find((provider) => provider.matches(url)) || null;
