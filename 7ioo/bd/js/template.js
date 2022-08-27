$(document).ready(function(){

// For You
    const foryou_title = $(".foryou-item_title");
    const foryou_content = $(".foryou-item_content");

    foryou_title.click(function(){

      const this_title = $(this);
      const this_content = $(this).parent().find(foryou_content);
      const this_title_parent = $(this).parent()
      this_content.slideToggle();

      foryou_content.not(this_content).slideUp();

      if(!this_title_parent.is(":last-child")){ 
          foryou_title.last().addClass("round");

      }

      if(this_title_parent.is(":last-child")){ 
        this_title.toggleClass("round");
      }



});

// Tabs

    $('.tab_content').hide();
    $('.tab_content:first-child').show();

    $('.tabs li').click(function(){
      
      stopVideo();
      stopAudio();

      $('.tabs li').removeClass('active');
      $(this).addClass('active');

      const current_tab = $(this).attr('data-attr');
      $('.tab_content').hide();
      $('.' + current_tab).show();
    });

})

// Slide Show

var img_slideIndex = 1;
img_showDivs(img_slideIndex);

function img_plusDivs(n) {
  img_showDivs(img_slideIndex += n);
}

function img_showDivs(n) {
  var i;
  var x = document.getElementsByClassName("img_slides");
  if (n > x.length) {img_slideIndex = 1}
  if (n < 1) {img_slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[img_slideIndex-1].style.display = "block";  

  var img_counter = document.getElementById("img_counter");
  var img_count = x[img_slideIndex-1].getAttribute("img_count");
  img_counter.textContent = img_count

}

// Video Player

var video_slideIndex = 1;
video_showDivs(video_slideIndex);

function video_plusDivs(n) {
  video_showDivs(video_slideIndex += n);
}

function video_showDivs(n) {
  var i;
  var x = document.getElementsByClassName("video_slides");
  if (n > x.length) {video_slideIndex = 1}
  if (n < 1) {video_slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[video_slideIndex-1].style.display = "block";  

  var video_counter = document.getElementById("video_counter");
  var video_count = x[video_slideIndex-1].getAttribute("video_count");
  video_counter.textContent = video_count

  stopVideo()
  
}

function stopVideo() {
  $('.video_slides').each(function(){
    this.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*')
  });
}

// Audio Player

var audio_slideIndex = 1;
audio_showDivs(audio_slideIndex);

function audio_plusDivs(n) {
  audio_showDivs(audio_slideIndex += n);
}

function audio_showDivs(n) {
  var i;
  var x = document.getElementsByClassName("audio_slides");
  if (n > x.length) {audio_slideIndex = 1}
  if (n < 1) {audio_slideIndex = x.length}
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  x[audio_slideIndex-1].style.display = "block";  

  var audio_counter = document.getElementById("audio_counter");
  var audio_count = x[audio_slideIndex-1].getAttribute("audio_count");
  audio_counter.textContent = audio_count

  stopAudio()
  
}

function stopAudio() {
  var y = document.querySelectorAll(".audio_slides");
  y.forEach(audio => {
    audio.pause()
  })

}


