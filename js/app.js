// Problem: No user interaction causes no change to application.
// Solution: When user interacts cause changes appropriately.

let color = $('.selected').css('background-color');
let $canvas = $('canvas');
let context = $canvas[0].getContext('2d');
let lastEvent;
let mousedown = false;

// When clicking on control list items
$('.controls').on('click', 'li', function() {
  // Deselect sibling elements
  $(this).siblings().removeClass('selected');
  // Select clicked element
  $(this).addClass('selected');
  // Cache current colour
  color = $(this).css('background-color');
});

// When 'new colour' is pressed
$('#revealColorSelect').click(function() {
  // Show or hide the colour select
  changeColor();
  $('#colorSelect').toggle();
});

// Update the new colour span
function changeColor() {
  let r = $('#red').val();
  let g = $('#green').val();
  let b = $('#blue').val();
  $('#newColor').css('background-color', 'rgb(' + r + ',' + g + ',' + b + ')');
}

// When color sliders change
$('input[type=range]').change(changeColor);

// When 'add colour' is pressed
$('#addNewColor').click(function() {
  // Append the colour to the controls ul
  let $newColor = $('<li></li>');
  $newColor.css('background-color', $('#newColor').css('background-color'));
  $('.controls ul').append($newColor);
  // Select the new colour
  $newColor.click();
});

// On mouse events on the canvas
$canvas
  .mousedown(function(e) {
    lastEvent = e;
    mousedown = true;
  })
  .mousemove(function(e) {
    // Draw lines
    if (mousedown) {
      context.beginPath();
      context.moveTo(lastEvent.offsetX, lastEvent.offsetY);
      context.lineTo(e.offsetX, e.offsetY);
      context.strokeStyle = color;
      context.stroke();
      lastEvent = e;
    }
  })
  .mouseup(function() {
    mousedown = false;
  })
  .mouseleave(function() {
    $canvas.mouseup();
  });
