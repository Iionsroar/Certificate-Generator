$(function () {

    let defaultPanel = $('.tabs ul li.is-active').attr('rel');
    $('.' + defaultPanel).addClass('la-active');
    $('.tabs ul li').click(function () {
        var panelToShow = $(this).attr('rel');
        // alert(panelToShow);
        $('.tabs ul li.is-active').removeClass('is-active');
        $(this).addClass('is-active');

        $('.'+panelToShow).addClass('la-active');
        $('.'+panelToShow).siblings().removeClass('la-active');
    })

    // ===== IMAGE SLIDER =====
    //configuration
    var width = 720;
    var animatedSpeed = 1000;
    var pause = 1500;
    var currentSlide = 1;
    // cache DOM
    var $slider = $('#slider');
    var $slideContainer = $slider.find('.slides');
    var $slides = $slideContainer.find('.slide');

    var interval;
    function startSlider() {
        interval = setInterval(function() {
            $slideContainer.animate({'margin-left': '-='+width}, animatedSpeed, function () {
                currentSlide++;
                if (currentSlide === $slides.length) {
                    currentSlide = 1;
                    $slideContainer.css('margin-left', '0px');
                }
            })
        }, pause)
    }

    function stopSlider() {
        clearInterval(interval);
    }

    $slider.mouseenter(stopSlider).mouseleave(startSlider);

    startSlider();

    // ===== AJAX =====
    // ajax setup
    function getCookie(name) {
        // acquiring token, see https://docs.djangoproject.com/en/3.0/ref/csrf/
        var cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };
    $.ajaxSetup({
        // see setting token on ajax request: https://docs.djangoproject.com/en/3.0/ref/csrf/
        headers: { "X-CSRFToken": getCookie("csrftoken") }
    });

    // search for other tools like mustache js for templating
    // since jinja is overriding mustache's
    var orderTemplate = "" +
    "<li data-id='{{id}}'>" +
        "<strong>Name: </strong>" +
        "<span class='no-edit name'>{{name}}</span>" +
        "<input type='text' class='edit name'>" +
        "&emsp;<button class='delete is-medium' data-id='{{id}}'></button>" +

        "<p><strong>Meal: </strong>" +
        "<span class='no-edit meal'>{{meal}}</span>" +
        "<input type='text' class='edit meal'></p>" +

        "<button class='edit-order no-edit button is-dark is-small'>Edit</button>&emsp;" +
        "<button class='save-edit edit button is-dark is-small'>Save</button>&emsp;" +
        "<button class='cancel-edit edit button is-dark is-small'>Cancel</button>" +
        "<br><br>" +
    "</li>";

    function addOrder(order) {
        $orders.append(Mustache.render(orderTemplate, order));
    };

    $orders = $('#orders');
    $.ajax({
        type: 'GET',
        url: '/learning_api/orders/',
        success: function (orders) {
            $.each(orders, function (i, order) {
                addOrder(order);
            })
        },
        error: function () {
            alert('error loading orders');
        }
    });


    var $name = $('#name');
    var $meal = $('#meal');

    $('#add-order').click(function () {
        var order = {
            "name": $name.val(),
            "meal": $meal.val(),
        };


        $.ajax({
            type: 'POST',
            url: '/learning_api/orders/',
            data: order,
            success: function (newOrder) {
                addOrder(newOrder);
            },
            error: function () {
                alert('error saving order');
            }
        });
    })

    // i dont understand delegate v much does but it is said that it
    // prepares the page, loads the code that is generated/ added
    // by an ajax - since the code that the thing below targets
    // is not originally written in the original html
    $orders.delegate('.delete', 'click', function () {
        $li = $(this).closest('li');
        $.ajax({
            type: 'DELETE',
            url: '/learning_api/orders/' + $(this).attr('data-id') + '/',
            success: function () {
                $li.fadeOut(300, function () {
                    $(this).remove();
                });
            },
            error: function () {
                alert('error deleting order');
            }
        });
    })

    // EDIT feature
    $orders.delegate('.edit-order', 'click', function () {
        $li = $(this).closest('li');
        $li.find('input.name').val( $li.find('span.name').html() );
        $li.find('input.meal').val( $li.find('span.meal').html() );
        $li.addClass('edit');
    })

    $orders.delegate('.cancel-edit', 'click', function () {
        $(this).closest('li').removeClass('edit');
    })

    $orders.delegate('.save-edit', 'click', function () {
        $li = $(this).closest('li');
        var order = {
            name: $li.find('input.name').val(),
            meal: $li.find('input.meal').val()
        };

        $.ajax({
            type: 'PUT',
            url: '/learning_api/orders/' + $li.attr('data-id') + '/',
            data: order,
            success: function () {
                $li.find('span.name').html( order.name );
                $li.find('span.meal').html( order.meal );
                $li.removeClass('edit');
            },
            error: function (sample) {
                alert('error updating order');
            }
        });
    })


    // $('#drop-zone').dropzone({url: 'https://httpbin.org/post'});

})


let names = "janus, eurytion, geryon, briares";
// LEANING FILE APIs
// https://developer.mozilla.org/en-US/docs/Web/API/File
// https://developer.mozilla.org/en-US/docs/Web/API/FileReader
// https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications
function dropHandler(ev) {
  // reference: https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop
  console.log('File(s) dropped');
  ev.preventDefault();

  if (ev.dataTransfer.items) {
    dropItem = ev.dataTransfer.items[0];

    if (dropItem.kind === 'file') {
      var file = dropItem.getAsFile();
      console.log('... file[' + 0 + '].name = ' + file.name);
      let $dropPreview = $('img.dropImg')
      // ajax
      // $(function () {
      //   let certificate_details = {
      //     certificate_name: file.name,
      //     // template_img: file, // wonder if thisll work
      //     template_url: 'http://127.0.0.1:8000/user_uploads/certificate_templates/certificate_template_2.png',
      //     names_csv: names
      //   };

      //   let $dropPreview = $('img.dropImg')
      //   $.ajax({
      //     type: 'POST',
      //     url: '/learning_api/certificates/',
      //     data: certificate_details,
      //     success: function () {
      //       alert('success');
      //       // TODO & TO TEST
      //       // display image on div box
      //          $dropPreview.attr('src', URL.createObjectURL(file)); // reference: https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications#Example_Using_object_URLs_to_display_images
      //          $('.dropImg').toggle();
      //     },
      //     error: function () {
      //       alert('error loading image');
      //     }
      //   });
      // });

    }
  } else {
    dropItem = ev.dataTransfer.files[0];
    console.log('... file[' + 0 + '].name = ' + dropItem.name);
  }
};

function dragOverHandler(ev) {
  console.log('File in drop zone');

  ev.preventDefault();
};
