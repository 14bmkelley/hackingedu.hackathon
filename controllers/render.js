module.exports = function(router, sessionManager, dbModels) {
  
  router.get("/", function(request, response) {
    authenticate(request.cookies, "home", response);
  });

  router.get("/dashboard", function(request, response) {
    authenticate(request.cookies, "dashboard", response);
  });

  router.get("/profile", function(request, response) {
    authenticate(request.cookies, "profile", response);
  });

  router.get("/register", function(request, response) {
    response.render("register", {});
  });

  return router;

  function authenticate(cookies, page, response) {
    if (cookies !== null) {
      sessionManager.authenticateSession(cookies["sid"], function(authUser) {
        response.render(page, {
          "title": page,
          "user": authUser,
          "posts": []
        });
        if (authUser) return true;
      });
    }
  }

}
