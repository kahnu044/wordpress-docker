<?php
    $_parent_classes = [
        'eb-parent-wrapper',
        'eb-parent-' . $blockId,
        $classHook
    ];
    $_form_classes = [
        'eb-form',
        'form-layout-' . $formLayout,
        $formStyle
    ];
    $wrapper_attributes = get_block_wrapper_attributes(
        [
            'class' => 'root-' . $blockId,
        ]
    );

    if ($enableMultistepForm) {
        $_form_classes[] = 'eb-multistep-form';
    }

    $extra_keys = ['essentialAttr', 'classHook', 'submit_button_html', 'confirmation_div_html', 'content', 'nonce'];
    $attributes_only = array_diff_key($data, array_flip($extra_keys));
?>
<div <?php echo wp_kses_data( $wrapper_attributes); ?>>
    <div class="<?php echo esc_attr( implode( ' ', $_parent_classes ) );?>">
        <div id="<?php echo esc_attr( $blockId );?>" class="<?php echo esc_attr( $blockId );?> eb-form-wrapper">
            <form id="<?php echo esc_attr( $formId );?>"
                class="<?php echo esc_attr( implode( ' ', $_form_classes ) );?>" action="">
                <div class="eb-form-fields">
                    <?php
                    if ($formType === 'multistep_form' && $enableMultistepForm && $stepIndecator) {
                        // Just call do_action without echoing its result
                        do_action('eb_form_step_indicator_html',
                            $attributes_only['multistepdata'],
                            $stepNavigationStyle,
                            $enableStepCount,
                            $enableStepIcon,
                            $enableStepSubtitle
                        );
                    }
                    ?>
                    <?php echo wp_kses($content, 'post'); ?>
                </div>
                <input class="form-nonce" type="hidden" name="form-nonce" value="<?php echo esc_attr( $nonce );?>" />
                <div class="eb-form-submit">
                    <?php
                    if ($formType === 'multistep_form' && $enableMultistepForm) {
                        // Just call do_action without echoing its result
                        do_action('eb_form_steps_button_html', $attributes_only);
                    }
                    ?>
                    <?php echo wp_kses_post( $submit_button_html ); ?>
                </div>
            </form>
            <?php echo wp_kses_post($confirmation_div_html); ?>
        </div>
    </div>
</div>