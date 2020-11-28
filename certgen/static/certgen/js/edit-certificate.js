let v_slider = document.getElementById('v-slider-placeholder');
let h_slider = document.getElementById('h-slider-placeholder');
let $canvas_preview = $('canvas#certificate-preview');

let colorInput = document.querySelector('#colorPicker');

window.temp_h_val = window.certprev_h_val;
window.temp_v_val = window.certprev_v_val;
window.temp_align = window.text_align;
window.temp_font = window.font;
window.temp_style = window.font_style;

colorInput.addEventListener('input', () =>{
    let color = colorInput.value;
    // generatePreview(window.preview_name, hPos=window.temp_h_val, vPos=window.temp_v_val, textAlign=window.temp_align, imgSelector="img#edit_preview", fontColor=color);
    window.font_color = color; //PANG DEBUG!.....
    generatePreview();
});

h_slider.oninput = function() {
    window.certprev_h_val = h_slider.value;
    // generatePreview(window.preview_name, hPos=h_slider.value, vPos=window.temp_v_val, textAlign=window.text_align, imgSelector="img#edit_preview", font=window.temp_font);
    generatePreview();
};

v_slider.oninput = function() {
    window.certprev_v_val = v_slider.value;
    // generatePreview(window.preview_name, hPos=window.temp_h_val, vPos=v_slider.value, textAlign=window.text_align, imgSelector="img#edit_preview", font=window.temp_font);
    generatePreview();
};

$(function() {
    $('#dropdown-font-f .dropdown-content span').on('click', function() {
        let selected_font = $(this).html();
        $('.selected-font').text(selected_font);
        window.font = selected_font;
        generatePreview()
    });

    $('#dropdown-font-s .dropdown-content span').on('click', function() {
        let selected_size = $(this).html();
        $('.selected-size').text(selected_size);
        window.font_size = selected_size;
        generatePreview()
    });

    $('#text-align-buttons .button').on('click', function() {
        $(this).addClass('is-dark is-selected');
        $(this).siblings().removeClass('is-dark is-selected');
        window.text_align = $(this).html().toLowerCase();
        // generatePreview(window.preview_name, hPos=window.temp_h_val, vPos=window.temp_v_val, textAlign=window.temp_align, imgSelector="img#edit_preview", font=window.temp_font);
        generatePreview();

    });

    $('#font-style-buttons .button').on('click', function() {
        $(this).addClass('is-dark is-selected');
        $(this).siblings().removeClass('is-dark is-selected');
        if ($(this).html().toLowerCase() == 'none') window.font_style = ' ';
        else window.font_style = $(this).html().toLowerCase();
        // generatePreview(window.preview_name, hPos=window.temp_h_val, vPos=window.temp_v_val, textAlign=window.temp_align, imgSelector="img#edit_preview", font=window.temp_font);
        generatePreview()
    });

    $('#apply-edit').on('click', function() {
        // window.certprev_v_val = window.temp_v_val;
        // window.certprev_h_val = window.temp_h_val;
        // window.text_align = window.temp_align;
        // window.font = window.temp_font;
        // window.font_style = window.temp_style
        // generatePreview(window.preview_name, hPos=window.certprev_h_val, vPos=window.certprev_v_val, textAlign=window.text_align, imgSelector="#certificate-thumb img", font=window.font);
        generatePreview();
        $(this).closest('.modal').removeClass('is-active');
    });

    $('#cancel-edit, #edit-certificate .modal-background').on('click', function() {
        window.certprev_h_val = window.temp_h_val;
        window.certprev_v_val = window.temp_v_val;
        window.font = window.temp_font;
        window.text_align = window.temp_align;
        window.font_style = window.temp_style;
        generatePreview();


        $('.selected-font').text(window.font);
        $('#h-slider-placeholder').val(window.certprev_h_val);
        $('#v-slider-placeholder').val(window.certprev_v_val);
        $('#text-align-buttons').find('.is-selected').removeClass('is-dark is-selected');
        $('#font-style-buttons').find('.is-selected').removeClass('is-dark is-selected');

        // TODO, DEBUGGING: window.text_align has bugs wtf
        let align = window.text_align[0].toUpperCase() + window.text_align.slice(1);
        let style = window.font_style[0].toUpperCase() + window.font_style.slice(1);
        $('#text-align-buttons button:contains(' + align + ')').addClass('is-dark is-selected');
        $('#font-style-buttons button:contains(' + style + ')').addClass('is-dark is-selected');
        // v_slider.val = window.certprev_v_val;
        // TODO: selected button for text_align;
    });
});
