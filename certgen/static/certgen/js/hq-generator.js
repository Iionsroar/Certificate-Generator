let ctx = $('#final-certificate')[0].getContext('2d');
let template = new Image();

function generate(textAlign='center', imgSelector="#certificate-thumb img", font=window.font_family, fontColor=window.font_color, fontSize=window.font_size) {
    $('#names-total').text("" + window.names.length);
    //let ctx = $('#final-certificate')[0].getContext('2d');
    //let template = new Image();
    width = window.templateDimension[0];
    height = window.templateDimension[1];
    hPos = window.certprev_h_val
    vPos = window.certprev_v_val

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [width, height]
    });

    $('canvas#final-certificate').attr("width", width);
    $('canvas#final-certificate').attr("height", height);

    let $card1 = $('.column .is-4 .card').eq(0);
    if ($card1.hasClass('border-is-dark')) {
        let $canvas = $('canvas#final-certificate');
        hPos = hPos / 100 * $canvas.attr('width');
        vPos = vPos / 100 * $canvas.attr('height');
        template.src = window.templateURL;

        for (let i = 0; i < window.names.length; i++) {
            setTimeout(function() { $('#page-num').text(i + 1) }, 0);
            setTimeout(function() {
                // ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
                ctx.drawImage(template, 0, 0, width, height);

                ctx.font = 'bold ' + window.font_size + 'px '+ window.font_family;
                ctx.textAlign = window.text_align;
                ctx.fillText(window.names[i], hPos, vPos);
                
                doc.addImage($('canvas')[1].toDataURL('image/jpeg', 1), "JPEG", 0, 0, width, height);
                doc.addPage();
            }, 0);
        }
    };
    setTimeout(function() {
        doc.save("sample.pdf")
        $('#loader-modal').removeClass('is-active');
    }, 1);
};


