<?php

$read_more_html = '';

if ($showReadMore) {
    $read_more_html .= sprintf(
        '<div class="ebpg-readmore-btn">
            <a href="%1$s">%2$s</a>
        </div>',
        get_permalink($result->ID),
        $readmoreText
    );
}

return $read_more_html;
