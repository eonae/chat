// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../node_modules/simplebar/dist/simplebar.css":[function(require,module,exports) {

        var reloadCSS = require('_css_loader');
        module.hot.dispose(reloadCSS);
        module.hot.accept(reloadCSS);
      
},{"_css_loader":"../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"simplebar/dist/simplebar.css":"../node_modules/simplebar/dist/simplebar.css","_css_loader":"../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"ts/lib/EventEmitter.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EventEmitter =
/*#__PURE__*/
function () {
  function EventEmitter() {
    _classCallCheck(this, EventEmitter);

    this._map = new Map();
  }

  _createClass(EventEmitter, [{
    key: "on",
    value: function on(eventName, handler) {
      var arrayOfHandlers = this._map.get(eventName);

      if (arrayOfHandlers) {
        arrayOfHandlers.push(handler);
      } else {
        var newArray = [handler];

        this._map.set(eventName, newArray);
      }
    }
  }, {
    key: "off",
    value: function off(eventName, handler) {
      var arrayOfHandlers = this._map.get(eventName);

      if (!arrayOfHandlers) return;
      var index = arrayOfHandlers.indexOf(handler);
      if (index === -1) return;
      arrayOfHandlers.splice(index, 1);

      if (arrayOfHandlers.length === 0) {
        this._map.delete(eventName);
      }
    }
  }, {
    key: "emit",
    value: function emit(eventName, args) {
      var arrayOfHandlers = this._map.get(eventName);

      if (!arrayOfHandlers || arrayOfHandlers.length === 0) return;
      arrayOfHandlers.forEach(function (handler) {
        setTimeout(function () {
          handler(args);
        });
      });
    }
  }]);

  return EventEmitter;
}();

exports.default = EventEmitter;
},{}],"ts/lib/base/Command.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Command =
/*#__PURE__*/
function () {
  function Command(def, caller) {
    var _this = this;

    _classCallCheck(this, Command);

    this._flags = [];
    this.text = def.text;
    this._action = def.action;
    this._validation = def.validation;
    this._caller = caller;
    this.info = def.info ? def.info : 'No info for this command';

    if (def.aliases) {
      this._aliases = typeof def.aliases === 'string' ? [def.aliases] : def.aliases;
    } else {
      this._aliases = [];
    }

    if (def.flags) {
      def.flags.forEach(function (f) {
        if (typeof f === 'string') {
          _this._flags.push({
            name: f,
            info: 'No info for this flag',
            aliases: [],
            type: 'boolean'
          });
        } else {
          _this._flags.push(f);
        }
      });
    }
  }

  _createClass(Command, [{
    key: "exec",
    value: function exec(params, flags) {
      // Checking flags correctness
      var resolvedFlags;

      try {
        resolvedFlags = this._resolveFlags(flags);
      } catch (err) {
        return Promise.resolve(err);
      } // Validating parameters


      var ctx = {
        params: params,
        flags: resolvedFlags,
        caller: this._caller,
        processed: undefined
      };

      var val = this._validation(ctx);

      var result = typeof val === 'boolean' ? val : val.result;

      if (!result) {
        var error = typeof val === 'boolean' ? new Error('Invalid parameters!') : val.error;
        return Promise.resolve(error);
      }

      if (typeof val !== 'boolean' && val.processed) {
        ctx.processed = val.processed;
      }

      return this._action(ctx);
    }
  }, {
    key: "_resolveFlags",
    value: function _resolveFlags(flags) {
      var _this2 = this;

      var hash = {};
      flags.forEach(function (rawFlag) {
        debugger;
        var arr = rawFlag.split('=');
        if (arr.length > 2) throw new Error('Invalid flag!');

        var _ref = arr.length === 1 ? {
          flag: arr[0],
          value: true
        } : {
          flag: arr[0],
          value: arr[1]
        },
            flag = _ref.flag,
            value = _ref.value;

        var findByName = _this2._flags.find(function (f) {
          return f.name === flag;
        });

        if (findByName) {
          if (findByName.type === _typeof(value)) hash[flag] = value;else throw new Error("Invalid value for flag".concat(flag));
        } else {
          var findByAlias = _this2._flags.find(function (f) {
            return f.aliases.indexOf(flag) !== -1;
          });

          if (findByAlias) {
            if (findByAlias.type === _typeof(value)) hash[flag] = value;else throw new Error("Invalid value for flag".concat(flag));
          } else throw new Error('Invalid flag!');
        }
      });
      return hash;
    }
  }, {
    key: "flags",
    get: function get() {
      return this._flags.slice(0);
    }
  }, {
    key: "aliases",
    get: function get() {
      return this._aliases.slice(0);
    }
  }]);

  return Command;
}();

exports.default = Command;
},{}],"ts/lib/base/CommandManager.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Command_1 = __importDefault(require("./Command"));

var CommandManager =
/*#__PURE__*/
function () {
  function CommandManager() {
    _classCallCheck(this, CommandManager);

    this._map = new Map();
  }

  _createClass(CommandManager, [{
    key: "getInfo",
    value: function getInfo(commandName) {
      var cmd = this._map.get(commandName);

      return cmd ? {
        name: cmd.text,
        aliases: cmd.aliases,
        info: cmd.info,
        flags: cmd.flags
      } : undefined;
    }
  }, {
    key: "getCommandsList",
    value: function getCommandsList() {
      return Array.from(this._map.values()).filter(function (value, index, self) {
        return self.indexOf(value) === index;
      }).map(function (command) {
        return command.text;
      });
    }
  }, {
    key: "register",
    value: function register(definitions, terminal) {
      var _this = this;

      definitions.forEach(function (def) {
        _this.checkDef(def);

        var cmd = new Command_1.default(def, terminal);

        _this._map.set(cmd.text, cmd);

        cmd.aliases.forEach(function (alias) {
          return _this._map.set(alias, cmd);
        });
      });
    }
  }, {
    key: "tryExecute",
    value: function tryExecute(trigger) {
      var cmd = this._map.get(trigger.command);

      return cmd !== undefined ? cmd.exec(trigger.arguments, trigger.flags) : Promise.resolve(new Error('Command not found'));
    }
  }, {
    key: "checkDef",
    value: function checkDef(def) {
      if (this._map.has(def.text)) {
        throw new Error("Command ".concat(def.text, " already registered!"));
      }

      if (def.aliases) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = def.aliases[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var alias = _step.value;

            if (this._map.has(alias)) {
              throw new Error("Alias ".concat(alias, " is already registered!"));
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }
  }]);

  return CommandManager;
}();

exports.default = CommandManager;
},{"./Command":"ts/lib/base/Command.ts"}],"ts/lib/base/BaseIOEntity.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EventEmitter_1 = __importDefault(require("../EventEmitter"));

var CommandManager_1 = __importDefault(require("./CommandManager"));

var BaseIOEntity =
/*#__PURE__*/
function (_EventEmitter_1$defau) {
  _inherits(BaseIOEntity, _EventEmitter_1$defau);

  function BaseIOEntity(commands) {
    var _this;

    _classCallCheck(this, BaseIOEntity);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(BaseIOEntity).call(this));
    _this.defaultInvitation = '>';
    _this.invitation = _this.defaultInvitation;
    _this.commandManager = new CommandManager_1.default();
    _this._stopToken = false;

    _this.commandManager.register(commands, _assertThisInitialized(_this));

    _this.in = _this.in.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(BaseIOEntity, [{
    key: "setInvitation",
    value: function setInvitation(inv) {
      this.invitation = inv;
    }
  }, {
    key: "dropInvitation",
    value: function dropInvitation() {
      this.invitation = this.defaultInvitation;
    }
  }, {
    key: "run",
    value: function run() {
      // стоит сделать ещё один уровень абстракции.
      this.emit('read', {
        invitation: this.invitation
      });
    }
  }, {
    key: "getInfo",
    value: function getInfo(command) {
      return this.commandManager.getInfo(command);
    }
  }, {
    key: "getAllCommandsInfo",
    value: function getAllCommandsInfo() {
      var _this2 = this;

      var list = this.commandManager.getCommandsList();
      return list.map(function (name) {
        return _this2.commandManager.getInfo(name);
      });
    }
  }, {
    key: "executeCommand",
    value: function executeCommand(trigger) {
      // Надо переименовать класс CommandTrigger во что-то другое..
      return this.commandManager.tryExecute(trigger);
    }
  }, {
    key: "stop",
    value: function stop() {
      this._stopToken = true;
    }
  }, {
    key: "onread",
    value: function onread(callback) {
      this.on('read', callback);
    }
  }, {
    key: "onwrite",
    value: function onwrite(callback) {
      this.on('write', callback);
    }
  }, {
    key: "onclear",
    value: function onclear(callback) {
      this.on('clear', callback);
    }
  }, {
    key: "out",
    value: function out(message) {
      this.emit('write', message);
    }
  }, {
    key: "ask",
    value: function ask(invitation) {
      var _this3 = this;

      this.emit('read', {
        invitation: invitation,
        question: true
      });
      return new Promise(function (resolve) {
        _this3.on('reply', function (answer) {
          resolve(answer);
        });
      });
    }
  }, {
    key: "reply",
    value: function reply(answer) {
      this.emit('reply', answer);
    }
  }]);

  return BaseIOEntity;
}(EventEmitter_1.default);

exports.default = BaseIOEntity;
},{"../EventEmitter":"ts/lib/EventEmitter.ts","./CommandManager":"ts/lib/base/CommandManager.ts"}],"ts/lib/base/CommandTrigger.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var CommandTrigger =
/*#__PURE__*/
function () {
  function CommandTrigger() {
    _classCallCheck(this, CommandTrigger);

    this.command = '';
    this.arguments = [];
    this.flags = [];
  }

  _createClass(CommandTrigger, null, [{
    key: "getFrom",
    value: function getFrom(source) {
      var trigger = new CommandTrigger();
      var arr = source.trim().split(' ');
      trigger.command = arr[0];
      arr.splice(0, 1);
      trigger.flags = CommandTrigger.refineFlags(arr.filter(function (item) {
        return CommandTrigger.isFlag(item);
      }));
      trigger.arguments = arr.filter(function (item) {
        return !CommandTrigger.isFlag(item);
      });
      return trigger;
    }
  }, {
    key: "isFlag",
    value: function isFlag(value) {
      return /^\-{1,2}/.test(value);
    }
  }, {
    key: "refineFlags",
    value: function refineFlags(flags) {
      var result = [];
      flags.forEach(function (f) {
        var temp = f.substr(1); // Удаляем первый слэш

        if (temp.substr(0, 1) === '-') result.push(temp.substr(1));else result = result.concat(temp.split(''));
      });
      return result;
    }
  }]);

  return CommandTrigger;
}();

exports.default = CommandTrigger;
},{}],"ts/lib/util.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function bind(owner, toBind) {
  if (!(toBind instanceof Array)) toBind = [toBind];
  toBind.forEach(function (method) {
    owner[method.name] = method.bind(owner);
  });
}

exports.bind = bind;

function isError(obj) {
  return obj instanceof Error;
}

exports.isError = isError;

function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

exports.removeAllChildren = removeAllChildren;
},{}],"ts/apps/chat/ChatClient.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var BaseIOEntity_1 = __importDefault(require("../../lib/base/BaseIOEntity"));

var CommandTrigger_1 = __importDefault(require("../../lib/base/CommandTrigger"));

var util_1 = require("../../lib/util");

var ChatClient =
/*#__PURE__*/
function (_BaseIOEntity_1$defau) {
  _inherits(ChatClient, _BaseIOEntity_1$defau);

  _createClass(ChatClient, [{
    key: "connect",
    value: function connect(socket) {
      this._socket = socket;
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      this._socket = undefined;
    }
  }, {
    key: "socket",
    get: function get() {
      return this._socket;
    }
  }]);

  function ChatClient(commands, url) {
    var _this;

    _classCallCheck(this, ChatClient);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ChatClient).call(this, commands));
    _this.url = url;
    _this.in = _this.in.bind(_assertThisInitialized(_this));
    _this.reportErrors = _this.reportErrors.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(ChatClient, [{
    key: "reportErrors",
    value: function reportErrors(output) {
      if (util_1.isError(output)) {
        this.emit('write', output.message);
      }

      return Promise.resolve(output);
    }
  }, {
    key: "_messageTrigger",
    value: function _messageTrigger(message) {
      return {
        command: '@message',
        flags: [],
        arguments: [message]
      };
    }
  }, {
    key: "in",
    value: function _in(input) {
      var _this2 = this;

      var trigger = CommandTrigger_1.default.getFrom(input);
      var error; // Не знаю, как сделать по-другому. Надо разбираться

      this.commandManager.tryExecute(trigger).then(function (output) {
        if (util_1.isError(output)) {
          error = output;
          return _this2.commandManager.tryExecute(_this2._messageTrigger(input)).then(function (output) {
            var res = util_1.isError(output) ? error : undefined; // Это важно! Причина по которой не получилось отправить сообщение
            // Может быть только одна - соединение закрыто, а значит нужно отобразить именно ошибку КОМАНДЫ!

            return Promise.resolve(res);
          });
        } else {
          return Promise.resolve(error);
        }
      }).then(this.reportErrors).then(function () {
        if (!_this2._stopToken) {
          _this2.run();
        }
      });
    }
  }]);

  return ChatClient;
}(BaseIOEntity_1.default);

exports.default = ChatClient;
},{"../../lib/base/BaseIOEntity":"ts/lib/base/BaseIOEntity.ts","../../lib/base/CommandTrigger":"ts/lib/base/CommandTrigger.ts","../../lib/util":"ts/lib/util.ts"}],"ts/views/Line.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var EventEmitter_1 = __importDefault(require("../lib/EventEmitter"));

var Line =
/*#__PURE__*/
function (_EventEmitter_1$defau) {
  _inherits(Line, _EventEmitter_1$defau);

  function Line() {
    var _this;

    _classCallCheck(this, Line);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Line).call(this));
    _this._element = document.createElement('div');

    _this._element.classList.add('line');

    _this._textField = document.createElement('div');

    _this._textField.classList.add('line-content');

    _this._element.appendChild(_this._textField);

    return _this;
  }

  _createClass(Line, [{
    key: "setContent",
    value: function setContent(html) {
      this._textField.innerHTML = html;
    }
  }, {
    key: "element",
    get: function get() {
      return this._element;
    }
  }]);

  return Line;
}(EventEmitter_1.default);

exports.default = Line;
},{"../lib/EventEmitter":"ts/lib/EventEmitter.ts"}],"ts/views/InputLine.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Line_1 = __importDefault(require("./Line"));

var InputLine =
/*#__PURE__*/
function (_Line_1$default) {
  _inherits(InputLine, _Line_1$default);

  function InputLine() {
    var _this;

    var invitation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '>';

    _classCallCheck(this, InputLine);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputLine).call(this));
    var $invitation = document.createElement('div');
    $invitation.textContent = invitation;

    _this._element.insertBefore($invitation, _this._textField);

    var $input = document.createElement('input');
    $input.type = 'text';

    _this._element.insertBefore($input, _this._textField);

    _this._input = $input;

    _this._textField.classList.add('hidden');

    _this.handleKeys = _this.handleKeys.bind(_assertThisInitialized(_this));
    window.addEventListener('keydown', _this.handleKeys);
    return _this;
  }

  _createClass(InputLine, [{
    key: "handleKeys",
    value: function handleKeys(event) {
      var Keys;

      (function (Keys) {
        Keys[Keys["ENTER"] = 13] = "ENTER";
      })(Keys || (Keys = {}));

      ;

      if (event.keyCode === Keys.ENTER && this._input === document.activeElement) {
        this.commit();
      }
    }
  }, {
    key: "commit",
    value: function commit() {
      var value = this._input.value;
      this._textField.innerHTML = this.decorateText(value);

      this._textField.classList.remove('hidden');

      this._input.classList.add('hidden');

      window.removeEventListener('keydown', this.handleKeys);
      this.emit('commit', value);
    }
  }, {
    key: "setContent",
    value: function setContent(html) {
      this._input.value = html;
    }
  }, {
    key: "focus",
    value: function focus() {
      this._input.focus();
    }
  }, {
    key: "decorateText",
    value: function decorateText(sourceStr) {
      return sourceStr; // Пока так.
    }
  }, {
    key: "input",
    get: function get() {
      return this._input;
    }
  }]);

  return InputLine;
}(Line_1.default);

exports.default = InputLine;
},{"./Line":"ts/views/Line.ts"}],"ts/lib/InputSaver.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var InputSaver =
/*#__PURE__*/
function () {
  function InputSaver() {
    _classCallCheck(this, InputSaver);

    this._store = [];
    this._cursor = -1;
    this._limit = 10;
  }

  _createClass(InputSaver, [{
    key: "push",
    value: function push(input) {
      this._store.unshift(input);

      if (this._store.length >= this._limit) {
        this._store.pop();
      }

      this._cursor = -1;
    }
  }, {
    key: "getAll",
    value: function getAll() {
      return this._store.slice(0);
    }
  }, {
    key: "getNext",
    value: function getNext() {
      if (this._store.length === 0) {
        return '';
      } else {
        return this._cursor < this._store.length - 1 ? this._store[++this._cursor] : this._store[this._cursor];
      }
    }
  }, {
    key: "getPrevious",
    value: function getPrevious() {
      if (this._cursor === 0) {
        this._cursor = -1;
        return '';
      } else {
        return this._cursor > -1 ? this._store[--this._cursor] : '';
      }
    }
  }, {
    key: "setLimit",
    value: function setLimit(limit) {
      this._limit = limit;

      if (this._store.length > limit) {
        this._store.splice(this._store.length, limit - this._store.length);
      }

      this._cursor = -1;
    }
  }]);

  return InputSaver;
}();

exports.default = InputSaver;
},{}],"ts/views/Terminal.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Line_1 = __importDefault(require("./Line"));

var InputLine_1 = __importDefault(require("./InputLine"));

var InputSaver_1 = __importDefault(require("../lib/InputSaver"));

var util_1 = require("../lib/util"); // class BaseTerminal {
// }


var Terminal =
/*#__PURE__*/
function () {
  function Terminal(screenSelector) {
    _classCallCheck(this, Terminal);

    this.InputSaver = new InputSaver_1.default();
    var screen = document.querySelector(screenSelector);
    if (screen !== null) this.screen = screen;else throw new Error('invalid selector for console screen');
    this.screen.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('keydown', this.handleKeys.bind(this));
    util_1.bind(this, [this.read, this.write, this.clear]);
  }

  _createClass(Terminal, [{
    key: "attachTo",
    value: function attachTo(obj) {
      if (this.attachedTo) this.deattach();
      obj.onread(this.read);
      obj.onwrite(this.write);
      obj.onclear(this.clear);
      this.attachedTo = obj;
    }
  }, {
    key: "deattach",
    value: function deattach() {
      if (this.attachedTo) {
        this.attachedTo.off('read', this.read);
        this.attachedTo.off('write', this.write);
        this.attachedTo.off('clear', this.clear);
        this.attachedTo = undefined;
      }
    }
  }, {
    key: "read",
    value: function read(event) {
      var _this = this;

      var line = new InputLine_1.default(event.invitation);
      this.screen.appendChild(line.element);
      this.activeLine = line;
      this.activeLine.focus();
      new Promise(function (resolve) {
        line.on('commit', resolve);
      }).then(function (input) {
        _this.InputSaver.push(input);

        return Promise.resolve(input);
      }).then(function (input) {
        if (_this.attachedTo) {
          var callback = event.question ? _this.attachedTo.reply : _this.attachedTo.in;
          callback.call(_this.attachedTo, input);
        } else throw new Error('No IO entity attached!');
      });
    }
  }, {
    key: "write",
    value: function write(html) {
      var line = new Line_1.default();
      line.setContent(html);
      this.screen.appendChild(line.element);
    }
  }, {
    key: "clear",
    value: function clear() {
      while (this.screen.firstChild) {
        var child = this.screen.firstChild;

        if (this.activeLine && child === this.activeLine.input) {
          break;
        }

        this.screen.removeChild(this.screen.firstChild);
      }
    }
  }, {
    key: "handleKeys",
    value: function handleKeys(event) {
      var Keys;

      (function (Keys) {
        Keys[Keys["UP"] = 38] = "UP";
        Keys[Keys["DOWN"] = 40] = "DOWN";
      })(Keys || (Keys = {}));

      ;

      if (this.activeLine) {
        // Input specific actions
        if (event.keyCode === Keys.UP || event.keyCode === Keys.DOWN) {
          var toDisplay = event.keyCode === Keys.UP ? this.InputSaver.getNext() : this.InputSaver.getPrevious();
          this.activeLine.setContent(toDisplay);
        }
      } else {}
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      if (event instanceof MouseEvent) {
        if (this.activeLine) this.activeLine.focus();
      }
    }
  }]);

  return Terminal;
}();

exports.default = Terminal;
},{"./Line":"ts/views/Line.ts","./InputLine":"ts/views/InputLine.ts","../lib/InputSaver":"ts/lib/InputSaver.ts","../lib/util":"ts/lib/util.ts"}],"ts/lib/base/defaultCommands.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function infoCmd(name, aliases) {
  return {
    text: name,
    info: 'Shows info about all avaliable commands of a particual command if specified',
    aliases: aliases,
    validation: function validation(ctx) {
      if (ctx.params.length === 0) return {
        result: true,
        processed: ctx.caller.getAllCommandsInfo()
      };
      if (ctx.params.length === 1) return {
        result: true,
        processed: ctx.caller.getInfo(ctx.params[0])
      };
      return false;
    },
    action: function action(ctx) {
      if (ctx.processed === undefined) {
        ctx.caller.out("Command ".concat(ctx.params[0], " not found"));
      } else if (ctx.processed instanceof Array) {
        ctx.processed.forEach(function (info) {
          ctx.caller.out("".concat(info.name, " : ").concat(info.info));
        });
      } else {
        ctx.caller.out("".concat(ctx.processed.name, " : ").concat(ctx.processed.info));
      }

      return Promise.resolve();
    }
  };
}

exports.infoCmd = infoCmd;

function clearCmd(name, aliases) {
  return {
    text: name,
    aliases: aliases,
    info: 'Clears terminal screen',
    validation: function validation(ctx) {
      return ctx.params.length === 0;
    },
    action: function action(ctx) {
      ctx.caller.emit('clear', {});
      return Promise.resolve();
    }
  };
}

exports.clearCmd = clearCmd;

function exitCmd(name, aliases) {
  return {
    text: name,
    aliases: aliases,
    info: 'Shuts down terminal',
    validation: function validation(ctx) {
      return ctx.params.length === 0;
    },
    action: function action(ctx) {
      ctx.caller.stop();
      return Promise.resolve();
    }
  };
}

exports.exitCmd = exitCmd;
},{}],"ts/apps/chat/commands.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var defaultCommands_1 = require("../../lib/base/defaultCommands");

var CommandTrigger_1 = __importDefault(require("../../lib/base/CommandTrigger"));

exports.commands = [{
  text: '@status',
  aliases: '@st',
  info: 'Shows connection status',
  validation: function validation(ctx) {
    return ctx.params.length === 0;
  },
  action: function action(ctx) {
    var socket = ctx.caller.socket;
    var status = socket ? 'CONNECTED' : 'DISCONNECTED';
    ctx.caller.out("Your are currently <b>".concat(status, "</b>"));
    return Promise.resolve();
  }
}, {
  text: '@connect',
  aliases: '@con',
  info: 'Connects to default server',
  validation: function validation(ctx) {
    return ctx.params.length === 0;
  },
  action: function action(ctx) {
    var socket = ctx.caller.socket;

    if (socket) {
      ctx.caller.out('Your are already connected');
      return Promise.resolve();
    } // Сделать запрос имеи пользователя:


    var client = ctx.caller;
    return client.ask('username').then(function (username) {
      console.log(username);
      var ws = new WebSocket(client.url);
      ctx.caller.out('Connecting...');
      return new Promise(function (resolve) {
        ws.onopen = function () {
          client.connect(ws);
          ctx.caller.executeCommand(CommandTrigger_1.default.getFrom('@clear'));
          ctx.caller.out('Connection successful!');
          ctx.caller.setInvitation('$');
          resolve();
        };

        ws.onclose = function () {
          ctx.caller.out('Disconnected.');
          ctx.caller.dropInvitation();
        };

        ws.onmessage = function (event) {
          ctx.caller.out(event.data);
        };
      });
    });
  }
}, {
  text: '@disconnect',
  aliases: '@dis',
  info: 'Disconnects from current server',
  validation: function validation(ctx) {
    return ctx.params.length === 0;
  },
  action: function action(ctx) {
    var socket = ctx.caller.socket;
    if (!socket) ctx.caller.out('Your are not connected to any server');else {
      socket.close(0, 'disconnection command');
    }
    return Promise.resolve();
  }
}, {
  text: '@message',
  aliases: '@msg',
  info: 'Sends message',
  validation: function validation(ctx) {
    return ctx.params.length === 1;
  },
  action: function action(ctx) {
    var socket = ctx.caller.socket;

    if (!socket) {
      return Promise.resolve(new Error('You are not connected to any server'));
    } else {
      socket.send(ctx.params[0]);
      return Promise.resolve();
    }
  }
}, defaultCommands_1.infoCmd('@info', ['@help', '@?']), defaultCommands_1.clearCmd('@clear', ['@cls']), defaultCommands_1.exitCmd('@exit', ['@quit', '@q'])];
},{"../../lib/base/defaultCommands":"ts/lib/base/defaultCommands.ts","../../lib/base/CommandTrigger":"ts/lib/base/CommandTrigger.ts"}],"main.ts":[function(require,module,exports) {
"use strict"; // import './main.scss';
// import CommandShell from './ts/apps/shell/CommandShell';
// import Terminal from './ts/views/Terminal';
// import { commands } from './ts/apps/shell/commands';

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
}); // const view = new Terminal('.screen');
// const shell = new CommandShell(commands);
// view.attachTo(shell);
// shell.run();

require("./main.scss");

var ChatClient_1 = __importDefault(require("./ts/apps/chat/ChatClient"));

var Terminal_1 = __importDefault(require("./ts/views/Terminal"));

var commands_1 = require("./ts/apps/chat/commands");

var view = new Terminal_1.default('.screen');
var chat = new ChatClient_1.default(commands_1.commands, 'ws://localhost:1200');
view.attachTo(chat);
chat.run();
},{"./main.scss":"main.scss","./ts/apps/chat/ChatClient":"ts/apps/chat/ChatClient.ts","./ts/views/Terminal":"ts/views/Terminal.ts","./ts/apps/chat/commands":"ts/apps/chat/commands.ts"}],"../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "61176" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else {
        window.location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.js.map