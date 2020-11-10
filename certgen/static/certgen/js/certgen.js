let names = [];
let $card1 = $('.column .is-4 .card').eq(0);
let $card2 = $('.column .is-4 .card').eq(1);

window.certprev_h_val = 50;
window.certprev_v_val = 62.5;
window.text_align = 'center';
window.font_style = 'bold';
window.font_size = 18;
window.font = 'Merriweather';
//window.fontColor = '#000000';

$(function() {
    // previewing images using modal
    $('figure img').click(function() {
        let modal_id = $(this).attr('data-modal-id');
        let img_src = $(this).attr('src');
        $('#'+modal_id+' img').attr('src', img_src);
        $('#'+modal_id).addClass('is-active');
        $('html').toggleClass('is-clipped');
    });

    // positioning names/ placeholder using modal
    $('#btn-edit-cert').click(function() {
        let modal_id = $(this).attr('data-modal-id');
        $('#'+modal_id).addClass('is-active');
        generatePreview(window.preview_name, hPos=window.certprev_h_val, vPos=window.certprev_v_val, textAlign=window.text_align);
    });

    $('.modal-close, .modal-background, .confirm-cancel, .confirm-yes, .cancel-edit').click(function() {
        let $modal = $(this).closest('.modal');
        if ($modal.attr('id') == 'edit-certificate' || $(this).hasClass('cancel-edit')) {
            let edits_made = false; // TODO: add function for detecting changes in certificate defaults
            if (edits_made) {
                $('#prompt-discard').addClass('is-active');
            } else {
                $modal.removeClass('is-active')
            };
        } else {
            if ($(this).hasClass('confirm-yes')) $modal.prev().removeClass('is-active');
            $modal.removeClass('is-active');
        };
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

    // toggle border color to indicate if content is uploaded
    function switchContentState(object) {
        let $card = object.closest('.card');
        let $card_content = $card.find('.card-content');
        $card.toggleClass('border-is-dark border-is-mint');
        $card_content.toggleClass('border-is-dark border-is-mint');
        $card.find('.tag.lbl').toggleClass('is-dark is-mint');
        if (names.length) {
            $card.find('.dropdown').removeClass('is-hidden');
        } else {
            $card.find('.dropdown').addClass('is-hidden');
        };
    };
    // =   =   =   =   =   =   =   =   =    =   =   =
    // removing uploaded files
    $('.card').delegate('.remove-content', 'click',  function() {
        if ($(this).attr('data-type-to-remove') == 'img') {
            let $card_image = $('#' + $(this).attr('data-card-img-id'));
            let $img = $card_image.find('img.drop');

            $(this).toggle();
            $img.attr('src', '').toggle();
            $card_image.find('.tag').show();
            $card_image.find('div.drop').toggle();

            $('#upload-template').val('');
            if ($card2.hasClass('border-is-dark')) {
                $card2.find('img').attr('src', '').hide();
                $card2.find('.dropbox').show();
            };

            switchContentState($(this));

        } else if ($(this).attr('data-type-to-remove') == 'name') {
            let $item = $(this).closest('.dropdown-item');
            let $card = $item.closest('.card');
            let name_index = $item.index();
            names.splice(name_index, 1);
            window.preview_name = names[0];

            let val = Number($('#names-counter').val());
            $('#names-counter').val(val - 1).trigger('change');

            $item.remove();
            if (names.length) {
                generatePreview(window.preview_name, hPos=window.certprev_h_val, vPos=window.certprev_v_val, textAlign=window.text_align);
            } else {
                $card.find('.tag.lbl').show();
            };
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

        if ($card1.hasClass('border-is-dark') && $card2.hasClass('border-is-dark')) {
            generatePreview(window.preview_name, hPos=window.certprev_h_val, vPos=window.certprev_v_val);
        };
    });
    // img error handler
    $('#template-thumb img.drop').on('error', function() {
        $link_template.val('');

        let $card = $(this).closest('.card');
        let $card_image = $('#' + $(this).attr('data-card-img-id'));
        $(this).removeAttr('src');
        $(this).hide();
        $card_image.find('#template-thumb .remove-content').hide();
        $card_image.find('.tag').show();
        $card_image.find('div.drop').show();

        let $img = $(this);
        if ($card.hasClass('border-is-dark')) switchContentState($img);
    });

    // img template upload
    let $upload_template = $('#upload-template');
    $upload_template.change(function() {
        $link_template.val('');

        const file = this.files[0];
        let card_image_id = $(this).attr('data-card-img-id');

        let $dropPreview = $('#'+card_image_id + ' figure img');
        addImg($dropPreview, URL.createObjectURL(file));
    });

    // img link upload
    let $link_template = $('#paste-template');
    $link_template.change(function() {
        let card_image_id = $(this).attr('data-card-img-id');
        let $dropPreview = $('#'+card_image_id + ' figure img');
        addImg($dropPreview, $(this).val());
    });

    // = = = = = = = = = = = = = = = = = = = = = = = =
    // namesfile uplaod
    let $upload_namesfile = $('#upload-namesfile');
    $upload_namesfile.change(function() {
        const fileList = this.files;
        window.fileList = fileList;
        $.each(fileList, function(i, file) {
            addNames(fileList[i]);
        });
        $(this).val('');
            // idea for notifying user of successful file upload:
    });

    // names input
    let $paste_names = $('#paste-names');
    $paste_names.change(function() {
        let names = $(this).val().match(/(\w[a-zA-Z .]*\w?[.]?)/g);
        addNames(names);
        generatePreview(window.preview_name, hPos=window.certprev_h_val, vPos=window.certprev_v_val);

        $(this).val('added!');
        setTimeout(function() {
            $paste_names.val('');
        }, 1000);
    });

    // = = = = = = = = = = = = = = = = = = = = = = = = =
    // dropdown names
    $('.card').delegate('#names-counter', 'change', function() {
        let $card = $(this).closest('.card');
        if ($card.hasClass('border-is-mint') && Number($(this).val())) {
            switchContentState($(this));
        } else if ($card.hasClass('border-is-dark') && ! Number($(this).val())) {
            switchContentState($(this));
            $card.find('img.drop').attr('src', '').hide();
            $card.find('.dropbox').show();
        };
    });

    // previewing names from dropdown list
    $('.card').delegate('#dropdown-names .dropdown-item span', 'click',  function() {
        let name = $(this).html();
        window.preview_name = name;
        generatePreview(window.preview_name, hPos=window.certprev_h_val, vPos=window.certprev_v_val, textAlign=window.text_align);
    });

    // = = = = = = = = = = = = = = = = = = = = = = = = =
    // observes content changes, shows generate button & preview of certificate w/ name
    const card1 = document.getElementsByClassName('main-card')[0];
    const card2 = document.getElementsByClassName('main-card')[1];
    const changes = {attributes: true};
    const callback = function(mutation_list, observer) {
        for (let mutation of mutation_list) {
            if (mutation.type === 'attributes') {
                if ($card1.hasClass('border-is-dark') && $card2.hasClass('border-is-dark')) {
                    $('#generate').removeClass('is-hidden');
                    $('#btn-edit-cert').removeClass('is-hidden');
                    $('#edit-certificate.modal').addClass('is-active');
                    // IDEA: also add a circular edit button at lower right that allows user to edit the font and vertical placeholder
                } else {
                    $('#generate').addClass('is-hidden');
                    $('#btn-edit-cert').addClass('is-hidden');
                };
            };
        };
    };
    const content_observer = new MutationObserver(callback);
    content_observer.observe(card1, changes);
    content_observer.observe(card2, changes);
    content_observer.observe($('#template-thumb img')[0], changes);

    // TODO: clicking generate button triggers the placeholder modal of editing certificate
});
