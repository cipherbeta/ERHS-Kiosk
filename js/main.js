// We may use KnockoutJS later on. Not quite sure.
var viewModel = {
};

// Defines our vars early on to keep from having to call them over and over.
var v1 = $('#video1');
var v1c = $('#video1 > .content');
var v2 = $('#video2');
var v2c = $('#video2 > .content');
var gb = $('#goBack');

// Displays the first video section.
var displayOne = function(){
  v1.css('width','100%');
  v2.css('width','0');
  gb.css('opacity','1');
  hideContent(v2c);
  $('#vidPlayer1').slideDown();
};

// Displays the second video section.
var displayTwo = function(){
  v2.css('width','100%');
  v1.css('width','0');
  gb.css('opacity','1');
  hideContent(v1c);
  $('#vidPlayer2').slideDown();
};

// Lets us hide content on the fly. Due to the size of the project we're not going to bother with removing the instance.
var hideContent = function(content){
  content.css('opacity','0');
}

// Restores our content.
var restoreContent = function(content){
  content.css('opacity','100');
}

// Resets our view to the norm.
var resetView = function() {
  // If a Youtube player is active, make sure we stop it.
  if (player === 'undefined' || !player) {
    console.log("Player could not be found.");
  } else {
    player.stopVideo();
    player.destroy();
  }
  // If the player's ended, make sure we destroy it.
  v1.css('width','50%');
  v2.css('width','50%');
  gb.css('opacity','0');
  restoreContent(v1c);
  $('#vidPlayer1').slideUp();
  restoreContent(v2c);
  $('#vidPlayer2').slideUp();
};

// Display the first video panel when anything is clicked on the left side.
$('#video1').on('click', function() {
  displayOne();
});

// Display the second video panel when anything is clicked on the right side.
$('#video2').on('click', function() {
  displayTwo();
});

// Calls our reset view function when somebody clicks on our Go Back button.
$('#goBack').on('click',function() {
  resetView();
})

// YOUTUBE API INTEGRATION
// This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//  This function creates an <iframe> (and YouTube player)
//  after the API code downloads.
var player;

// When our firstview button is clicked, init a video and get it ready to roll fullscreen.
$('#vidPlayer1').on('click', function(){
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: '-3WWLzNTmOw',
    controls: 0,
    showinfo: 0,
    autoplay: 0,
    rel: 0,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  // Make sure we hide view content.
  hideContent(v1c);
});

// When our secondview button is clicked, init a video and get it ready to roll fullscreen.
$('#vidPlayer2').on('click', function(){
  player = new YT.Player('player', {
    height: '100%',
    width: '100%',
    videoId: 'zb5Sqh6YJeY',
    controls: 0,
    showinfo: 0,
    autoplay: 0,
    rel: 0,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  // Make sure we hide view content.
  hideContent(v2c);
});
// function onYouTubeIframeAPIReady() {
//   player = new YT.Player('player', {
//     height: '100%',
//     width: '100%',
//     videoId: '-3WWLzNTmOw',
//     controls: 0,
//     events: {
//       'onReady': onPlayerReady,
//       'onStateChange': onPlayerStateChange
//     }
//   });
// }

// The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}

// The API calls this function when the player's state changes.
// The function indicates that when playing a video (state=1),
// the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    done = true;
  }
  if (event.data == YT.PlayerState.ENDED) {
    resetView();
  }
}
function stopVideo() {
  player.stopVideo();
}


// Binds our knockout viewmodel.
ko.applyBindings(viewModel);
