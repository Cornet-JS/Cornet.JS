// Cornet.JS: The Humane JavaScript Library for Modern and Honest Web Notifications.
// An open source project by Toby56 under the GNU General Public License.

(function () {
  var CornetJS = {};
  var object = {
    notifications: [],
    notification: {
      new: function (type, content, options) {
        var optionsDefaults = {};
        var callback = [];
        function logCallback(newCallback) {
          if (newCallback) {
            callback = callback.concat(newCallback);
          }
          return console.log("[Cornet.JS]\n  " + callback.join(",\n  "));
        }

        if (type === undefined || type === null || type.constructor !== String) {
          return logCallback("FatalTypeError: Type was not a String");
        }

        if (content === undefined || content === null || content.constructor !== String) {
          return logCallback("FatalTypeError: Content was not a String");
        }

        if (options === undefined || options === null || (function () {
          if (options.constructor === String) {
            try {
              return JSON.parse(options).constructor !== Object;
            } catch (err) {
              callback.push(err.name + ": " + err.message);
              return true;
            }
          }
          try {
            return JSON.parse(JSON.stringify(options)).constructor !== Object;
          } catch (err) {
            callback.push(err.name + ": " + err.message);
            return true;
          }
        })()) {
          return logCallback("FatalTypeError: Options were not an Object");
        }

        var elt = document.querySelector("#cornetjs ul.cornetjs-notifications").appendChild(document.createElement("li"));
        var eltClasses = ["cornetjs-notification"];
        elt.className = eltClasses.join(" ");

        type = type.toLowerCase();
        var notificationTypes = ["success", "info", "warning", "error"];
        for (var index = 0; index < notificationTypes.length; index++) {
          if (type === notificationTypes[index]) {
            type = notificationTypes[index];
            break;
          } else if (index === notificationTypes.length - 1) {
            return logCallback("FatalError: Type was not an allowed value");
          }
        }
        var id = CornetJS.notifications.length + 1;
        for (var i = 0; i < 6 - id.length;) {
          id = "0" + id;
        }
        for (var key1 in optionsDefaults) {
          if (optionsDefaults.hasOwnProperty(key1)) {
            options[key1] = optionsDefaults[key1];
          }
        }
        for (var key2 in options) {
          if (!optionsDefaults.hasOwnProperty(key2)) {
            callback.push("Warning: Extra property in configuration \"" + key2 + "\"");
          }
        }
      }
    },
    newSuccess: function (content, options) {
      var type = "success";
      return CornetJS.notification.new(type, content, options);
    },
    newInfo: function (content, options) {
      var type = "info";
      return CornetJS.notification.new(type, content, options);
    },
    newWarning: function (content, options) {
      var type = "warning";
      return CornetJS.notification.new(type, content, options);
    },
    newError: function (content, options) {
      var type = "error";
      return CornetJS.notification.new(type, content, options);
    },
    initOnLoad: function (config) {
      if (document.readyState === "interactive") {
        CornetJS.init(config);
      } else {
        document.addEventListener("readystatechange", function () {
          if (document.readyState === "interactive") {
            CornetJS.init(config);
          }
        });
      }
    },
    init: function (configuration) {
      var callback = [];
      function logCallback(newCallback) {
        if (newCallback) {
          callback = callback.concat(newCallback);
        }
        return console.log("[Cornet.JS]\n  " + callback.join(",\n  "));
      }
      var configurationDefaults = {
        "theme": "simple",
        "position": "bottom-right",
        "width": "200px",
        "width-max": "50vw",
        "width-min": "100px",
        "callback": function () {
          console.log("Cornet.JS was successful.");
        }
      };
      if ((configuration === null || configuration === undefined) || (function () {
        if (configuration.constructor === String) {
          try {
            return JSON.parse(configuration).constructor !== Object;
          } catch (err) {
            callback.push("[" + err.name + "] " + err.message);
            return true;
          }
        } else {
          try {
            return JSON.parse(JSON.stringify(configuration)).constructor !== Object;
          } catch (err) {
            callback.push("[" + err.name + "] " + err.message);
            return true;
          }
        }
      })()) {
        return logCallback("FatalTypeError: Configuration is not an object");
      }

      CornetJS.configuration = {};

      for (var key1 in configurationDefaults) {
        if (configurationDefaults.hasOwnProperty(key1)) {
          CornetJS.configuration[key1] = configurationDefaults[key1];
        }
      }
      for (var key2 in configuration) {
        if (configurationDefaults.hasOwnProperty(key2)) {
          CornetJS.configuration[key2] = configuration[key2];
        } else {
          callback.push("Warning: Extra property in configuration \"" + key2 + "\"");
        }
      }

      var elt = document.body.appendChild(document.createElement("div"));
      elt.setAttribute("id", "cornetjs");
      elt = document.getElementById("cornetjs");
      elt.innerHTML = "<div class='cornetjs-container cornetjs-outer-container'><ul class='cornetjs-notifications'><li class='cornetjs-notification'><div class='cornetjs-notification-inner'><div class='cornetjs-notification-title'>Title</div><div class='cornetjs-notification-content'>Content</div></div></li></ul></div>";
      var eltProperties = ["theme", "position"];
      var eltClasses = [];
      for (var index1 = 0; index1 < eltProperties.length; index1++) {
        eltClasses.push("cornetjs-config-" + eltProperties[index1] + "--" + CornetJS.configuration[eltProperties[index1]]);
      }
      elt.setAttribute("class", eltClasses.join(" "));
      for (var index2 = 0; index2 < eltProperties.length; index2++) {
        elt.setAttribute("data-config-" + eltProperties[index2], CornetJS.configuration[eltProperties[index2]]);
      }

      if (CornetJS.configuration.callback !== null && CornetJS.configuration.callback.constructor === Function) {
        try {
          var fnc = CornetJS.configuration.callback();
          if (callback.length > 0) {
            logCallback();
          }
          return fnc;
        } catch (err) {
          return logCallback(err.name + ": " + err.message);
        }
      }
    }
  };

  window.CornetJS = CornetJS;
}).call(this);
