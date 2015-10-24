module.exports = function(router) {
  
  router.get("/", function(request, response) {
    response.render("home", {} );
  });
  
  return router;

}
