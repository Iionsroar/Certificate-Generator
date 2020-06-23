// drop zone
function dropHandler(ev) {
    // maybe youll do a different function for handling file drops
    ev.preventDefault();

    let file;
    if (ev.dataTransfer.items) {
        let dropItem = ev.dataTransfer.items[0];
        if (dropItem.kind === 'file') {
            file = dropItem.getAsFile();
            let $dropPreview = $('img.drop');
            $dropPreview.attr('src', URL.createObjectURL(file));
            if (! $dropPreview.is(':visible')) {
                $('.drop').toggle();
                $('.delete').toggle(); // edit to differentiate bet two cards
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
