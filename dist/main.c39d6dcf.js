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
},{"_css_loader":"../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"ts/lib/EventEmitter.ts":[function(require,module,exports) {
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
    _this._invitation = document.createElement('div');
    _this._invitation.textContent = '>';

    _this._element.insertBefore(_this._invitation, _this._textField);

    _this._input = document.createElement('input');
    _this._input.type = 'text';

    _this._input.focus();

    _this._element.insertBefore(_this._input, _this._textField);

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
},{"./Line":"ts/views/Line.ts"}],"ts/Command.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});

var Command =
/*#__PURE__*/
function () {
  function Command(text, action, validation) {
    _classCallCheck(this, Command);

    this.text = text;
    this.action = action;
    this.validation = validation;
    this.aliases = [];
  }

  _createClass(Command, [{
    key: "setAlias",
    value: function setAlias(aliases) {
      this.aliases.concat(aliases);
    }
  }, {
    key: "removeAlias",
    value: function removeAlias(alias) {
      var index = this.aliases.indexOf(alias);

      if (index !== -1) {
        this.aliases.splice(index, 1);
      }
    }
  }, {
    key: "exec",
    value: function exec(params, flags) {
      console.log(params, flags);
      return Promise.resolve(true);
    }
  }]);

  return Command;
}();

exports.default = Command;
},{}],"ts/CommandCollection.ts":[function(require,module,exports) {
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

var CommandCollection =
/*#__PURE__*/
function () {
  function CommandCollection() {
    _classCallCheck(this, CommandCollection);

    this._commands = new Map();
  }

  _createClass(CommandCollection, [{
    key: "add",
    value: function add(arg) {
      if (arg instanceof Command_1.default) {
        this._commands.set(arg.text, arg);
      } else if (arg instanceof CommandCollection) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = arg.commandNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var cmdName = _step.value;
            var cmd = arg.get(cmdName);

            if (!this._commands.has(cmdName) && cmd) {
              this._commands.set(cmdName, cmd);
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
      } else {
        var _cmd = new Command_1.default(arg.text, arg.action, arg.validation);

        _cmd.setAlias(arg.aliases);

        this._commands.set(_cmd.text, _cmd);
      }
    }
  }, {
    key: "get",
    value: function get(cmdName) {
      return this._commands.get(cmdName);
    }
  }, {
    key: "commandNames",
    get: function get() {
      return this._commands.keys();
    }
  }]);

  return CommandCollection;
}();

exports.default = CommandCollection;
},{"./Command":"ts/Command.ts"}],"ts/CommandManager.ts":[function(require,module,exports) {
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

var CommandCollection_1 = __importDefault(require("./CommandCollection"));

var CommandManager =
/*#__PURE__*/
function () {
  function CommandManager() {
    _classCallCheck(this, CommandManager);

    this._commands = new CommandCollection_1.default();
  }

  _createClass(CommandManager, [{
    key: "register",
    value: function register(commands) {
      this._commands.add(commands);
    }
  }, {
    key: "tryExecute",
    value: function tryExecute(input) {
      var cmd = this._commands.get(input.command);

      return cmd !== undefined ? cmd.exec(input.arguments, input.flags) : Promise.resolve(false);
    }
  }]);

  return CommandManager;
}();

exports.default = CommandManager;
},{"./CommandCollection":"ts/CommandCollection.ts"}],"ts/ParsedInput.ts":[function(require,module,exports) {
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
},{}],"ts/Logger.ts":[function(require,module,exports) {
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
},{}],"ts/lib/InputSaver.ts":[function(require,module,exports) {
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

var CommandManager_1 = __importDefault(require("../CommandManager"));

var ParsedInput_1 = __importDefault(require("../ParsedInput"));

var Logger_1 = require("../Logger");

var InputSaver_1 = __importDefault(require("../lib/InputSaver"));

var Terminal =
/*#__PURE__*/
function () {
  function Terminal(screenSelector) {
    _classCallCheck(this, Terminal);

    this._stopToken = false;
    this.activeLine = null;
    this.commandManager = new CommandManager_1.default();
    this.logger = new Logger_1.Logger();
    this.InputSaver = new InputSaver_1.default();
    var screen = document.querySelector(screenSelector);
    if (screen !== null) this.screen = screen;else throw new Error('invalid selector for console screen');
    this.screen.addEventListener('click', this.handleClick.bind(this));
    window.addEventListener('keydown', this.handleKeys.bind(this));
  }

  _createClass(Terminal, [{
    key: "stop",
    value: function stop() {
      this._stopToken = true;
    }
  }, {
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
    key: "registerCommands",
    value: function registerCommands(commands) {
      this.commandManager.register(commands);
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

      if (this.activeLine !== null) {
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
  }, {
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
        _this.logger.info(input);

        _this.InputSaver.push(input);

        return Promise.resolve(input);
      });
    }
  }, {
    key: "startLoop",
    value: function startLoop() {
      var _this2 = this;

      this.read().then(function (input) {
        var parsedInput = ParsedInput_1.default.getFrom(input);
        return _this2.commandManager.tryExecute(parsedInput);
      }).then(function (success) {
        console.log('success: ' + success);

        if (!_this2._stopToken) {
          _this2.startLoop();
        } else {
          _this2._stopToken = false;
        }
      });
    }
  }, {
    key: "run",
    value: function run() {
      // Запускает в режиме командной строки
      this.write("<b><i>Welcome!</i><b>");
      this.startLoop();
    }
  }, {
    key: "write",
    value: function write(html) {
      var line = new Line_1.default();
      line.setContent(html);
      this.screen.appendChild(line.element);
    }
  }]);

  return Terminal;
}();

exports.default = Terminal;
},{"./Line":"ts/views/Line.ts","./InputLine":"ts/views/InputLine.ts","../CommandManager":"ts/CommandManager.ts","../ParsedInput":"ts/ParsedInput.ts","../Logger":"ts/Logger.ts","../lib/InputSaver":"ts/lib/InputSaver.ts"}],"main.ts":[function(require,module,exports) {
"use strict";

var __importDefault = this && this.__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

require("./main.scss");

var Terminal_1 = __importDefault(require("./ts/views/Terminal"));

var CommandCollection_1 = __importDefault(require("./ts/CommandCollection"));

var terminal = new Terminal_1.default('.screen');
var testCommandSet = new CommandCollection_1.default();
testCommandSet.add({
  text: 'test',
  action: function action(params, flags) {
    console.log('test');
  },
  validation: function validation(params, flags) {
    return true;
  },
  aliases: 't'
});
terminal.registerCommands(testCommandSet);
terminal.run();
},{"./main.scss":"main.scss","./ts/views/Terminal":"ts/views/Terminal.ts","./ts/CommandCollection":"ts/CommandCollection.ts"}],"../../../../../Users/Sergey/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "64418" + '/');

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