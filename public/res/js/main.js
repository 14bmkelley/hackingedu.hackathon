$(document).ready(function() {
  
  resizeContent();

  $(window).resize(resizeContent);

  function resizeContent() {
    var navHeight = $(".navbar").outerHeight();
    var contentHeight = $("#content").outerHeight();
    var bodyHeight = $("body").outerHeight();
    if (navHeight + contentHeight < bodyHeight) {
      $("#content").css({
        "height": bodyHeight - navHeight + "px",
        "overflow-y": "scroll"
      });
    }
  }

});
