module.exports = function(router, sessionManager) {
  
  router.get("/", function(request, response) {
    response.render("home", {} );
  });

  router.get("/dashboard", function(request, response) {
    response.render("dashboard", {} );
  });

  router.get("/profile", function(request, response) {
    response.render("profile", {} );
  });

  router.get("/register", function(request, response) {
    response.render("register", {} );
  });
  
  return router;

}
