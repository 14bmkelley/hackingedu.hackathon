module.exports = function(Schema) {

  var userSchema = new Schema({
    "firstname": String,
    "lastname": String,
    "username": String,
    "password": String,
    "posts": [Schema.ObjectId]
  });

  userSchema.statics.login = function(username, password, callback) {
    this.findOne({
      "username": username,
      "password": password
    }).exec(function(error, data) {
      if (error) {
        console.log(error);
        callback(null);
      } else {
        callback(data);
      }
    });
  }
  
  return userSchema;
  
};
