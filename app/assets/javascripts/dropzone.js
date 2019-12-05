$(document).on('turbolinks:load', function(){
  var dropzone = $('.dropzone-area');
  var dropzone2 = $('.dropzone-area2');
  var dropzone_box = $('.dropzone-box');
  var images = [];
  var inputs  =[];
  var input_area = $('.input_area');
  var preview = $('#preview');
  var preview2 = $('#preview2');

  $(document).on('change', 'input[type= "file"].upload-image',function(event) {
    var file = $(this).prop('files')[0];
    var reader = new FileReader();
    inputs.push($(this));
    var img = $(`<div class= "img_view"><img></div>`);
    reader.onload = function(e) {
      var btn_wrapper = $('<div class="btn_wrapper"><div class="btn delete">削除</div></div>');
      img.append(btn_wrapper);
      img.find('img').attr({
        src: e.target.result
      })
    }
    reader.readAsDataURL(file);
    images.push(img);

    if(images.length >= 5) {
      dropzone2.css({
        'display': 'block'
      })
      dropzone.css({
        'display': 'none'
      })
      $.each(images, function(index, image) {
        $(image).attr('data-image', index);
        preview2.append(image);
        dropzone2.css({
          'width': `calc(100% - (124px * ${images.length - 5}))`
        })
      })
      if(images.length == 9) {
        dropzone2.find('p').replaceWith('<i class="fa fa-camera image-input-icon"></i>')
      }
    } else {
        dropzone2.css({
          'display': 'none'
        });
        dropzone.css({
          'display': 'block'
        });
        $('#preview').empty();
        $.each(images, function(index, image) {
          $(image).attr('data-image', index);
          preview.append(image);
        })
        dropzone.css({
          'width': `calc(100% - (124px * ${images.length}))`
        })
      }
      if(images.length == 4) {
        dropzone.find('p').replaceWith('<i class="fa fa-camera image-input-icon"></i>')
      }
    if(images.length == 10) {
      dropzone2.css({
        'display': 'none'
      })
      return;
    }
    var new_image = $(`<input multiple= "multiple" name="images[image][]" class="upload-image" data-image= ${images.length} type="file" id="upload-image">`);
    input_area.prepend(new_image);
  });

  $(document).on('click', '.delete', function() {
    var target_image = $(this).parent().parent();
    $.each(inputs, function(index, input){
      if ($(input).data('image') == target_image.data('image')){
        $(input).remove();
        target_image.remove();
        var num = $(this).data('image');
        images.splice(num, 1);
        inputs.splice(num, 1);
      }
    })
    $.each(inputs, function(index, input) {
      $(input).attr({
        'data-image': index
      })
    });
    $.each(images, function(index, image) {
      $(image).attr({
        'data-image': index
      })
    });
    $('input[type= "file"].upload-image:first').attr({
      'data-image': images.length
    })
    if (images.length >= 5) {
      dropzone2.css({
        'display': 'block'
      })
      dropzone.css({
        'display': 'none'
      })
      preview.children().remove();
      preview2.children().remove();
      $.each(images, function(index, image) {
        if(index < 5){
          preview.append(image);
        }else{
          preview2.append(image);
        }
      });
      dropzone2.css({
        'width': `calc(100% - (124px * ${images.length - 5}))`
      })
      if(images.length == 9) {
        dropzone2.find('p').replaceWith('<i class="fa fa-camera image-input-icon"></i>')
      }
      if(images.length == 8) {
        dropzone2.find('i').replaceWith('<p class"input-area-text">ここをクリックしてください</p>')
      }
    } else {
      dropzone2.css({
        'display': 'none'
      });
      dropzone.css({
        'display': 'block'
      });
      preview.children().remove();
      preview2.children().remove();
      $.each(images, function(index, image) {
        if(index < 5){
          preview.append(image);
        }else{
          preview2.append(image);
        }
      });
      dropzone.css({
        'width': `calc(100% - (124px * ${images.length}))`
      })
    }
    if(images.length == 4) {
      dropzone2.css({
        'display': 'none'
      })
    }
    if(images.length == 3) {
      dropzone.find('i').replaceWith('<p class"input-area-text">ここをクリックしてください</p>')
    }
  })
});