// Cornet.JS: The Humane JavaScript Library for Modern and Honest Web
// Notifications. An open source project by Toby56 under the GNU General Public
// License.
//
// Copyright (C) 2017  Toby56 (https://github.com/Toby56)
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

(function () {
  // LOCAL VARIABLES
  var body = document.body;

  var getElt = function (selector) {
    var elt = document.querySelectorAll(selector);
    return (elt === null ? false : elt);
  };

  var testJSON = function (JSON) {
    if (JSON.constructor === String) {
      try {
        return JSON.parse(JSON).constructor !== Object;
      } catch (err) {
        return false;
      }
    } else {
      try {
        return JSON.parse(JSON.stringify(JSON)).constructor !== Object;
      } catch (err) {
        return false;
      }
    }
  };

  var DOMIsInitiated = false;
  var configIsInitiated = false;

  var configDefaults = {
    "theme": "simple",
    "position": "bottom-right",
    "width": "200px",
    "width-max": "50vw",
    "width-min": "100px"
  };

  // GLOBAL VARIABLES
  // Main global variable
  var CornetJS = {};

  CornetJS.config = {};

  CornetJS.DOM = null;

  CornetJS.updateConfig = function (newConfig) {
    if (configIsInitiated === false || CornetJS.DOM === null) {
      return "DOM is not Initiated";
    }
    for (var key1 in configDefaults) {
      if (configDefaults.hasOwnProperty(key1)) {
        if (newConfig.hasOwnProperty(key1)) {
          CornetJS.config[key1] = newConfig[key1];
        }
      }
    }
  };
  CornetJS.notifications = [];
  CornetJS.new = function (type, content, options) {
    var optionsDefaults = {
      timeout: 8
    };

    if (!type || type.constructor !== String) {
      return "Type was not a String";
    }

    if (!content || content.constructor !== String) {
      return "Content was not a String";
    }

    if (!options) {
      var result = testJSON(options);
      if (result === false) {
        return "Options were not an Object";
      }
    }

    var elt = getElt("#cornetjs ul.cornetjs-notifications").appendChild(document.createElement("li"));
    var eltClasses = ["cornetjs-notification"];
    elt.className = eltClasses.join(" ");

    type = type.toLowerCase();
    var notificationTypes = ["success", "info", "warning", "error"];
    for (var index = 0; index < notificationTypes.length; index++) {
      if (type === notificationTypes[index]) {
        type = notificationTypes[index];
        break;
      } else if (index === notificationTypes.length - 1) {
        return "Type was not an allowed value";
      }
    }
    var id = CornetJS.notifications.length + 1;
    for (var i = 0; i < 6 - id.length;) {
      id = "0" + id;
    }
    for (var key1 in optionsDefaults) {
      if (optionsDefaults.hasOwnProperty(key1)) {
        if (!options.hasOwnProperty(key1)) {
          options[key1] = optionsDefaults[key1];
        }
      }
    }
  };
  CornetJS.newSuccess = function (content, options) {
    var type = "success";
    return CornetJS.new(type, content, options);
  };
  CornetJS.newInfo = function (content, options) {
    var type = "info";
    return CornetJS.new(type, content, options);
  };
  CornetJS.newWarning = function (content, options) {
    var type = "warning";
    return CornetJS.new(type, content, options);
  };
  CornetJS.newError = function (content, options) {
    var type = "error";
    return CornetJS.new(type, content, options);
  };
  CornetJS.initOnLoad = function (config) {
    if (document.readyState === "interactive") {
      CornetJS.init(config);
    } else {
      document.addEventListener("readystatechange", function () {
        if (document.readyState === "interactive") {
          CornetJS.init(config);
        }
      });
    }
  };

  CornetJS.updateDOMClasses = function () {
    if (DOMIsInitiated === false || CornetJS.DOM === null) {
      return "DOM is not Initiated";
    }
  };

  CornetJS.initConfig = function (configuration) {
    if ((configuration === null || configuration === undefined) || (function () {
      if (configuration.constructor === String) {
        try {
          return JSON.parse(configuration).constructor !== Object;
        } catch (err) {
          return err.name + ": " + err.message;
        }
      } else {
        try {
          return JSON.parse(JSON.stringify(configuration)).constructor !== Object;
        } catch (err) {
          return err.name + ": " + err.message;
        }
      }
    })()) {
      return "Configuration is not an object";
    }

    CornetJS.config = {};

    for (var key1 in configDefaults) {
      if (configDefaults.hasOwnProperty(key1)) {
        CornetJS.config[key1] = configDefaults[key1];
      }
    }
    for (var key2 in configuration) {
      if (configDefaults.hasOwnProperty(key2)) {
        CornetJS.config[key2] = configuration[key2];
      }
    }
  };
  CornetJS.initDOM = function () {
    if (DOMIsInitiated === true) {
      return "DOM is Already Initiated";
    }
    var elt = body.appendChild(document.createElement("div"));
    elt.setAttribute("id", "cornetjs");
    elt.innerHTML = "<div class='cornetjs-container cornetjs-outer-container'><ul class='cornetjs-notifications'><li class='cornetjs-notification'><div class='cornetjs-notification-inner'><div class='cornetjs-notification-title'>Title</div><div class='cornetjs-notification-content'>Content</div></div></li></ul></div>";
    var eltProperties = ["theme", "position"];
    var eltClasses = [];
    for (var index1 = 0; index1 < eltProperties.length; index1++) {
      eltClasses.push("config-" + eltProperties[index1] + "--" + CornetJS.config[eltProperties[index1]]);
    }
    elt.setAttribute("class", eltClasses.join(" "));
    for (var index2 = 0; index2 < eltProperties.length; index2++) {
      elt.setAttribute("data-config-" + eltProperties[index2], CornetJS.config[eltProperties[index2]]);
    }

    if (CornetJS.config.callback !== null && CornetJS.config.callback.constructor === Function) {
      try {
        var fnc = CornetJS.config.callback();
        return fnc;
      } catch (err) {
        return err.name + ": " + err.message;
      }
    }
  };

  window.CornetJS = CornetJS;
}).call(this);
