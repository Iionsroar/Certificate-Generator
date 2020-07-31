let v_slider = document.getElementById('v-slider-placeholder');
let h_slider = document.getElementById('h-slider-placeholder');

h_slider.oninput = function() {
    let h_val = (h_slider.value / 100) * 480;
    window.h_val = h_val;
    generatePreview(window.preview_name, imgSelector="img#edit_preview", vPos=window.v_val, hPos=h_val);
};

v_slider.oninput = function() {
    let v_val = (v_slider.value / 100) * 320;
    window.v_val = v_val;
    generatePreview(window.preview_name, imgSelector="img#edit_preview", vPos=v_val, hPos=window.h_val);
};

