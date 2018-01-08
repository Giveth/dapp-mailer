"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var UnsubscribeMessage = function (_React$Component) {
  _inherits(UnsubscribeMessage, _React$Component);

  function UnsubscribeMessage() {
    _classCallCheck(this, UnsubscribeMessage);

    return _possibleConstructorReturn(this, (UnsubscribeMessage.__proto__ || Object.getPrototypeOf(UnsubscribeMessage)).apply(this, arguments));
  }

  _createClass(UnsubscribeMessage, [{
    key: "render",
    value: function render() {
      var message = this.props.message;


      var bodyStyle = {
        color: "white",
        backgroundColor: "#49a79b"
      };

      var containerStyle = {
        marginTop: "150px"
      };

      var imageStyle = {
        margin: "30px",
        width: "150px"
      };

      return React.createElement(
        "html",
        null,
        React.createElement(
          "head",
          null,
          React.createElement(
            "title",
            null,
            "Unsubscribe from Giveth notification emails"
          ),
          React.createElement("meta", { charset: "utf-8" }),
          React.createElement("meta", { name: "viewport", content: "width=device-width, initial-scale=1, shrink-to-fit=no" }),
          React.createElement("link", { rel: "stylesheet", href: "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css", integrity: "sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb", crossOrigin: "anonymous" })
        ),
        React.createElement(
          "body",
          { style: bodyStyle },
          React.createElement(
            "div",
            { className: "container", style: containerStyle },
            React.createElement(
              "center",
              null,
              React.createElement("img", { src: "/giveth-typelogo.svg", width: "150px", style: imageStyle }),
              React.createElement(
                "h2",
                null,
                message
              )
            )
          )
        )
      );
    }
  }]);

  return UnsubscribeMessage;
}(React.Component);

module.exports = UnsubscribeMessage;