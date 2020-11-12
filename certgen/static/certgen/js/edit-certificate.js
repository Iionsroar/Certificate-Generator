let v_slider = document.getElementById('v-slider-placeholder');
let h_slider = document.getElementById('h-slider-placeholder');
let $canvas_preview = $('canvas#certificate-preview');

let colorInput = document.querySelector('#colorPicker');
let fontSize_slider = document.getElementById('font-slider');
let font_family_selected = document.getElementById('font-choices');

window.temp_h_val = window.certprev_h_val;
window.temp_v_val = window.certprev_v_val;
window.temp_align = window.text_align;
window.temp_font_color = window.font_color;
window.temp_font_size = window.font_size;
window.temp_font_family = window.font_family;

//For font color picker
colorInput.addEventListener('input', () =>{
    let color = colorInput.value;
    window.temp_font_color = colorInput.value;
    generatePreview(window.preview_name, hPos=window.temp_h_val, vPos=window.temp_v_val, textAlign=window.text_align, imgSelector="img#edit_preview", font=window.temp_font_family, fontColor=color, fontSize=window.temp_font_size);
});

//For Horizontal slider
h_slider.oninput = function() {
    window.temp_h_val = h_slider.value;
    generatePreview(window.preview_name, hPos=h_slider.value, vPos=window.temp_v_val, textAlign=window.text_align, imgSelector="img#edit_preview", font=window.temp_font_family, fontColor=window.temp_font_color, fontSize=window.temp_font_size);
};

//For Vertical slider
v_slider.oninput = function() {
    window.temp_v_val = v_slider.value;
    generatePreview(window.preview_name, hPos=window.temp_h_val, vPos=v_slider.value, textAlign=window.text_align, imgSelector="img#edit_preview", font=window.temp_font_family,fontColor=window.temp_font_color, fontSize=window.temp_font_size);
};

//For Font size silder
fontSize_slider.oninput = function() {
    window.temp_font_size = fontSize_slider.value;
    generatePreview(window.preview_name, hPos=window.temp_h_val, vPos=window.temp_v_val, textAlign=window.text_align, imgSelector="img#edit_preview", font=window.temp_font_family, fontColor=window.temp_font_color, fontSize=fontSize_slider.value);
};

$(function() {
    //For Font family selector
    $('#dropdown-font-f span').on('click', function() {
        window.temp_font_family = $(this).html();
        generatePreview(window.preview_name, hPos=window.temp_h_val, vPos=window.temp_v_val, textAlign=window.temp_align, imgSelector="img#edit_preview", font=$(this).html(), fontColor=window.temp_font_color, fontSize=window.temp_font_size);
    });
    
    //For Text alignments
    $('#text-align-buttons .button').on('click', function() {
        $(this).addClass('is-dark is-selected');
        $(this).siblings().removeClass('is-dark is-selected');
        window.temp_align = $(this).html().toLowerCase();
        generatePreview(window.preview_name, hPos=window.temp_h_val, vPos=window.temp_v_val, textAlign=$(this).html().toLowerCase(), imgSelector="img#edit_preview", font=window.temp_font_family, fontColor=window.temp_font_color, fontSize=window.temp_font_size);
    });

    //For Saving or Applying edits
    $('#apply-edit').on('click', function() {
        window.certprev_v_val = window.temp_v_val;
        window.certprev_h_val = window.temp_h_val;
        window.text_align = window.temp_align;
        window.font_color = window.temp_font_color;
        window.font_size = window.temp_font_size;
        window.font_family = window.temp_font_family;
        generatePreview(window.preview_name, hPos=window.certprev_h_val, vPos=window.certprev_v_val, textAlign=window.text_align, imgSelector="img#edit_preview", font=window.font_family, fontColor=window.font_color, fontSize=window.font_size);
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
