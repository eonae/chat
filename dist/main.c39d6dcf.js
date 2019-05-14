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
},{"./bundle-url":"../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"main.scss":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"ts/terminal/Command.ts":[function(require,module,exports) {
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
    this._terminal = caller;
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
        caller: this._terminal,
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
    key: "bindToTerminal",
    value: function bindToTerminal(terminal) {
      if (!this._terminal) this._terminal = terminal;
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

exports.Command = Command;
},{}],"ts/terminal/CommandManager.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Command_1 = require("./Command");

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

        var cmd = new Command_1.Command(def, terminal);

        _this._map.set(cmd.text, cmd);

        cmd.aliases.forEach(function (alias) {
          return _this._map.set(alias, cmd);
        });
      });
    }
  }, {
    key: "tryExecute",
    value: function tryExecute(input) {
      var cmd = this._map.get(input.command);

      return cmd !== undefined ? cmd.exec(input.arguments, input.flags) : Promise.resolve(new Error('Command not found'));
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

exports.CommandManager = CommandManager;
},{"./Command":"ts/terminal/Command.ts"}],"ts/terminal/ParsedInput.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var ParsedInput =
/*#__PURE__*/
function () {
  function ParsedInput() {
    _classCallCheck(this, ParsedInput);

    this.command = '';
    this.arguments = [];
    this.flags = [];
  }

  _createClass(ParsedInput, null, [{
    key: "getFrom",
    value: function getFrom(source) {
      var result = new ParsedInput();
      var arr = source.trim().split(' ');
      result.command = arr[0];
      arr.splice(0, 1);
      result.flags = ParsedInput.refineFlags(arr.filter(function (item) {
        return ParsedInput.isFlag(item);
      }));
      result.arguments = arr.filter(function (item) {
        return !ParsedInput.isFlag(item);
      });
      return result;
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

  return ParsedInput;
}();

exports.default = ParsedInput;
},{}],"ts/lib/Logger.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Logger =
/*#__PURE__*/
function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, [{
    key: "info",
    value: function info(msg) {
      console.log(msg);
    }
  }]);

  return Logger;
}();

exports.Logger = Logger;

var AdvancedLogger =
/*#__PURE__*/
function () {
  function AdvancedLogger() {
    _classCallCheck(this, AdvancedLogger);
  }

  _createClass(AdvancedLogger, [{
    key: "info",
    value: function info(msg) {
      console.log("".concat(Date.now(), " > ").concat(msg));
    }
  }]);

  return AdvancedLogger;
}();

exports.AdvancedLogger = AdvancedLogger;
},{}],"ts/terminal/Terminal.ts":[function(require,module,exports) {
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

var CommandManager_1 = require("./CommandManager");

var ParsedInput_1 = __importDefault(require("./ParsedInput"));

var Logger_1 = require("../lib/Logger");

var Terminal =
/*#__PURE__*/
function () {
  function Terminal(view, commands) {
    _classCallCheck(this, Terminal);

    this._stopToken = false;
    this.commandManager = new CommandManager_1.CommandManager();
    this.logger = new Logger_1.Logger();
    this.view = view;
    this.commandManager.register(commands, this);
    this.readAndExecute = this.readAndExecute.bind(this);
    this.handleCommandOutput = this.handleCommandOutput.bind(this);
    this.newCycle = this.newCycle.bind(this);
  }

  _createClass(Terminal, [{
    key: "use",
    value: function use(dependency) {
      switch (dependency.tag) {
        case 'logger':
          this.logger = dependency;
          break;
      }

      this.logger.info("new ".concat(dependency.tag, " is set"));
    }
  }, {
    key: "readAndExecute",
    value: function readAndExecute() {
      var _this = this;

      return this.view.read().then(function (input) {
        var parsedInput = ParsedInput_1.default.getFrom(input);
        return parsedInput.command ? _this.commandManager.tryExecute(parsedInput) : Promise.resolve();
      });
    }
  }, {
    key: "handleCommandOutput",
    value: function handleCommandOutput(output) {
      if (output instanceof Error) {
        this.view.write(output.message);
      }
    }
  }, {
    key: "newCycle",
    value: function newCycle() {
      return this._stopToken ? Promise.reject('exit') : this.readAndExecute().then(this.handleCommandOutput).then(this.newCycle);
    }
  }, {
    key: "startLoop",
    value: function startLoop() {
      Promise.resolve().then(this.newCycle).catch(function (reason) {
        console.log(reason);
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      this._stopToken = true;
    }
  }, {
    key: "run",
    value: function run() {
      // Запускает в режиме командной строки
      this.view.write("<b><i>Welcome!</i><b>");
      this.startLoop();
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
  }]);

  return Terminal;
}();

exports.Terminal = Terminal;
},{"./CommandManager":"ts/terminal/CommandManager.ts","./ParsedInput":"ts/terminal/ParsedInput.ts","../lib/Logger":"ts/lib/Logger.ts"}],"ts/lib/EventEmitter.ts":[function(require,module,exports) {
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
},{}],"ts/views/Line.ts":[function(require,module,exports) {
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

    _classCallCheck(this, InputLine);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(InputLine).call(this));
    _this.invitation = '>';
    var $invitation = document.createElement('div');
    $invitation.textContent = _this.invitation;

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
},{}],"ts/views/TerminalView.ts":[function(require,module,exports) {
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

var TerminalView =
/*#__PURE__*/
function () {
  function TerminalView(screenSelector) {
    _classCallCheck(this, TerminalView);

    this.InputSaver = new InputSaver_1.default();
    var screen = document.querySelector(screenSelector);
    if (screen !== null) this.screen = screen;else throw new Error('invalid selector for console screen');
    this.screen.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('keydown', this.handleKeys.bind(this));
  }

  _createClass(TerminalView, [{
    key: "read",
    value: function read() {
      var _this = this;

      return new Promise(function (resolve) {
        var line = new InputLine_1.default();

        _this.screen.appendChild(line.element);

        _this.activeLine = line;

        _this.activeLine.focus();

        line.on('commit', resolve);
      }).then(function (input) {
        _this.InputSaver.push(input);

        return Promise.resolve(input);
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
    key: "block",
    value: function block() {
      console.log('TerminalView.block() not implemented!');
    }
  }, {
    key: "unblock",
    value: function unblock() {
      console.log('TerminalView.unblock() not implemented!');
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

  return TerminalView;
}();

exports.TerminalView = TerminalView;
},{"./Line":"ts/views/Line.ts","./InputLine":"ts/views/InputLine.ts","../lib/InputSaver":"ts/lib/InputSaver.ts"}],"ts/terminal/http.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var allowedMethods = ['get', 'delete'];
var allowedContentTypes = [/text\//, /application\/json/];
exports.http = {
  text: 'http',
  aliases: 'req',
  flags: [{
    name: 'window',
    aliases: ['w'],
    type: 'boolean',
    info: 'Opens response in new browser window'
  }],
  validation: function validation(ctx) {
    var method = ctx.params[0];
    if (!method) return {
      result: false,
      error: new Error('No method specified!')
    };else if (allowedMethods.indexOf(method) === -1) return {
      result: false,
      error: new Error("Invalid method: ".concat(method, ". Only ").concat(allowedMethods.join(','), " are allowed"))
    };
    var url = ctx.params[1];
    if (!url) return {
      result: false,
      error: new Error('No url specified!')
    };else if (!isCorrectUrl(url)) return {
      result: false,
      error: new Error("Incorrect url")
    };
    if (ctx.params[2]) return {
      result: false,
      error: new Error("Unknown argument ".concat(ctx.params[2]))
    };
    return {
      result: true,
      processed: {
        url: url,
        method: method
      }
    };
  },
  action: function action(ctx) {
    var init = {
      method: ctx.processed.method,
      mode: 'cors'
    };

    if (ctx.flags['window']) {
      window.open(ctx.processed.url, '_blank');
      return Promise.resolve();
    }

    return fetch(ctx.processed.url, init).then(function (response) {
      var contentType = response.headers.get('Content-Type');

      if (!contentType) {
        ctx.caller.view.write('"Content-Type" header not found');
        return Promise.resolve('');
      } else if (!isAllowedContentType(contentType)) {
        ctx.caller.view.write("Content type \"".concat(contentType, "\" is not supported"));
        return Promise.resolve('');
      } else {
        ctx.caller.view.write("Content-Type: \"".concat(contentType, "\""));
        return response.text();
      }
    }).then(function (data) {
      if (typeof data === 'string') ctx.caller.view.write(data);
    }).catch(function (err) {
      ctx.caller.view.write(err.message);
    });
  }
};

function isCorrectUrl(url) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
  '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

  return pattern.test(url);
}

function isAllowedContentType(contentType) {
  for (var _i = 0, _allowedContentTypes = allowedContentTypes; _i < _allowedContentTypes.length; _i++) {
    var pattern = _allowedContentTypes[_i];
    if (pattern.test(contentType)) return true;
  }

  return false;
}
},{}],"ts/terminal/Commands.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var http_1 = require("./http");

exports.commands = [{
  text: 'clear',
  action: function action(ctx) {
    ctx.caller.view.clear();
    return Promise.resolve();
  },
  validation: function validation(ctx) {
    return ctx.params.length === 0;
  },
  aliases: 'cls',
  info: 'Clears terminal screen'
}, {
  text: 'exit',
  action: function action(ctx) {
    ctx.caller.stop();
    return Promise.resolve();
  },
  validation: function validation(ctx) {
    return ctx.params.length === 0;
  },
  info: 'Shuts down terminal'
}, {
  text: 'info',
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
      ctx.caller.view.write("Command ".concat(ctx.params[0], " not found"));
    } else if (ctx.processed instanceof Array) {
      ctx.processed.forEach(function (info) {
        ctx.caller.view.write("".concat(info.name, " : ").concat(info.info));
      });
    } else {
      ctx.caller.view.write("".concat(ctx.processed.name, " : ").concat(ctx.processed.info));
    }

    return Promise.resolve();
  }
}, http_1.http];
},{"./http":"ts/terminal/http.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./main.scss");

var Terminal_1 = require("./ts/terminal/Terminal");

var TerminalView_1 = require("./ts/views/TerminalView");

var Commands_1 = require("./ts/terminal/Commands");

var terminal = new Terminal_1.Terminal(new TerminalView_1.TerminalView('.screen'), Commands_1.commands);
terminal.run();
},{"./main.scss":"main.scss","./ts/terminal/Terminal":"ts/terminal/Terminal.ts","./ts/views/TerminalView":"ts/views/TerminalView.ts","./ts/terminal/Commands":"ts/terminal/Commands.ts"}],"../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54924" + '/');

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