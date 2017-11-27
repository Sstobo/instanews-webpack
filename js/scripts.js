$(document).ready(function() {
              $('.loading').hide();
              $(document).ajaxStart( function() {
                   $('.loading').show();  // show Loading Div
              }).ajaxComplete(function(){ // <--------------try with .ajaxComplete
                    $('.loading').hide(); // hide loading div
              });
           });

  $('#select').on("change", function(){  
  $(".img-large").addClass("img-small"),
  $(".nav-large").addClass("nav-small");

    let choice = $(this).val();
    let url = "https://api.nytimes.com/svc/topstories/v2/" + choice + ".json";
    url += '?' + $.param({
      'api-key': "6c99ca9dc93041a3bf6637bf813f3725"
    });
  $.ajax({
    url: url,
    method: 'GET',
  })
  .fail(function(err) {
    throw err;
  })
  .done(function(data) {
     $(".gallery").empty();

      $.each(data.results.filter(function(item) { return item.multimedia.length !== 0 }).splice(0, 12), function(index, value) {
      console.log('data.results:', value)
      let multimediaIndex = (value.multimedia.length - 1);
      let title = value.abstract;
      let image = value.multimedia[multimediaIndex].url;
      let url = value.url
     $('.gallery').append('<a href="' + url + '" style="background-image:url(' + image + ');">' + "<h1>" + title + "</h1>" + '</a>');
  });
  });
  });

