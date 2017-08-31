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

var CornetJS = {};

(function () {
  var getElt = function (selector) {
    var elt = document.querySelectorAll(selector);
    return (elt === null ? false : elt);
  };

  var DOMIsInitiated = false;

  var configIsInitiated = false;

  var configDefaults = {
    "theme": "simple",
    "position": "bottom-right",
    "offset-top": "0",
    "offset-bottom": "0",
    "offset-side": "0"
  };

  var configData = {
    "theme": {
      configFnc: function (value) {
        return value;
      },
      DOMFnc: function (value) {
        if (value.constructor === String) {
          var classList = CornetJS.DOM.getAttribute("class").split(" ");
          value = value.split(" ");
          classList.push("value");
        }
      }
    },
    "position": {
      configFnc: function (value) {
        return value;
      },
      DOMFnc: function (value) {
        return value;
      }
    },
    "offset-top": {
      configFnc: function (value) {
        return value;
      },
      DOMFnc: function (value) {
        return value;
      }
    },
    "offset-bottom": {
      configFnc: function (value) {
        return value;
      },
      DOMFnc: function (value) {
        return value;
      }
    },
    "offset-side": {
      configFnc: function (value) {
        return value;
      },
      DOMFnc: function (value) {
        return value;
      }
    }
  };

  var optionsDefaults = {
    timeout: 8
  };

  // GLOBAL VARIABLES

  CornetJS.config = {};

  CornetJS.DOM = null;

  CornetJS.notifications = [];

  CornetJS.updateConfig = function (newConfig) {
    if (configIsInitiated === false) {
      return "Config is not Initiated";
    }

    if (!newConfig || newConfig.contructor !== Object) {
      return "JSON is not valid";
    }

    for (var key1 in configDefaults) {
      if (configDefaults.hasOwnProperty(key1) && newConfig.hasOwnProperty(key1)) {
        CornetJS.config[key1] = newConfig[key1];
      }
    }
  };

  CornetJS.new = function (type, content, options) {
    if (!type || type.constructor !== String) {
      return "Type is not a string";
    }

    if (!content || content.constructor !== String) {
      return "Content is not a string";
    }

    if (!options || options.constructor !== Object) {
      return "Options were not an object";
    }

    var elt = getElt("#cornetjs ul.cornetjs-notifications").appendChild(document.createElement("li"));

    var eltClasses = ["cornetjs-notification"];

    elt.className = eltClasses.join(" ");

    type = type.toLowerCase();

    if (type !== "success" && type !== "info" && type !== "warning" && type !== "error") {
      return "Type was not an allowed value";
    }

    var id = CornetJS.notifications.length + 1;

    for (var i = 0; i < 6 - id.length;) {
      id = "0" + id;
    }

    for (var key1 in optionsDefaults) {
      if (optionsDefaults.hasOwnProperty(key1) && !options.hasOwnProperty(key1)) {
        options[key1] = optionsDefaults[key1];
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

  CornetJS.initDOM = function () {
    if (DOMIsInitiated === true) {
      return "DOM is allready initiated";
    }

    var elt = document.body.appendChild(document.createElement("div"));

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
  };

  CornetJS.initDOMOnLoad = function () {
    if (document.readyState === "interactive" || document.readystate === "complete") {
      return CornetJS.initDOM();
    }

    document.addEventListener("readystatechange", function () {
      if (document.readyState === "interactive" || document.readystate === "complete") {
        return CornetJS.initDOM();
      }
    });
  };

  CornetJS.updateDOM = function () {
    if (DOMIsInitiated === false || CornetJS.DOM === null) {
      return "DOM is not Initiated";
    }
  };

  CornetJS.initConfig = function (config) {
    if (configIsInitiated === true) {
      return "Config is already initiated";
    }

    if (!config || config.constructor !== Object) {
      return "Config is not an object";
    }

    configIsInitiated = true;

    for (var key1 in configDefaults) {
      if (configDefaults.hasOwnProperty(key1)) {
        CornetJS.config[key1] = configDefaults[key1];
      }
    }

    CornetJS.updateConfig(config);
  };

  CornetJS.updateConfig = function (config) {
    if (configIsInitiated === false) {
      return "Config is not initiated yet\nThat must be done first";
    }

    for (var key in configDefaults) {
      if (configDefaults.hasOwnProperty(key) && config.hasOwnProperty(key)) {
        CornetJS.config[key] = config[key];
      }
    }
  };

  window.CornetJS = CornetJS;
}).call(this);
