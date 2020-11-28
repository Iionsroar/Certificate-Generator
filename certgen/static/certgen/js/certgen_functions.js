// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = == 
// TODO: TRY GEN PREVIEW sfunction generatePreview(name, imgSelector="#certificate-thumb img", hPos=50, vPos=62.5, fontSize='18px', font="serif", fontStyle='bold', textAlign='center') {
// function generatePreview(name, hPos=50, vPos=62.5, textAlign='center', imgSelector="#certificate-thumb img", font=window.font) {
// // function generatePreview(name, hPos=50, vPos=62.5, textAlign='center', imgSelector="#certificate-thumb img", font='Merriweather', fontColor='#000000') {
//     // run only when card1 is active
//     let $card1 = $('.column .is-4 .card').eq(0);
//     if ($card1.hasClass('border-is-dark')) {
//         let $canvas_preview = $('canvas#certificate-preview');
//         hPos = hPos / 100 * $canvas_preview.attr('width');
//         vPos = vPos / 100 * $canvas_preview.attr('height');

//         let ctx = $('#certificate-preview')[0].getContext('2d');
//         let template = new Image();
//         template.src = $('#template-thumb img').attr('src');

//         ctx.clearRect(0, 0, 480, 320);
//         ctx.drawImage(template, 0, 0, 480, 320);

//         ctx.font = 'bold 18px '+ font;
//         ctx.textAlign = textAlign;
//         // ctx.fillStyle = fontColor; //DOING NOW
//         ctx.fillText(name, hPos, vPos);
        

//         $(imgSelector).attr('src', $('canvas')[0].toDataURL('image/png', 1)).show();
//         // apply changes to edit modal
//         $("img#edit_preview").attr('src', $('canvas')[0].toDataURL('image/png', 1));
//         $('#certificate-thumb .dropbox').hide();
//     };
// };

function generatePreview(name = window.preview_name) {
    let $card1 = $('.column .is-4 .card').eq(0);
    if ($card1.hasClass('border-is-dark')) {
        let $canvas_preview = $('canvas#certificate-preview');
        hPos = window.certprev_h_val / 100 * $canvas_preview.attr('width');
        vPos = window.certprev_v_val / 100 * $canvas_preview.attr('height');

        let ctx = $('#certificate-preview')[0].getContext('2d');
        let template = new Image();
        template.src = $('#template-thumb img').attr('src');

        ctx.clearRect(0, 0, 480, 320);
        ctx.drawImage(template, 0, 0, 480, 320);

        ctx.font = window.font_style + ' ' + window.font_size + 'px '+ window.font;
        ctx.textAlign = window.text_align;
        ctx.fillStyle = window.font_color; //DOING NOW
        ctx.fillText(name, hPos, vPos);
        

        $("#certificate-thumb img").attr('src', $('canvas')[0].toDataURL('image/png', 1)).show();
        // apply changes to edit modal
        $("img#edit_preview").attr('src', $('canvas')[0].toDataURL('image/png', 1));
        $('#certificate-thumb .dropbox').hide();
    };
};

// TODO
function editsMade() {
    let editsMade = false
    let vars = {certprev_h_val: 240, certprev_v_val: 200, text_align: 'center', font: 'serif'};
    for (let v in vars) {
        console.log('w ' + window[v]);
        console.log('e' + vars[v]);
        if (! (window[v] == vars[v])) {
            editsMade = true;
        }
    }
    return editsMade;
}

function resetTemplate() {
    window.templateURL = "";
    window.templateDimension = ["0", "0"];
}

function setTemplate(src) {
    window.templateURL = src;
    
    const templateImg = new Image();
    templateImg.onload = function() {
        window.templateDimension = [""+this.width, ""+this.height];
        // window.font_size = window.templateDimension[1] / 320 * 18 // Scaling font size on template height
    }
    templateImg.src = src;

}

function addImg(imgObj, src) {
    let $imgObj = imgObj;
    let $card_image = $('#'+$imgObj.attr('data-card-img-id'));
    $imgObj.attr('src', src);
    if (! $imgObj.is(':visible')) $card_image.find('.drop, .delete').toggle();
};

function pushName(name) {
    let nameObj = {"name": name};
    let dropdown_template = $('#dropdown-item-template').html();
    window.names.push(nameObj['name']);

    $('#dropdown-name-items').append(Mustache.render(dropdown_template, nameObj));
    let val = Number($('#names-counter').val());
    $('#names-counter').val(val + 1).trigger('change');
};

function addNames(file) {
    // sheetjs
    if (typeof file.type == "undefined") { // if argument is an array
        window.preview_name = file[0];
        $.each(file, function(i, f) {
            pushName(file[i]);
        });
    } else {
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, {type: 'array'});
            let name;
            let is_first = true;
            window.workbook = workbook;
            for (const [sheetname, sheetvalues] of Object.entries(workbook.Sheets)) {
                for (const [key, value] of Object.entries(sheetvalues)) {
                // for (const [key, value] of Object.entries(workbook.Sheets.Sheet1)) {
                    if(key[0] == '!') {} // skip headers, meta etc.
                    else {
                        if (file.type == "") { // for csv files
                            name = value['v'];
                        } else if (file.type.endsWith('sheet')) { // xlsx files
                            name = (value['w']) ? value['w']:value['v'];
                        }
                        if (is_first) window.preview_name = name;
                        pushName(name);
                        is_first = false;
                    }
                }

            }
            // generatePreview(window.preview_name, hPos=window.certprev_h_val, vPos=window.certprev_v_val);
            generatePreview();
        };
        reader.readAsArrayBuffer(file);
    }
};

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// drop zone
function dropHandler(ev, target) {
    ev.preventDefault();

    let file;
    if (target.id == 'certificate-thumb') {
        // if dropped on names file dropzone
        if (ev.dataTransfer.items) {
            let dropItems = ev.dataTransfer.items;
            for (var i =  dropItems.length - 1; i >= 0; i--) {
                if (dropItems[i].kind === 'file') {
                    file = dropItems[i].getAsFile();
                } else {
                    dropItem = dropItem[i];
                    file = dropItem;
                };
                addNames(file);
            };
        };

    } else {
        // if dropped on template dropzone
        if (ev.dataTransfer.items) {
            let dropItem = ev.dataTransfer.items[0];
            if (dropItem.kind === 'file') {
                file = dropItem.getAsFile();
            } else {
                dropItem = ev.dataTransfer.files[0];
                file = dropItem; // not sure if this works
            }
            $('#paste-template').val('');
            let $dropPreview = $('#'+target.id + ' figure img');
            setTemplate(URL.createObjectURL(file)); // NEW
            addImg($dropPreview, URL.createObjectURL(file));
        }
    };

};

function dragOverHandler(ev) {
  ev.preventDefault();
};
