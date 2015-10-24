module.exports = function(Schema) {

  var userSchema = new Schema({
    "firstname": String,
    "lastname": String,
    "username": String,
    "password": String,
    "posts": [Schema.ObjectId]
  });

  userSchema.statics.login = function(username, password) {
    this.find()
        .where("username", username)
        .where("password", password)
        .exec(function(error, user) {
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
