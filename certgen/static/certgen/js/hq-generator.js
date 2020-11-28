// OPTIMIZING {CANVAS} JSPDF
// https://stackoverflow.com/questions/11150779/redrawing-html5-canvas-incredibly-slow
// https://jsfiddle.net/zHpgV/4/
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Optimizing_canvas
// https://stackoverflow.com/questions/9558895/html5-canvas-slows-down-with-each-stroke-and-clear
// https://stackoverflow.com/questions/14012768/html5-canvas-background-image



// JS FREEZE ON LOOP
// https://stackoverflow.com/questions/10312963/difference-between-settimeout-with-and-without-quotes-and-parentheses
// https://stackoverflow.com/questions/48736331/by-using-javascript-recursive-settimeout-function-is-it-risky-to-get-the-stacko/48736375
// https://www.google.com/search?client=firefox-b-d&q=settimout+does+not+execute+lines
// https://stackoverflow.com/questions/36110507/javascript-settimeout-not-executing
// https://stackoverflow.com/questions/24928846/get-return-value-from-settimeout
// https://stackoverflow.com/questions/5226285/settimeout-in-for-loop-does-not-print-consecutive-values



// JS FREEZES BROWSER
// https://stackoverflow.com/questions/46446239/javascript-loop-freezes-browser-and-cant-see-change-before-loop
// https://stackoverflow.com/questions/13546493/how-to-avoid-freezing-the-browser-when-doing-long-running-computations-in-javasc
// https://stackoverflow.com/questions/10344498/best-way-to-iterate-over-an-array-without-blocking-the-ui/10344560#10344560

// http://debuggable.com/posts/run-intense-js-without-freezing-the-browser:480f4dd6-f864-4f72-ae16-41cccbdd56cb
let ctx = $('#final-certificate')[0].getContext('2d');
let template = new Image();

function generate(textAlign='center', imgSelector="#certificate-thumb img", font=window.font) {
    $('#names-total').text("" + window.names.length);

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

        template.onload = function () {
            for (let i = 0; i < window.names.length; i++) {
                setTimeout(function() { $('#page-num').text(i + 1) }, 0);
                setTimeout(function() {
                    // ctx.clearRect(0, 0, $canvas.width(), $canvas.height());
                    ctx.drawImage(template, 0, 0, width, height);

                    ctx.font = window.font_style + ' ' + (window.templateDimension[1] / 320 * window.font_size) + 'px '+ window.font;
                    ctx.textAlign = window.text_align;
                    ctx.fillStyle = window.font_color;
                    ctx.fillText(window.names[i], hPos, vPos);
                    
                    doc.addImage($('canvas')[1].toDataURL('image/jpeg', 1), "JPEG", 0, 0, width, height);
                    doc.addPage();
                }, 0);
            }
        }
    };
    setTimeout(function() {
        doc.save("sample.pdf")
        $('#loader-modal').removeClass('is-active');
    }, window.names.length * 100);
};


