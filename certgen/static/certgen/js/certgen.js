window.addEventListener('dragover', function(e) {
    e = e || event;
    e.preventDefault();
}, false);

window.addEventListener('drop', function(e) {
    e = e || event;
    e.preventDefault();
}, false);

function addImg(imgObj, src) {
    let $imgObj = imgObj;
    let $card_image = $('#'+$imgObj.attr('data-card-img-id'));
    $imgObj.attr('src', src);
    if (! $imgObj.is(':visible')) {
        $imgObj.css('cursor', 'pointer');
        $card_image.find('.tag').hide();
        $card_image.find('.drop, .delete').toggle();
    }
}

let names = [];

function pushName(name) {
    let nameObj = {"name": name};
    let dropdown_template = $('#dropdown-item-template').html();
    names.push(nameObj['name']);
    $('#dropdown-name-items').append(Mustache.render(dropdown_template, nameObj));
}

function addNames(file) {
    // TODO: render a preview thumbnail using the first name in the file as sample
    // sheetjs
    if (! file.type) { // if argument is an array instead
        $.each(file, function(i, f) {
            // names.push(file[i]);
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
};


// drop zone
function dropHandler(ev, target) {
    // maybe youll do a different function for handling file drops
    ev.preventDefault();

    let file;
    if (target.id == 'certificate-thumb') {
        // if dragged on file dropzone
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
        // if dragged on template dropzone
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
    $('img.drop').click(function() {
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
    // removing uploaded files
    $('.remove-file').click(function() {
        if ($(this).attr('data-type-to-remove') == 'img') {
            let $card_image = $('#' + $(this).attr('data-card-img-id'));
            let $img = $card_image.find('img.drop');

            $(this).toggle(); // TODO: maybe turn this to hide, make universal, same as border-color
            $img.attr('src', '').toggle();
            $card_image.find('.tag').show();
            $card_image.find('div.drop').toggle();

            let $card_tag = $(this).parent().prev().find('span')
            $(this).closest('.card').removeClass('border-is-dark').addClass('border-is-mint');
            $card_tag.removeClass('is-dark').addClass('is-mint'); // change tag color

        } else {
            // TODO
        }
    });


    // removing upperleft tags when hovering over preview thumbnails
    $('.drop-zone').hover(function () {
        if ($(this).find('img.drop').is(':visible') ) {
            $(this).find('.tag').fadeOut(100);
        };
    }, function () {
        if ($(this).find('img.drop').is(':visible') ) {
            $(this).find('.tag').fadeIn(100);
        }
    });

    // handling template files
    let $img_template = $('#template-thumb img');
    let $upload_template = $('#upload-template');
    let $link_template = $('#paste-template');

    $img_template.load(function() {
        if ($(this).attr('src')) {
            let $card_tag = $(this).parent().next().find('span')
            $(this).closest('.card').removeClass('border-is-mint').addClass('border-is-dark');
            $card_tag.removeClass('is-mint').addClass('is-dark'); // change tag color
        };
    });

    // TODO: change selector to variable
    $('img.drop').error(function() {
        $link_template.val('');

        let $card_image = $('#' + $(this).attr('data-card-img-id'));
        $(this).hide();
        $card_image.find('.remove-file').hide();
        $card_image.find('.tag').show();
        $card_image.find('div.drop').show();
    });

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

        // TODO: when namesfile is uploaded:
            // 1 if template is already uploaded:
                // - automatically generate a preview using the first name it gets
                // and the template uploaded
            // 2 else:
                // - wait for the template to get uploaded before generating


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

        // TODO: a way to delete inputted names
        console.log(names);
    })

});
