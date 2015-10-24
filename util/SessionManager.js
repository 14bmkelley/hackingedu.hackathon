var SessionManager = function() {
  
  var randomstring = require("random-string");

  // Store sessions 
  var sessions = [];
  
  // Add a session
  this.addSession = function(user) {
   
    // Create session
    var session = {
      "user": user,
      "sid": randomstring({ "length": 16 })
    };

    // Add session and clean up
    sessions.push(session);
    this.cleanSessions();
    return session.sid;

  };

  // Authenticate a session
  this.authenticateSession = function(sid) {
    
    // If a session is found, then it can be authenticated
    for (session in sessions) {
      if (session.sid === sid) {
        return true;
      }
    }

    // Otherwise, there is no session
    return false;

  };

  // Clean up session list
  this.cleanSessions = function() {
    
    var newSessions = [];

    for (var i = 0; i < sessions.length; i++) {
      var found = false;
      for (var j = i + 1; j < sessions.length; j++) {
        if (sessions[i].user.username === sessions[j].user.username) {
          found = true;
        }
      }
      if (!found) {
        newSessions.push(sessions[i]);
      }
    }

    sessions = newSessions;
    
  };
  
};

module.exports = new SessionManager();
