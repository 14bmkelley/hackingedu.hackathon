module.exports = function(router, sessionManager, dbModels) {
  
  router.get("/", function(request, response) {
    authenticate(request.cookies, "home", function(user) {
      dbModels.Post.getMostRecent(function(posts) {
        response.render("home", {
          "title": "home",
          "user": user,
          "posts": posts
        });
      });
    });
  });
  
  router.get("/dashboard", function(request, response) {
    authenticate(request.cookies, "dashboard", function(user) {
      response.render("dashboard", {
        "title": "dashboard",
        "user": user
      });
    });
  });

  router.get("/profile", function(request, response) {
    authenticate(request.cookies, "profile", function(user) {
      response.render("profile", {
        "title": "profile",
        "user": user
      });
    });
  });

  router.get("/register", function(request, response) {
    response.render("register", {});
  });

  return router;

  function authenticate(cookies, page, callback) {
    if (cookies !== null) {
      sessionManager.authenticateSession(cookies["sid"], function(authUser) {
        callback(authUser);
      });
    }
  }

}
