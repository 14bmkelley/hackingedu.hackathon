module.exports = function(router, sessionManager, dbModels) {
  
  router.post("/register", function(request, response) {
    
    if (!request.body.firstname && !request.body.lastname) {
      
      var username = request.body.username;
      var password = request.body.password;
      
      response.render("register", {
        "username": username,
        "password": password
      });
      
      return;
      
    }
    
    var firstname = request.body.firstname;
    var lastname = request.body.lastname;
    var username = request.body.username;
    var password = request.body.password;
    var posts = [];
    
    if (typeof firstname !== "string" || firstname === "") {
      response.end(JSON.stringify({ "success": false }));
    }
    
    if (typeof lastname !== "string" || lastname === "") {
      response.end(JSON.stringify({ "success": false }));
    }
    
    if (typeof username !== "string" || username === "") {
      response.end(JSON.stringify({ "success": false }));
    }
    
    if (typeof password !== "string" || password === "") {
      response.end(JSON.stringify({ "success": false }));
    }
    
    var newUser = {
      "firstname": firstname,
      "lastname": lastname,
      "username": username,
      "password": password,
      "posts": posts
    };
    
    new dbModels.User(newUser).save(function(error) {
      if (error) {
        console.log(error);
      }
    });
    
    response.end();
    
  });
  
  router.post("/login", function(request, response) {
    
    // Get user data
    var username = request.body.username;
    var password = request.body.password;
    
    // Do some input sanitization
    if (typeof username !== "string" || username === "") {
      response.end(JSON.stringify({ "success": false }));
    }
    
    if (typeof password !== "string" || password === "") {
      response.end(JSON.stringify({ "success": false }));
    }
    
    // Log them in
    dbModels.User.login(username, password, function(user) {
      
      // Check session and set cookie
      if (user !== undefined) {
        var sid = sessionManager.addSession(user);
        response.cookie("sid", sid, { maxAge: 10 * 60 * 60 * 24 });
        response.end(JSON.stringify({ "success": true }));
      }
      
      response.end(JSON.stringify({ "success": false }));
      
    });

  });
  
  router.get("/logout", function(request, response) {
    
  });
  
  return router;
  
};
