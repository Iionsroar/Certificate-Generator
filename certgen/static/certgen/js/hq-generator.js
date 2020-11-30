function generateHQ(name=window.preview_name) {
    // run only when card1 is active
    let $card1 = $('.column .is-4 .card').eq(0);
    if ($card1.hasClass('border-is-dark')) {
        let $canvas_preview = $('canvas#certificate-preview');
        hPos = window.certprev_h_val / 100 * $canvas_preview.attr('width');
        vPos = window.certprev_v_val / 100 * $canvas_preview.attr('height');

        // IDEA: code that scans image using js img library for the thickest space, suitable for adding lines
        let ctx = $("#final-certificate")[0].getContext('2d');
        let template = new Image();
        template.src = $('#template-thumb img').attr('src');

        // TODO: create another function for downloading final certificates, then edit canvas drawing size to the template's
        ctx.clearRect(0, 0, window.templateWidth, window.templateHeight);
        ctx.drawImage(template, 0, 0, window.templateWidth, window.templateHeight);

        ctx.font = 'bold ' + window.font_size + 'px '+ window.font_family;
        ctx.textAlign = window.text_align;
        ctx.fillStyle = window.font_color; 
        ctx.fillText(name, hPos, vPos);
        

        $("#final-modal img").attr('src', $('canvas')[0].toDataURL('image/png', 1)).show();
        // apply changes to edit modal
        $("img#edit_preview").attr('src', $('canvas')[0].toDataURL('image/png', 1));
        $('#certificate-thumb .dropbox').hide();
    };
};