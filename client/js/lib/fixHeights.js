define(function() {

  'use strict';

  /* Function to equalize panel heights for better readability    */
  /* idea from http://css-tricks.com/equal-height-blocks-in-rows/ */
  return function(reflow) {
    var currentTallest = 0, currentRowStart = 0,
    rowDivs = [], $el, topPosition = 0;
    var photos = $('#photos .photo');
    photos.imagesLoaded(function () {
      $("#photos").removeClass('loading');
      if(reflow) {
        photos.height('auto');
      }
      photos.each(function() {
        $el = $(this);
        topPostion = $el.position().top;
        if (currentRowStart != topPostion) {
          // we just came to a new row.  Set all the heights on the completed row
          for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
            rowDivs[currentDiv].height(currentTallest);
          }
          // set the variables for the new row
          rowDivs.length = 0; // empty the array
          currentRowStart = topPostion;
          currentTallest = $el.height();
          rowDivs.push($el);
        } else {
          // another div on the current row.  Add it to the list and check if it's taller
          rowDivs.push($el);
          currentTallest = (currentTallest < $el.height()) ? ($el.height()) : (currentTallest);
        }
        // do the last row
        for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
          rowDivs[currentDiv].height(currentTallest);
        }
      });
    });
  }

});
