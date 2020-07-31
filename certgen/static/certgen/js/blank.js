$(function() {
    // form field ids
    let input_ids = ['weeks', 'hours', 'learning_outcomes',
        'topics', 'activities', 'assessment'];

    function formIsTotallyEmpty(formID) {
        let $form = $('#'+formID);
        let formIsTotallyEmpty = true;
        $.each($form.children(), function(i, form_div) {
            val = $.trim($form.children().eq(i).find('.input, .textarea').val());
            if (val) formIsTotallyEmpty = false;
        });
        return formIsTotallyEmpty;
    };

    function formIsComplete(formID) {
        let $form = $('#'+formID);
        let formIsComplete = true;
        $.each($form.children(), function(i, form_div) {
            val = $.trim($form.children().eq(i).find('.input, .textarea').val());
            if (val) formIsTotallyEmpty = false;
        });
    };

    function cleanInputs() {
        // maybe edit this to take in form IDs
        $.each(input_ids, function(i, input_id) {
            $('#'+input_id).val('');
        });
    };
});
