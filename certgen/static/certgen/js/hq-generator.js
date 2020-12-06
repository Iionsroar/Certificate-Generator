let ctx = $('#final-certificate')[0].getContext('2d');
let template = new Image();

function generate(textAlign='center', imgSelector="#certificate-thumb img", font='Merriweather', fontColor='#000000', fontSize='18') {
    $('#names-total').text("" + window.names.length);
    width = window.templateDimension[0];
    height = window.templateDimension[1];
    hPos = window.certprev_h_val;
    vPos = window.certprev_v_val;
    font = window.font_family;
    fontColor = window.font_color;
    //fontSize = window.font_size;
    textAlign = window.text_align;


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
                console.log(fontSize);
                ctx.textAlign = window.text_align;
                ctx.fillStyle = window.font_color;
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


