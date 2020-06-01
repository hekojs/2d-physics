"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _matterJs = _interopRequireDefault(require("matter-js"));

var _polyDecomp = _interopRequireDefault(require("poly-decomp"));

var _PhysicsComputeWorld = _interopRequireDefault(require("./Systems/PhysicsComputeWorld"));

var _PhysicsComputePositions = _interopRequireDefault(require("./Systems/PhysicsComputePositions"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var app = typeof window !== 'undefined' ? window : global;
app.decomp = _polyDecomp["default"];

var Physics = /*#__PURE__*/function () {
  function Physics(world, options) {
    _classCallCheck(this, Physics);

    this.world = world;
    this.matter = _matterJs["default"].Engine.create();
    this.options = Object.assign({
      setup: function setup() {}
    }, options);
  }

  _createClass(Physics, [{
    key: "onStart",
    value: function onStart() {
      this.options.setup({
        world: this.matter.world
      });
      this.world.systems.add(_PhysicsComputeWorld["default"], {
        physics: this
      });
      this.world.systems.add(_PhysicsComputePositions["default"]);
    }
  }]);

  return Physics;
}();

exports["default"] = Physics;