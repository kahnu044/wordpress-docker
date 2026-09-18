/**
 * Video source classification — the single source of truth for this block.
 *
 * Every surface that needs to know "is this URL a file rather than an embed"
 * imports from here. It used to be decided in three places with three different
 * rules, which is why a `.m4v` URL previewed as an error in the editor while
 * playing perfectly on the page.
 *
 * The patterns mirror react-player's own (`react-player/lib/patterns.js`)
 * because react-player is what actually mounts the player on the frontend.
 * Matching it exactly is what keeps the editor and the published page in step;
 * any other rule here would put them back out of step.
 *
 * WordPress core owns a fourth, unrelated classifier — the classic embed
 * handler registered in `wp-includes/embed.php` with
 * `#^https?://.+?\.(mp4|m4v|webm|ogv|flv)$#i`. It cannot be matched exactly: it
 * omits `.ogg`/`.mov`, rejects any query string, and changing it means
 * filtering `wp_video_extensions` site-wide, which would affect every other
 * block. The gap is closed by avoidance instead — `edit.js` never asks the
 * oEmbed endpoint about a URL either function below matches, so core's handler
 * is never reached for a file source and the two can never disagree.
 */

/**
 * Files a plain `<video>` element can play, so the editor can preview them
 * natively. `(#t=…)` is react-player's media-fragment allowance; without it a
 * perfectly playable `…/clip.mp4#t=10` reads as not-a-file.
 */
export const DIRECT_MEDIA_RE = /\.(mp4|og[gv]|webm|mov|m4v)(#t=[,\d+]+)?($|\?)/i;

/**
 * Streaming manifests. Playable on the frontend — `AdvancedVideo.php` ships
 * hls.js, dash.js and flv.js there — but not in the editor, which loads none of
 * them. Classified all the same so the editor can say so rather than falling
 * through to the "invalid URL" message.
 */
export const STREAMING_RE = /\.(m3u8|mpd|flv)($|\?)/i;

export const isDirectMediaUrl = (url) => !!url && DIRECT_MEDIA_RE.test(url);

export const isStreamingUrl = (url) => !!url && STREAMING_RE.test(url);
