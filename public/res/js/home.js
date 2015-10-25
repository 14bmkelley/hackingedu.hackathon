$(document).ready(function() {
  
  // Center landing vertically when page loads
  centerLanding();
  
  // Focus on the first text input when page loads
  $("input").first().focus();
  
  // Center landing vertically when page resizes
  $(window).resize(centerLanding);
  
  // Hide the hacky register button
  $("#register-full").css("display", "none");
  
  // Login when login button is pressed
  $("#login").click(function(event) {
    login();
  });

  // Login when enter is pressed in the password input
  $("input").last().keypress(function(keyEvent) {
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

  $("#newrant").keypress(function(keyEvent) {
    if (keyEvent.keyCode === 13) {
      newRant();
    }
  });

  $("#newrantsubmit").click(function(event) {
    newRant();
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
  
  // Set register listener
  $("#register").click(function(event) {
    
    var username = $("#username").val();
    var password = $("#password").val();
    var repeat = $("#repeat-password").val(); 
    var firstname = $("#first-name").val();
    var lastname = $("#last-name").val();
    var email = $("#email").val();
    
    if (password !== repeat && repeat !== undefined) {
      // Handle mess up
      console.log("oops");
      return;
    }
    
    var data = {
      "username": username,
      "password": password,
      "firstname": firstname,
      "lastname": lastname,
      "email": email
    };
    
    $.ajax("/register", {
      "method": "POST",
      "contentType": "application/json",
      "data": JSON.stringify(data),
      "success": function(data, state, jqxhr) {
        $("#landing").html(data);
        $("#username").val(username);
        $("#password").val(password);
        centerLanding();
        $("#register-full").css("display", "block");
        $("input").first().focus();
      },
      "error": function(error) {
        console.log(error);
      }
    });
    
  });

  // Set register listener
  $("#register-full").click(function(event) {
    
    var username = $("#username").val();
    var password = $("#password").val();
    var repeat = $("#repeat-password").val(); 
    var firstname = $("#first-name").val();
    var lastname = $("#last-name").val();
    var email = $("#email").val();
    
    if (password !== repeat && repeat !== undefined) {
      // Handle mess up
      console.log("oops");
      return;
    }
    
    var data = {
      "username": username,
      "password": password,
      "firstname": firstname,
      "lastname": lastname,
      "email": email
    };
    
    $.ajax("/register", {
      "method": "POST",
      "contentType": "application/json",
      "data": JSON.stringify(data),
      "success": function(data, state, jqxhr) {
        window.location.pathname = "/";
      },
      "error": function(jqxhr, state, error) {
        console.log(error);
      }
    });
    
  });
  
  function login() {
    
    var username = $("input[type='text']").val();
    var password = $("input[type='password']").val();
    
    var data = {
      "username": username,
      "password": password
    };
    
    $.ajax("/login", {
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

  function newRant() {
    
    var data = {
      "rant": $("#newrant").val()
    };

    $.ajax("/new_rant", {
      "method": "POST",
      "contentType": "application/json",
      "data": JSON.stringify(data),
      "success": function(data, state, jqxhr) {
        window.location.reload();
      },
      "error": function(jqxhr, state, error) {
        console.log(error);
      }
    });

  }
  
});
