/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _PhantomProperties = __webpack_require__(1);
	
	var _PhantomProperties2 = _interopRequireDefault(_PhantomProperties);
	
	var _jsreportStudio = __webpack_require__(3);
	
	var _jsreportStudio2 = _interopRequireDefault(_jsreportStudio);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_jsreportStudio2.default.addApiSpec({
	  template: {
	    phantomImage: {
	      printDelay: 1000,
	      quality: 100,
	      imageType: 'png',
	      blockJavaScript: false,
	      waitForJS: false
	    }
	  }
	});
	
	_jsreportStudio2.default.addPropertiesComponent('phantom image', _PhantomProperties2.default, function (entity) {
	  return entity.__entitySet === 'templates' && entity.recipe === 'phantom-image';
	});

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _react = __webpack_require__(2);
	
	var _react2 = _interopRequireDefault(_react);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Properties = function (_Component) {
	  _inherits(Properties, _Component);
	
	  function Properties() {
	    _classCallCheck(this, Properties);
	
	    return _possibleConstructorReturn(this, (Properties.__proto__ || Object.getPrototypeOf(Properties)).apply(this, arguments));
	  }
	
	  _createClass(Properties, [{
	    key: 'render',
	    value: function render() {
	      var _props = this.props,
	          entity = _props.entity,
	          onChange = _props.onChange;
	
	      var phantomImage = entity.phantomImage || {};
	
	      var changePhantom = function changePhantom(change) {
	        return onChange(Object.assign({}, entity, { phantomImage: Object.assign({}, entity.phantomImage, change) }));
	      };
	
	      return _react2.default.createElement(
	        'div',
	        { className: 'properties-section' },
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'image type'
	          ),
	          _react2.default.createElement(
	            'select',
	            { value: phantomImage.imageType || 'png', onChange: function onChange(v) {
	                return changePhantom({ imageType: v.target.value });
	              } },
	            _react2.default.createElement(
	              'option',
	              { key: 'png', value: 'png' },
	              'png'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'jpeg', value: 'jpeg' },
	              'jpeg'
	            ),
	            _react2.default.createElement(
	              'option',
	              { key: 'gif', value: 'gif' },
	              'gif'
	            )
	          )
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'quality'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '100', value: phantomImage.quality || '',
	            onChange: function onChange(v) {
	              return changePhantom({ quality: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'print delay'
	          ),
	          _react2.default.createElement('input', {
	            type: 'text', placeholder: '1000', value: phantomImage.printDelay || '',
	            onChange: function onChange(v) {
	              return changePhantom({ printDelay: v.target.value });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            { title: 'window.JSREPORT_READY_TO_START=true;' },
	            'wait for printing trigger'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', title: 'window.JSREPORT_READY_TO_START=true;', checked: phantomImage.waitForJS === true,
	            onChange: function onChange(v) {
	              return changePhantom({ waitForJS: v.target.checked });
	            } })
	        ),
	        _react2.default.createElement(
	          'div',
	          { className: 'form-group' },
	          _react2.default.createElement(
	            'label',
	            null,
	            'block javascript'
	          ),
	          _react2.default.createElement('input', {
	            type: 'checkbox', checked: phantomImage.blockJavaScript === true,
	            onChange: function onChange(v) {
	              return changePhantom({ blockJavaScript: v.target.checked });
	            } })
	        )
	      );
	    }
	  }]);
	
	  return Properties;
	}(_react.Component);
	
	exports.default = Properties;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = Studio.libraries['react'];

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = Studio;

/***/ }
/******/ ]);