// drop zone
function dropHandler(ev, target) {
    // maybe youll do a different function for handling file drops
    ev.preventDefault();

    let file;
    if (ev.dataTransfer.items) {
        let dropItem = ev.dataTransfer.items[0];
        if (dropItem.kind === 'file') {
            file = dropItem.getAsFile();
            let $dropPreview = $('#'+target.id + ' figure img');
            $dropPreview.attr('src', URL.createObjectURL(file));
            if (! $dropPreview.is(':visible')) {
                $('#'+target.id).find('.tag').hide();
                $('#'+target.id + ' img.drop').css('cursor', 'pointer');
                $('#'+target.id + ' .drop').toggle();
                $('#'+target.id + ' .delete').toggle(); // edit to differentiate bet two cards
            }
        } else {
            dropItem = ev.dataTransfer.files[0];
            file = dropItem; // not sure if this works
        }
    }

};

function dragOverHandler(ev) {
  ev.preventDefault();
};

$(function() {
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
        let $card_image = $('#' + $(this).attr('data-card-img-id'));
        let $img = $card_image.find('img.drop');

        $(this).toggle();
        $img.attr('src', '').toggle();
        $card_image.find('.tag').show();
        $card_image.find('div.drop').toggle();
    });


    // =   =   =   =   =   =   =   =   =    =   =   =
    $('.drop-zone').hover(function () {
        if ($(this).find('img.drop').is(':visible') ) {
            $(this).find('.tag').fadeOut(100);
        };
    }, function () {
        if ($(this).find('img.drop').is(':visible') ) {
            $(this).find('.tag').fadeIn(100);
        }
    });

});
