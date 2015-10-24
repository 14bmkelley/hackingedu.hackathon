module.exports = function(Schema) {

  var userSchema = new Schema({
    "firstname": String,
    "lastname": String,
    "username": String,
    "password": String,
    "posts": [Schema.ObjectId]
  });

  userSchema.methods.register = function() {
    this.model("User").save();
  }

  userSchema.statics.login = function(username, password) {
    this.model("User").findOne({
      "username": username,
      "password": password
    }, function(error, user) {
      if (error) {
        console.log(error);
        return null;
      }
      console.log(user);
      return user;
    });
  }
  
  return userSchema;
  
};
