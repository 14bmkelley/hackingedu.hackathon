$(document).ready(function() {
  
  // Center landing vertically when page loads
  centerLanding();
  
  // Focus on the first text input when page loads
  $("input[type='text']").focus();
  
  // Center landing vertically when page resizes
  $(window).resize(centerLanding);
  
  // Login when login button is pressed
  $("#login").click(function(event) {
    login();
  });

  // Login when enter is pressed in the password input
  $("input[type='password']").keypress(function(keyEvent) {
    if (keyEvent.keyCode === 13) {
      login();
    }
  });
  
  // Catch accidental enter on username field
  $("input[type='text']").keypress(function(keyEvent) {
    if (keyEvent.keyCode === 13) {
      $("input[type='password']").focus();
    }
  });
  
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
  
  $("#register").click(function(event) {
    // Register
  });
  
  function login() {
    
    var username = $("input[type='text']").val();
    var password = $("input[type='password']").val();
    
    var data = {
      "username": username,
      "password": password
    };
    
    $.ajax("/", {
      "method": "POST",
      "contentType": "application/json",
      "data": JSON.stringify(data),
      "success": function(data, state, jqxhr) {
        if (JSON.parse(data)["success"]) {
          window.location.reload();
        }
        $("input").val("");
        $("input").first().focus();
      },
      "error": function(jqxhr, state, error) {
        console.log(error);
      }
    });
    
  }
  
});
