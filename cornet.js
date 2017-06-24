// Cornet.JS: A project by Toby56 under the GNU GENERAL PUBLIC LICENSE.
/*
TODO:
  >> Use a better liscense
  >>
*/
var CornetJS = {
  config: {},
  notifications: [],
  notification: {
    new: function (type, content, options) {
      var elt = document.querySelector("#cornetjs ul.cornetjs-notifications").appendChild(document.createElement("li"));
      var eltClasses = [];
      eltClasses.push("cornetjs-notification");
      if (type !== (undefined || null) && type.constructor.name === "String") {
        if (content !== (undefined || null) && type.constructor.name === "String") {
          if (options !== (undefined || null) && (function () {
            if (CornetJS.config.constructor.name === "string") {
              try {
                return JSON.parse(CornetJS.config).constructor.name === "Object";
              } catch (err) {}
            }
            try {
              return JSON.parse(JSON.stringify(CornetJS.config)).constructor.name === "Object";
            } catch (err) {}
          })()) {
          } else {}
        } else {}
      } else {}
      elt.className = eltClasses.join(" ");
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
  defaultConfig: {
    "theme": "simple",
    "position": "bottom-right",
    "width": "200px",
    "width-max": "50vw",
    "width-min": "100px",
    "callback": function () {
      console.log("Cornet.JS was successful.");
    }
  },
  update: function () {
    setTimeout(CornetJS.update, 1000);
  },
  initOnLoad: function (config) {
    document.addEventListener("readystatechange", function () {
      if (document.readyState === "interactive") {
        CornetJS.init(config);
      }
    });
  },
  init: function (config) {
    var callback = [];

    function logCallback(message) {
      console.log(message + "\n    " + callback.join(",\n    "));
    }
    if ((function () {
      if (typeof config === "string") {
        try {
          return JSON.parse(config).constructor.name === "Object";
        } catch (err) {
          callback.push("[" + err.name + "] " + err.message);
        }
      } else {
        try {
          return JSON.parse(JSON.stringify(config)).constructor.name === "Object";
        } catch (err) {
          callback.push("[" + err.name + "] " + err.message);
        }
      }
    })()) {
      for (var key1 in CornetJS.defaultConfig) {
        CornetJS.config[key1] = CornetJS.defaultConfig[key1];
      }
      for (var key2 in config) {
        if (CornetJS.defaultConfig.hasOwnProperty(key2)) {
          CornetJS.config[key2] = config[key2];
        } else {
          callback.push("[Warning] Extra property in configuration \"" + key2 + "\"");
        }
      }
    } else {
      callback.push("[TypeError] Configuration is not an object");
      logCallback("Cornet.JS:\nINITIALISATION FAILED:");
      return;
    }
    var elt = document.createElement("div");
    elt.setAttribute("id", "cornetjs");
    document.body.appendChild(elt);
    elt = document.getElementById("cornetjs");
    elt.innerHTML = "<div class='cornetjs-container cornetjs-outer-container'><ul class='cornetjs-notifications'><li class='cornetjs-notification'><div class='cornetjs-notification-inner'><div class='cornetjs-notification-title'>Title</div><div class='cornetjs-notification-content'>Content</div></div></li></ul></div>";
    var eltProperties = ["theme", "position"];
    var eltClasses = [];
    for (var index1 = 0; index1 < eltProperties.length; index1++) {
      eltClasses.push("cornetjs-config-" + eltProperties[index1] + "--" + CornetJS.config[eltProperties[index1]].replace(/[^a-z0-9]+/gi, "-").toLowerCase());
    }
    elt.setAttribute("class", eltClasses.join(" "));
    for (var index2 = 0; index2 < eltProperties.length; index2++) {
      elt.setAttribute("data-config-" + eltProperties[index2], CornetJS.config[eltProperties[index2]]);
    }
    try {
      var func = CornetJS.config.callback();
      if (callback.length > 0) {
        logCallback("Cornet.JS:");
      }
      return func;
    } catch (err) {
      callback.push("[" + err.name + "] " + err.message);
      logCallback("Cornet.JS:");
    }
  }
};
