'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _barchart = require('./components/dashboard/barchart');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var store = configureStore();

_reactDom2.default.render(_react2.default.createElement('makeBarChart', null), document.getElementById('root'));
