"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint-disable no-unused-vars */
var Service = function () {
  function Service(options) {
    _classCallCheck(this, Service);

    this.options = options || {};
  }

  _createClass(Service, [{
    key: "find",
    value: function find(params) {
      return Promise.resolve([]);
    }
  }, {
    key: "get",
    value: function get(id, params) {
      return Promise.resolve({
        id: id, text: "A new message with ID: " + id + "!"
      });
    }
  }, {
    key: "create",
    value: function create(data, params) {
      var _this = this;

      if (Array.isArray(data)) {
        return Promise.all(data.map(function (current) {
          return _this.create(current);
        }));
      }

      return Promise.resolve(data);
    }
  }, {
    key: "update",
    value: function update(id, data, params) {
      return Promise.resolve(data);
    }
  }, {
    key: "patch",
    value: function patch(id, data, params) {
      return Promise.resolve(data);
    }
  }, {
    key: "remove",
    value: function remove(id, params) {
      return Promise.resolve({ id: id });
    }
  }]);

  return Service;
}();

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;