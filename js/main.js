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

// Binds our knockout viewmodel.
ko.applyBindings(viewModel);
