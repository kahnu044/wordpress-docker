<?php

$footerMetaHtml = "";
if ( isset( $showMeta ) && $showMeta ) {
    if (in_array("avatar", $footerMeta)) {
        $footerMetaHtml .= $avatar;
    }
    $footerMetaHtml .= '<div class="ebpg-entry-meta-items">';
    foreach ($footerMeta as $meta) {
        if (in_array($meta, $tax_meta)) {
            $footerMetaHtml .= $tax_meta_html[$meta];
        } else if ($meta != "avatar") {
            $footerMetaHtml .= ${$meta};
        }
    }
    $footerMetaHtml .= '</div>';
}

if( ! empty( $footerMetaHtml ) ) {
    $footerMetaHtml = sprintf(
        '<div class="ebpg-entry-meta ebpg-footer-meta">%1$s</div>',
        $footerMetaHtml
    );
}

return $footerMetaHtml;
