module.exports = function(Schema) {
  
  var time = require("unix-timestamp");

  var postSchema = new Schema({
    "user": Schema.ObjectId,
    "content": String,
    "downvotes": Number,
    "time": Number
  });
  
  postSchema.statics.getPost = function(id, callback) {
    return this.findOne({
      "_id": id
    }).exec(function(error, data) {
      if (error) {
        console.log(error);
        callback(null);
      } else {
        callback(data);
      }
    });
  }

  postSchema.statics.getMostRecent = function(callback) {
    /*
    var twoWeeksAgo = time.now() - 60 * 60 * 24 * 14;
    this.find({
      "time": { $gt: twoWeeksAgo }
    }).sort({ "time": -1 })
    .exec(function(error, data) {
      if (error) {
        console.log(error);
        callback(null);
      } else {
        callback(data);
      }
    });
    */
    this.find()
      .sort({ "time": -1 })
      .exec(function(error, data) {
        if (error) {
          console.log(error);
          callback(null);
        } else {
          callback(data);
        }
      });
  }
  
  return postSchema;
  
};
