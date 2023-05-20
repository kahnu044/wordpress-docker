<?php

$headerMetaHtml = "";
if ( isset( $showMeta ) && $showMeta ) {
    if (in_array("avatar", $headerMeta)) {
        $headerMetaHtml .= $avatar;
    }
    $headerMetaHtml .= '<div class="ebpg-entry-meta-items">';
    foreach ($headerMeta as $meta) {
        if (in_array($meta, $tax_meta)) {
            $headerMetaHtml .= $tax_meta_html[$meta];
        } else if (isset(${$meta}) && $meta != "avatar") {
            $headerMetaHtml .= ${$meta};
        }
    }
    $headerMetaHtml .= '</div>';
}

if( ! empty( $headerMetaHtml ) ) {
    $headerMetaHtml = sprintf(
        '<div class="ebpg-entry-meta ebpg-header-meta">%1$s</div>',
        $headerMetaHtml
    );
}

return $headerMetaHtml;
