$(document).ready(function() {
  
  // Center landing vertically when page loads
  centerLanding();

  // Center landing vertically when page resizes
  $(window).resize(centerLanding);
  
  // Center the landing title and inputs vertically
  function centerLanding() {
    
    // Find out what spaces to fill
    var canvas = $("body").outerHeight() - $(".navbar").outerHeight();
    var landingSize = $("#landing").outerHeight();
    var topOffset = 0;

    if (canvas > landingSize) {
      topOffset = (canvas - landingSize) / 2;
    }

    // Set offset on landing text and inputs
    $("#landing").css("margin-top", topOffset + "px");

  }
  
});
