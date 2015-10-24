module.exports = function(router, sessionManager, dbModels) {
  
  router.post("/register", function(request, response) {
    
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
    
    // Log them in and retrieve session id
    var user = dbModels.User.login(username, password);
    
    // Check session and set cookie
    if (user !== null) {
      var sid = sessionManager.addSession(user);
      response.cookie("sid", sid, { maxAge: 10 * 60 * 60 * 24 });
      response.end({ "success": true });
    } else {
      response.end({ "success": false });
    }
    
  });
  
  router.get("/logout", function(request, response) {
    
  });
  
  return router;
  
};
