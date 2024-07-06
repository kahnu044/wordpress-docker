jQuery(document).ready(function($) {
    //trigger popup on click deactive plugin
    $('a#deactivate-multiline-files-for-contact-form-7').on('click', function (e) {
        e.preventDefault(); // Prevent default action (deactivating the plugin)
        $('.admin-popup-container').show();
        $('#custom-plugin-modal-overlay').show();
        $('#custom-plugin-modal').show();
    });
    // on click close and side screen close popup
    $('.button-close').on('click', function (e) {
        e.preventDefault();
        // Hide popup if close button is clicked
        $('.admin-popup-container').hide();
        $('#custom-plugin-modal-overlay').hide();
        $('#custom-plugin-modal').hide();
    });

     // Hide textarea initially
     $('textarea[name="other_reason"]').hide();

     // Show textarea when 'Other' is selected
     $('input[name="selected-reason"]').on('change', function () {
         if ($(this).val() === 'Other') {
             $('textarea[name="other_reason"]').show();
         } else {
             $('textarea[name="other_reason"]').hide();
         }
     });
    // on submit feedback poup form sent data to callback and get responce from callback 
    $('#custom-plugin-deactivate-form').on('submit', function (e) {
        e.preventDefault(); // Prevent default form submission

         $('#loader').show();
        // Perform plugin deactivation
         var selectedReason = $('input[name="selected-reason"]:checked').val();
        var otherReason = '';

        if (selectedReason === 'Other') {
            otherReason = $('textarea[name="other_reason"]').val();
        }
        var data = {
            action: 'custom_plugin_deactivate',
            reason: selectedReason,
            other_reason: otherReason,
            _wpnonce: $('#custom-plugin-deactivate-form input[name="_wpnonce"]').val()
        };
        $.ajax({
            url: custom_plugin_ajax_object.ajax_url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('AJAX Success:', response);
                $('#loader').hide();
                $('.admin-popup-container').hide();
                $('#custom-plugin-modal-overlay').hide();
                $('#custom-plugin-modal').hide();
                // Hide popup upon successful deactivation
                location.reload(); // Reload the page after deactivation
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('AJAX Error:', errorThrown);
                $('#loader').hide();
                alert('Failed to deactivate plugin. Please try again.');
            }
        });
        
    });
    
    // Click event handler for the "Cancel & Deactivate" button
    $('.cancel-deactivate-button').click(function() {
        // Hide the popup without submitting any response
        $('.admin-popup-container').hide();
        $('#custom-plugin-modal-overlay').hide();
        $('#custom-plugin-modal').hide();
        var data = {
            action: 'deactive_plugin_without_feedback',
        };
        $.ajax({
            url: custom_plugin_ajax_object.ajax_url,
            method: 'POST',
            data: data,
            success: function (response) {
                console.log('AJAX Success:', response);
                $('#loader').hide();
                $('.admin-popup-container').hide();
                $('#custom-plugin-modal-overlay').hide();
                $('#custom-plugin-modal').hide();
                // Hide popup upon successful deactivation
                location.reload(); // Reload the page after deactivation
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.error('AJAX Error:', errorThrown);
                //$('#loader').hide();
                alert('Failed to deactivate plugin. Please try again.');
            }
        });
        location.reload();
    });
    // if ($(".zl-form-control-wrap input").attr('aria-invalid') == 'true') {
    //     $('.zl-form-control-wrap .mfcf7-zl-multifile-name').append(localStorage.getItem('zlfilename'));
    //     $('.zl-form-control-wrap .mfcf7_zl_delete_file').show();
    //     var erMsg = $('.zl-form-control-wrap .wpcf7-not-valid-tip').text();
    //     $('.zl-form-control-wrap .wpcf7-not-valid-tip').remove();
    //     localStorage.removeItem('zlfilename');
    //     $('.zl-form-control-wrap').append('<span class="wpcf7-not-valid-tip" aria-hidden="true">' + erMsg + '</span>');
    //     $('.mfcf7-zl-multiline-sample').find('.wpcf7-not-valid-tip').remove();

    // }
    // $('.mfcf7_zl_delete_file').on('click', function() {
    //     var get_parent = $(this).parent().remove();
    // });
});