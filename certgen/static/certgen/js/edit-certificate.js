let v_slider = document.getElementById('v-slider-placeholder');
let h_slider = document.getElementById('h-slider-placeholder');
let $canvas_preview = $('canvas#certificate-preview');

window.temp_h_val = window.certprev_h_val;
window.temp_v_val = window.certprev_v_val;
window.temp_align = window.text_align;

h_slider.oninput = function() {
    window.temp_h_val = h_slider.value;
    generatePreview(window.preview_name, hPos=h_slider.value, vPos=window.temp_v_val, textAlign=window.text_align, imgSelector="img#edit_preview");
};

v_slider.oninput = function() {
    window.temp_v_val = v_slider.value;
    generatePreview(window.preview_name, hPos=window.temp_h_val, vPos=v_slider.value, textAlign=window.text_align, imgSelector="img#edit_preview");
};

$(function() {
    $('#text-align-buttons .button').on('click', function() {
        $(this).addClass('is-dark is-selected');
        $(this).siblings().removeClass('is-dark is-selected');
        window.temp_align = $(this).html().toLowerCase();
        generatePreview(window.preview_name, hPos=window.temp_h_val, vPos=window.temp_v_val, textAlign=window.temp_align, imgSelector="img#edit_preview");
    });

    $('#apply-edit').on('click', function() {
        window.certprev_v_val = window.temp_v_val;
        window.certprev_h_val = window.temp_h_val;
        window.text_align = window.temp_align;
        generatePreview(window.preview_name, hPos=window.certprev_h_val, vPos=window.certprev_v_val, textAlign=window.text_align);
        $(this).closest('.modal').removeClass('is-active');
    });

    $('#cancel-edit').on('click', function() {
        // h_slider.val = window.certprev_h_val;
        $('#h-slider-placeholder').val(window.certprev_h_val);
        $('#v-slider-placeholder').val(window.certprev_v_val);
        $('#text-align-buttons').find('.is-selected').removeClass('is-dark is-selected');

        // TODO, DEBUGGING: window.text_align has bugs wtf
        let align = window.text_align[0].toUpperCase() + window.text_align.slice(1);
        $('#text-align-buttons button:contains(' + align + ')').addClass('is-dark is-selected');
        // v_slider.val = window.certprev_v_val;
        // TODO: selected button for text_align;
    });
});
