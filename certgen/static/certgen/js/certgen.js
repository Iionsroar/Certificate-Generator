window.addEventListener('dragover', function(e) {
    e = e || event;
    e.preventDefault();
}, false);

window.addEventListener('drop', function(e) {
    e = e || event;
    e.preventDefault();
}, false);

function generatePreview(name, font="serif") {
    let ctx = $('#certificate-preview')[0].getContext('2d');
    let template = new Image();
    template.src = $('#template-thumb img').attr('src');

    // TODO: change canvas drawing size to the template's
    ctx.clearRect(0, 0, 480, 320);
    ctx.drawImage(template, 0, 0, 480, 320);

    ctx.font = 'bold 18px Merriweather';
    ctx.textAlign = 'center';
    ctx.fillText(name, 240, 200);

    $('#certificate-thumb img').attr('src', $('canvas')[0].toDataURL('image/png', 1)).show();
    $('#certificate-thumb .dropbox').hide();

};

function addImg(imgObj, src) {
    let $imgObj = imgObj;
    let $card_image = $('#'+$imgObj.attr('data-card-img-id'));
    $imgObj.attr('src', src);
    if (! $imgObj.is(':visible')) {
        // TO DELETE WHEN FINALIZED $card_image.find('.tag').hide().delay(250).fadeIn();
        $card_image.find('.drop, .delete').toggle();
    }
}


let names = [];
function pushName(name) {
    let nameObj = {"name": name};
    let dropdown_template = $('#dropdown-item-template').html();
    names.push(nameObj['name']);

    $('#dropdown-name-items').append(Mustache.render(dropdown_template, nameObj));
    let val = Number($('#names-counter').val());
    $('#names-counter').val(val + 1).trigger('change');
}

let preview_name;
function addNames(file) {
    // sheetjs
    if (! file.type) { // if argument is an array
        preview_name = file[0];
        $.each(file, function(i, f) {
            pushName(file[i]);
        });
    } else {
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, {type: 'array'});
            let name;
            if (file.type.endsWith('ms-excel')) {
                // csv files
                // TODO: get first name in file and store to the var preview_name
                for (const [key, value] of Object.entries(workbook.Sheets.Sheet1)) {
                    if (value['w']) {
                        pushName(value['w'])
                    } else {
                        pushName(value['v']);
                    };
                }
            } else if (file.type.endsWith('sheet')) {
                // xlsx files
                for (name of workbook.Strings) {
                    pushName(name['t']);
                }
            };
        }
        reader.readAsArrayBuffer(file);
    };
    generatePreview(preview_name);
};


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
            addImg($dropPreview, URL.createObjectURL(file));
        }
    };

};

function dragOverHandler(ev) {
  ev.preventDefault();
};

$(function() {
    // previewing images using modals
    $('figure img').click(function() {
        let modal_id = $(this).attr('data-modal-id');
        let img_src = $(this).attr('src');
        $('#'+modal_id+' img').attr('src', img_src);
        $('#'+modal_id).addClass('is-active');
        $('html').toggleClass('is-clipped');
    });

    $('.modal-close, .modal-background').click(function() {
        let modal_id = $(this).attr('data-modal-id');
        $('#'+modal_id).removeClass('is-active');
    });

    // =   =   =   =   =   =   =   =   =    =   =   =
    // toggle border color to indicate if content is uploaded
    function switchContentState(object) {
        let $card = object.closest('.card');
        let $card_content = $card.find('.card-content');
        $card.toggleClass('border-is-dark border-is-mint')
        $card_content.toggleClass('border-is-dark border-is-mint')
        $card.find('span.lbl').toggleClass('is-dark is-mint');
        $card.find('.dropdown').toggleClass('is-hidden');
    }
    // removing uploaded files
    $('.card').delegate('.remove-content', 'click',  function() {
        if ($(this).attr('data-type-to-remove') == 'img') {
            let $card_image = $('#' + $(this).attr('data-card-img-id'));
            let $img = $card_image.find('img.drop');

            $(this).toggle(); // TODO: maybe turn this to hide, make universal, same as border-color
            $img.attr('src', '').toggle();
            $card_image.find('.tag').show();
            $card_image.find('div.drop').toggle();

            // SOLVE: div.dropbox for second card not showing
            // let $cards = $('.card');
            // $cards.find('img.drop').attr('src', '').toggle();
            // $cards.find('.tag').show();
            // $cards.find('div.drop').toggle();

            switchContentState($(this));

        } else if ($(this).attr('data-type-to-remove') == 'name') {
            let $item = $(this).closest('.dropdown-item');
            let name_index = $item.index();
            names.splice(name_index, 1);

            let val = Number($('#names-counter').val());
            $('#names-counter').val(val - 1).trigger('change');

            $item.remove();
        }
    });
    // removing upperleft tags when hovering over preview thumbnails
    $('.drop-zone').hover(function () {
        if ($(this).find('img.drop').is(':visible') ) {
            $(this).find('.tag.lbl').fadeOut(100);
        };
    }, function () {
        if ($(this).find('img.drop').is(':visible') ) {
            $(this).find('.tag.lbl').fadeIn(100);
        }
    });
    // = = = = = = = = = = = = = = = = = = = = = = = =
    // img loading src
    let $img_template = $('#template-thumb img');
    $img_template.on('load', function() {
        let $card = $(this).closest('.card');
        let src = $(this).attr('src');
        if (src && $card.hasClass('border-is-mint')) {
            switchContentState($(this));
        } else if (! src && $card.hasClass('border-is-dark')) {
            switchContentState($(this));
        };

        let $card1 = $('.card').eq(0);
        let $card2 = $('.card').eq(1);
        if ($card1.hasClass('border-is-dark') && $card2.hasClass('border-is-dark')) generatePreview(preview_name);
    });
    // img error    TODO: change selector to variable
    $('img.drop').on('error', function() {
        $link_template.val('');

        let $card = $(this).closest('.card');
        let $card_image = $('#' + $(this).attr('data-card-img-id'));
        $(this).removeAttr('src');
        $(this).hide();
        $card_image.find('.remove-content').hide();
        $card_image.find('.tag').show();
        $card_image.find('div.drop').show();

        let $img = $(this);
        if ($card.hasClass('border-is-dark')) switchContentState($img);
    });

    // handling template files
    let $upload_template = $('#upload-template');
    let $link_template = $('#paste-template');
    $upload_template.change(function() {
        $link_template.val('');

        const file = this.files[0];
        let card_image_id = $(this).attr('data-card-img-id');

        let $dropPreview = $('#'+card_image_id + ' figure img');
        addImg($dropPreview, URL.createObjectURL(file));
    });

    $link_template.change(function() {
        let card_image_id = $(this).attr('data-card-img-id');
        let $dropPreview = $('#'+card_image_id + ' figure img');
        addImg($dropPreview, $(this).val());
    });


    // handling namesfile
    let $upload_namesfile = $('#upload-namesfile');
    let $paste_names = $('#paste-names');
    $upload_namesfile.change(function() {
        const fileList = this.files;
        $.each(fileList, function(i, file) {
            addNames(fileList[i]);
        });
            // idea for notifying user of successful file upload:
            // 1 hide the dragzone box
    });

    $paste_names.change(function() {
        let names = $(this).val().match(/(\w[a-zA-Z .]*\w?[.]?)/g);
        addNames(names);

        $(this).val('added!');
        setTimeout(function() {
            $paste_names.val('');
        }, 1000);
    });

    // dropdown names
    $('.card').delegate('#names-counter', 'change', function() {
        let $card = $(this).closest('.card');
        if ($card.hasClass('border-is-mint') && Number($(this).val())) {
            switchContentState($(this));
        } else if ($card.hasClass('border-is-dark') && ! Number($(this).val())) {
            switchContentState($(this));
        }
    });

    // observes content changes, shows generate button & preview of certificate w/ name
    const card1 = document.getElementsByClassName('card')[0];
    const card2 = document.getElementsByClassName('card')[1];
    const changes = {attributes: true};
    const callback = function(mutation_list, observer) {
        for (let mutation of mutation_list) {
            if (mutation.type === 'attributes') {
                let $card1 = $('.card').eq(0);
                let $card2 = $('.card').eq(1);
                if ($card1.hasClass('border-is-dark') && $card2.hasClass('border-is-dark')) {
                    $('#generate').removeClass('is-hidden');
                    generatePreview(preview_name);
                    // IDEA: also add a circular edit button at lower right that allows user to edit the font and vertical placeholder
                } else {
                    $('#generate').addClass('is-hidden');
                    // TODO: remove certificate preview, issues with div.drop of 2nd card
                    // $card2.find('figure img').attr('src', '').hide();
                    // $card2.find('div.drop').show();
                };
            };
        };
    };
    const content_observer = new MutationObserver(callback);
    content_observer.observe(card1, changes);
    content_observer.observe(card2, changes);
    content_observer.observe($('#template-thumb img')[0], changes);

});
