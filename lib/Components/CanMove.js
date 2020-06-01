"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _core = _interopRequireDefault(require("@hekojs/core"));

var _helpers = _interopRequireDefault(require("@hekojs/helpers"));

var _matterJs = _interopRequireDefault(require("matter-js"));

var _lodash = _interopRequireDefault(require("lodash"));

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

// TODO
var _default = /*#__PURE__*/function (_Heko$Component) {
  _inherits(_default, _Heko$Component);

  var _super = _createSuper(_default);

  function _default(entity, attributes) {
    var _this;

    _classCallCheck(this, _default);

    _this = _super.call(this, entity);
    _this.speed = 0.01;
    _this.inertia = 0.2;
    _this.options = {
      changeAngle: true
    };

    _this.merge(attributes);

    _this.task = new _helpers["default"].Task();
    _this.moving = false;
    _this.velocity = {
      x: 0,
      y: 0
    };
    return _this;
  }

  _createClass(_default, [{
    key: "toAngle",
    value: function toAngle() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          angle = _ref.angle,
          _ref$speed = _ref.speed,
          speed = _ref$speed === void 0 ? 100 : _ref$speed,
          _ref$options = _ref.options,
          options = _ref$options === void 0 ? {} : _ref$options;

      this.moving = true;

      if (_lodash["default"].merge(this.options, options).changeAngle) {
        this.entity.canRotate.toAngle({
          angle: angle
        });
      }

      this._setVelocity({
        x: Math.cos(_core["default"].Angle.toRadian(angle - 90)) * this.speed * (speed / 100),
        y: Math.sin(_core["default"].Angle.toRadian(angle - 90)) * this.speed * (speed / 100)
      });
    }
  }, {
    key: "toPoint",
    value: function toPoint() {
      var _this2 = this;

      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          x = _ref2.x,
          y = _ref2.y,
          _ref2$options = _ref2.options,
          options = _ref2$options === void 0 ? {} : _ref2$options;

      var angle = _core["default"].Angle.fromPointToPoint(this.entity.hasPosition.x, this.entity.hasPosition.y, x, y); // Accelerate


      this._setVelocity({
        x: Math.cos(_core["default"].Angle.toRadian(angle)) * this.speed,
        y: Math.sin(_core["default"].Angle.toRadian(angle)) * this.speed
      });

      this.task.create(function () {
        // Facing to destination
        var angle = _core["default"].Angle.fromPointToPoint(_this2.entity.hasPosition.x, _this2.entity.hasPosition.y, x, y);

        _this2.toAngle({
          angle: angle,
          options: options
        });

        var distance = _core["default"].Distance.fromPointToPoint(_this2.entity.hasPosition.x, _this2.entity.hasPosition.y, x, y);

        var speed = Math.abs(_this2.velocity.x) + Math.abs(_this2.velocity.y);

        if (distance < speed / 4) {
          _this2.stop();
        }
      });
    }
  }, {
    key: "stop",
    value: function stop() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref3$instant = _ref3.instant,
          instant = _ref3$instant === void 0 ? false : _ref3$instant;

      this.moving = false;
      this.task.stop();
      this.entity.world.gsap.killTweensOf(this.velocity);
      if (instant) this.velocity = {
        x: 0,
        y: 0
      };else this._setVelocity({
        x: 0,
        y: 0
      });
    }
  }, {
    key: "isMoving",
    value: function isMoving() {
      return this.moving;
    }
  }, {
    key: "_setVelocity",
    value: function _setVelocity(_ref4) {
      var x = _ref4.x,
          y = _ref4.y;
      this.entity.world.gsap.killTweensOf(this.velocity);
      this.entity.world.gsap.to(this.velocity, {
        x: x,
        y: y,
        duration: this.inertia
      });
    }
  }, {
    key: "update",
    value: function update(_ref5) {
      var tps = _ref5.tps;
      this.task.update({
        tps: tps
      });
      if (this.velocity.x !== 0) this.entity.components.physics.body.force.x = this.velocity.x / tps;
      if (this.velocity.y !== 0) this.entity.components.physics.body.force.y = this.velocity.y / tps;
    }
  }]);

  return _default;
}(_core["default"].Component);

exports["default"] = _default;
_default["class"] = 'CanMove';