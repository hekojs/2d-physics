"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(require("@hekojs/core"));

var _helpers = _interopRequireDefault(require("@hekojs/helpers"));

var _matterJs = _interopRequireDefault(require("matter-js"));

var _Plugin = _interopRequireDefault(require("../Plugin"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var Physics = /*#__PURE__*/function (_Heko$Component) {
  _inherits(Physics, _Heko$Component);

  var _super = _createSuper(Physics);

  function Physics() {
    _classCallCheck(this, Physics);

    return _super.apply(this, arguments);
  }

  _createClass(Physics, [{
    key: "onAdd",
    value: function onAdd() {
      if (!this.body) return false;
      this.body._entityId = this.getEntity()._id;

      _matterJs["default"].World.add(this._getMatterWorld(), this.body);
    }
  }, {
    key: "onRemove",
    value: function onRemove() {
      if (!this.body) return false;

      _matterJs["default"].World.remove(this._getMatterWorld(), this.body);
    }
  }, {
    key: "_getMatterWorld",
    value: function _getMatterWorld() {
      return this.getWorld().plugins.get(_Plugin["default"]).matter.world;
    }
  }, {
    key: "setPosition",
    value: function setPosition() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$x = _ref.x,
          x = _ref$x === void 0 ? null : _ref$x,
          _ref$y = _ref.y,
          y = _ref$y === void 0 ? null : _ref$y;

      if (!this.body) return false;
      if (x === null) x = this.body.position.x;
      if (y === null) y = this.body.position.y;

      _matterJs["default"].Body.setPosition(this.body, {
        x: x,
        y: y
      });
    }
  }, {
    key: "setAngle",
    value: function setAngle(_ref2) {
      var angle = _ref2.angle;
      if (!this.body) return false;
      angle = _helpers["default"].Angle.normalize(angle);

      _matterJs["default"].Body.setAngularVelocity(this.body, 0);

      _matterJs["default"].Body.setAngle(this.body, _helpers["default"].Angle.toRadian(angle));
    }
  }, {
    key: "setVelocity",
    value: function setVelocity() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$x = _ref3.x,
          x = _ref3$x === void 0 ? null : _ref3$x,
          _ref3$y = _ref3.y,
          y = _ref3$y === void 0 ? null : _ref3$y,
          _ref3$angle = _ref3.angle,
          angle = _ref3$angle === void 0 ? null : _ref3$angle;

      if (!this.body) return false;
      if (x === null) x = this.body.velocity.x;
      if (y === null) y = this.body.velocity.y;

      _matterJs["default"].Body.setVelocity(this.body, {
        x: x,
        y: y
      });

      if (angle !== null) {
        this.velocity.angle = angle;

        _matterJs["default"].Body.setAngularVelocity(this.body, angle);
      }
    }
  }, {
    key: "applyForce",
    value: function applyForce(_ref4) {
      var x = _ref4.x,
          y = _ref4.y;
      if (!this.body) return false;

      _matterJs["default"].Body.applyForce(this.body, this.body.position, {
        x: x,
        y: y
      });
    }
  }, {
    key: "onMultiplayerServerUpdate",
    value: function onMultiplayerServerUpdate(_ref5) {
      var position = _ref5.position,
          angle = _ref5.angle,
          velocity = _ref5.velocity;
      this.setPosition(position);
      this.setAngle({
        angle: angle
      });
      this.setVelocity(velocity);
    }
  }], [{
    key: "attributes",
    value: function attributes() {
      return {
        body: null,
        position: new _core["default"].Schema.MapSchema({
          x: 0,
          y: 0
        }),
        angle: 0,
        velocity: new _core["default"].Schema.MapSchema({
          x: 0,
          y: 0,
          angle: 0
        })
      };
    }
  }]);

  return Physics;
}(_core["default"].Component);

exports["default"] = Physics;
Physics.multiplayerSchema = {
  position: {
    map: 'float32'
  },
  angle: 'float32',
  velocity: {
    map: 'float32'
  }
};