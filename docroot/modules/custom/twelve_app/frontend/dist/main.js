/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./components/Filter.vue":
/*!*******************************!*\
  !*** ./components/Filter.vue ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Filter_vue_vue_type_template_id_482b2c93___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Filter.vue?vue&type=template&id=482b2c93& */ \"./components/Filter.vue?vue&type=template&id=482b2c93&\");\n/* harmony import */ var _Filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Filter.vue?vue&type=script&lang=js& */ \"./components/Filter.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _Filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _Filter_vue_vue_type_template_id_482b2c93___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Filter_vue_vue_type_template_id_482b2c93___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"components/Filter.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./components/Filter.vue?");

/***/ }),

/***/ "./components/Filter.vue?vue&type=script&lang=js&":
/*!********************************************************!*\
  !*** ./components/Filter.vue?vue&type=script&lang=js& ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--1!../node_modules/vue-loader/lib??vue-loader-options!./Filter.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./components/Filter.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_Filter_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./components/Filter.vue?");

/***/ }),

/***/ "./components/Filter.vue?vue&type=template&id=482b2c93&":
/*!**************************************************************!*\
  !*** ./components/Filter.vue?vue&type=template&id=482b2c93& ***!
  \**************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Filter_vue_vue_type_template_id_482b2c93___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./Filter.vue?vue&type=template&id=482b2c93& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./components/Filter.vue?vue&type=template&id=482b2c93&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Filter_vue_vue_type_template_id_482b2c93___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Filter_vue_vue_type_template_id_482b2c93___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./components/Filter.vue?");

/***/ }),

/***/ "./components/NameForm.vue":
/*!*********************************!*\
  !*** ./components/NameForm.vue ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NameForm_vue_vue_type_template_id_053476ca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NameForm.vue?vue&type=template&id=053476ca& */ \"./components/NameForm.vue?vue&type=template&id=053476ca&\");\n/* harmony import */ var _NameForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./NameForm.vue?vue&type=script&lang=js& */ \"./components/NameForm.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _NameForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _NameForm_vue_vue_type_template_id_053476ca___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _NameForm_vue_vue_type_template_id_053476ca___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"components/NameForm.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./components/NameForm.vue?");

/***/ }),

/***/ "./components/NameForm.vue?vue&type=script&lang=js&":
/*!**********************************************************!*\
  !*** ./components/NameForm.vue?vue&type=script&lang=js& ***!
  \**********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_NameForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--1!../node_modules/vue-loader/lib??vue-loader-options!./NameForm.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./components/NameForm.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_NameForm_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./components/NameForm.vue?");

/***/ }),

/***/ "./components/NameForm.vue?vue&type=template&id=053476ca&":
/*!****************************************************************!*\
  !*** ./components/NameForm.vue?vue&type=template&id=053476ca& ***!
  \****************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NameForm_vue_vue_type_template_id_053476ca___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./NameForm.vue?vue&type=template&id=053476ca& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./components/NameForm.vue?vue&type=template&id=053476ca&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NameForm_vue_vue_type_template_id_053476ca___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_NameForm_vue_vue_type_template_id_053476ca___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./components/NameForm.vue?");

/***/ }),

/***/ "./components/Spinner.vue":
/*!********************************!*\
  !*** ./components/Spinner.vue ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Spinner_vue_vue_type_template_id_cf6853e4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Spinner.vue?vue&type=template&id=cf6853e4& */ \"./components/Spinner.vue?vue&type=template&id=cf6853e4&\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\nvar script = {}\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\n  script,\n  _Spinner_vue_vue_type_template_id_cf6853e4___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _Spinner_vue_vue_type_template_id_cf6853e4___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"components/Spinner.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./components/Spinner.vue?");

/***/ }),

/***/ "./components/Spinner.vue?vue&type=template&id=cf6853e4&":
/*!***************************************************************!*\
  !*** ./components/Spinner.vue?vue&type=template&id=cf6853e4& ***!
  \***************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Spinner_vue_vue_type_template_id_cf6853e4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./Spinner.vue?vue&type=template&id=cf6853e4& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./components/Spinner.vue?vue&type=template&id=cf6853e4&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Spinner_vue_vue_type_template_id_cf6853e4___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Spinner_vue_vue_type_template_id_cf6853e4___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./components/Spinner.vue?");

/***/ }),

/***/ "./components/TodayProgress.vue":
/*!**************************************!*\
  !*** ./components/TodayProgress.vue ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _TodayProgress_vue_vue_type_template_id_0b6d3c43___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TodayProgress.vue?vue&type=template&id=0b6d3c43& */ \"./components/TodayProgress.vue?vue&type=template&id=0b6d3c43&\");\n/* harmony import */ var _TodayProgress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./TodayProgress.vue?vue&type=script&lang=js& */ \"./components/TodayProgress.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ \"./node_modules/vue-loader/lib/runtime/componentNormalizer.js\");\n\n\n\n\n\n/* normalize component */\n\nvar component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _TodayProgress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n  _TodayProgress_vue_vue_type_template_id_0b6d3c43___WEBPACK_IMPORTED_MODULE_0__[\"render\"],\n  _TodayProgress_vue_vue_type_template_id_0b6d3c43___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"],\n  false,\n  null,\n  null,\n  null\n  \n)\n\n/* hot reload */\nif (false) { var api; }\ncomponent.options.__file = \"components/TodayProgress.vue\"\n/* harmony default export */ __webpack_exports__[\"default\"] = (component.exports);\n\n//# sourceURL=webpack:///./components/TodayProgress.vue?");

/***/ }),

/***/ "./components/TodayProgress.vue?vue&type=script&lang=js&":
/*!***************************************************************!*\
  !*** ./components/TodayProgress.vue?vue&type=script&lang=js& ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_TodayProgress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/babel-loader/lib??ref--1!../node_modules/vue-loader/lib??vue-loader-options!./TodayProgress.vue?vue&type=script&lang=js& */ \"./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./components/TodayProgress.vue?vue&type=script&lang=js&\");\n/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__[\"default\"] = (_node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_TodayProgress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[\"default\"]); \n\n//# sourceURL=webpack:///./components/TodayProgress.vue?");

/***/ }),

/***/ "./components/TodayProgress.vue?vue&type=template&id=0b6d3c43&":
/*!*********************************************************************!*\
  !*** ./components/TodayProgress.vue?vue&type=template&id=0b6d3c43& ***!
  \*********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TodayProgress_vue_vue_type_template_id_0b6d3c43___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!./TodayProgress.vue?vue&type=template&id=0b6d3c43& */ \"./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./components/TodayProgress.vue?vue&type=template&id=0b6d3c43&\");\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TodayProgress_vue_vue_type_template_id_0b6d3c43___WEBPACK_IMPORTED_MODULE_0__[\"render\"]; });\n\n/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_TodayProgress_vue_vue_type_template_id_0b6d3c43___WEBPACK_IMPORTED_MODULE_0__[\"staticRenderFns\"]; });\n\n\n\n//# sourceURL=webpack:///./components/TodayProgress.vue?");

/***/ }),

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ \"vue\");\n/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _components_TodayProgress_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/TodayProgress.vue */ \"./components/TodayProgress.vue\");\n/* harmony import */ var vue_js_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-js-modal */ \"./node_modules/vue-js-modal/dist/index.js\");\n/* harmony import */ var vue_js_modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_js_modal__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\nvue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vue_js_modal__WEBPACK_IMPORTED_MODULE_2___default.a, {\n  dynamic: true,\n  injectModalsContainer: true\n});\nnew vue__WEBPACK_IMPORTED_MODULE_0___default.a({\n  delimiters: ['[{', '}]'],\n  components: {\n    TodayProgress: _components_TodayProgress_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  }\n}).$mount('#twelve_day_progress_app');\nvue__WEBPACK_IMPORTED_MODULE_0___default.a.config.devtools = true;\n\n//# sourceURL=webpack:///./js/script.js?");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./components/Filter.vue?vue&type=script&lang=js&":
/*!**************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./components/Filter.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_NameForm_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/NameForm.vue */ \"./components/NameForm.vue\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n // We expect structure of Options:\n// {\n//    314: {\n//      label: \"30 push up\",\n//      description: \"Do this excercise 5 min\"\n//    },\n//    394: {\n//      label: \" 40 Jumps\",\n//      description: \"Please do 40 jumps in \"\n//  }\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: ['options'],\n  components: {\n    NameForm: _components_NameForm_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"]\n  },\n  data: function data() {\n    return {\n      checked: []\n    };\n  },\n  created: function created() {\n    if (this[\"default\"] != undefined) {\n      this.checked = this[\"default\"].split(',');\n    }\n  },\n  computed: {},\n  methods: {\n    checkExcercise: function checkExcercise() {\n      console.log(this.$parent.userData);\n\n      if (!this.$parent.userData.name) {\n        this.$modal.show(_components_NameForm_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"], null, {\n          name: 'twelve-modal'\n        });\n      }\n    }\n  },\n  watch: {\n    checked: function checked(values) {\n      var returnValues = values;\n\n      if (typeof values == 'string') {\n        returnValues = [values];\n      } // Some of the values could be empty. Clean them up.\n\n\n      var cleanValues = [];\n\n      for (var key in returnValues) {\n        if (returnValues[key] != '') {\n          cleanValues.push(returnValues[key]);\n        }\n      }\n\n      this.$emit('updated-values', cleanValues);\n    }\n  },\n  mounted: function mounted() {\n    jQuery(function () {\n      jQuery('*[data-mh=\"openy-card__item-label\"]').matchHeight();\n    });\n  }\n});\n\n//# sourceURL=webpack:///./components/Filter.vue?./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./components/NameForm.vue?vue&type=script&lang=js&":
/*!****************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./components/NameForm.vue?vue&type=script&lang=js& ***!
  \****************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n//\n//\n//\n//\n//\n//\n//\n//\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  data: function data() {\n    return {\n      username: ''\n    };\n  },\n  methods: {\n    setLogin: function setLogin() {\n      localStorage.userData.name = this.username;\n      this.$modal.hide('twelve-modal');\n    }\n  }\n});\n\n//# sourceURL=webpack:///./components/NameForm.vue?./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./components/TodayProgress.vue?vue&type=script&lang=js&":
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options!./components/TodayProgress.vue?vue&type=script&lang=js& ***!
  \*********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _components_Spinner_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/Spinner.vue */ \"./components/Spinner.vue\");\n/* harmony import */ var _components_Filter_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/Filter.vue */ \"./components/Filter.vue\");\n//\n//\n//\n//\n//\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  props: ['excercises'],\n  data: function data() {\n    return {\n      checkedExcercises: [],\n      userData: {\n        'name': ''\n      },\n      isStepNextDisabled: true\n    };\n  },\n  components: {\n    Spinner: _components_Spinner_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n    MainFilter: _components_Filter_vue__WEBPACK_IMPORTED_MODULE_1__[\"default\"]\n  },\n  mounted: function mounted() {\n    if (localStorage.name) this.userData.name = localStorage.name;\n  },\n  computed: {\n    excercisesOptions: function excercisesOptions() {\n      var options = {};\n      console.log(this.excercises);\n\n      for (var i in this.excercises) {\n        var item = this.excercises[i];\n        options[i] = {\n          'label': item.label,\n          'description': item.description\n        };\n      }\n\n      return options;\n    }\n  }\n});\n\n//# sourceURL=webpack:///./components/TodayProgress.vue?./node_modules/babel-loader/lib??ref--1!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-js-modal/dist/index.js":
/*!*************************************************!*\
  !*** ./node_modules/vue-js-modal/dist/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("!function(e,t){ true?module.exports=t():undefined}(window,function(){return function(n){var i={};function o(e){if(i[e])return i[e].exports;var t=i[e]={i:e,l:!1,exports:{}};return n[e].call(t.exports,t,t.exports,o),t.l=!0,t.exports}return o.m=n,o.c=i,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){\"undefined\"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:\"Module\"}),Object.defineProperty(e,\"__esModule\",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&\"object\"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,\"default\",{enumerable:!0,value:t}),2&e&&\"string\"!=typeof t)for(var i in t)o.d(n,i,function(e){return t[e]}.bind(null,i));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(t,\"a\",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p=\"/dist/\",o(o.s=11)}([function(e,t,n){var i=n(6);\"string\"==typeof i&&(i=[[e.i,i,\"\"]]),i.locals&&(e.exports=i.locals);(0,n(4).default)(\"27d83796\",i,!1,{})},function(e,t,n){var i=n(8);\"string\"==typeof i&&(i=[[e.i,i,\"\"]]),i.locals&&(e.exports=i.locals);(0,n(4).default)(\"0e783494\",i,!1,{})},function(e,t,n){var i=n(10);\"string\"==typeof i&&(i=[[e.i,i,\"\"]]),i.locals&&(e.exports=i.locals);(0,n(4).default)(\"17757f60\",i,!1,{})},function(e,t){e.exports=function(n){var a=[];return a.toString=function(){return this.map(function(e){var t=function(e,t){var n=e[1]||\"\",i=e[3];if(!i)return n;if(t&&\"function\"==typeof btoa){var o=(a=i,\"/*# sourceMappingURL=data:application/json;charset=utf-8;base64,\"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+\" */\"),r=i.sources.map(function(e){return\"/*# sourceURL=\"+i.sourceRoot+e+\" */\"});return[n].concat(r).concat([o]).join(\"\\n\")}var a;return[n].join(\"\\n\")}(e,n);return e[2]?\"@media \"+e[2]+\"{\"+t+\"}\":t}).join(\"\")},a.i=function(e,t){\"string\"==typeof e&&(e=[[null,e,\"\"]]);for(var n={},i=0;i<this.length;i++){var o=this[i][0];\"number\"==typeof o&&(n[o]=!0)}for(i=0;i<e.length;i++){var r=e[i];\"number\"==typeof r[0]&&n[r[0]]||(t&&!r[2]?r[2]=t:t&&(r[2]=\"(\"+r[2]+\") and (\"+t+\")\"),a.push(r))}},a}},function(e,t,n){\"use strict\";function l(e,t){for(var n=[],i={},o=0;o<t.length;o++){var r=t[o],a=r[0],s={id:e+\":\"+o,css:r[1],media:r[2],sourceMap:r[3]};i[a]?i[a].parts.push(s):n.push(i[a]={id:a,parts:[s]})}return n}n.r(t),n.d(t,\"default\",function(){return p});var i=\"undefined\"!=typeof document;if(\"undefined\"!=typeof DEBUG&&DEBUG&&!i)throw new Error(\"vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.\");var u={},o=i&&(document.head||document.getElementsByTagName(\"head\")[0]),r=null,a=0,d=!1,s=function(){},c=null,h=\"data-vue-ssr-id\",f=\"undefined\"!=typeof navigator&&/msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());function p(a,e,t,n){d=t,c=n||{};var s=l(a,e);return m(s),function(e){for(var t=[],n=0;n<s.length;n++){var i=s[n];(o=u[i.id]).refs--,t.push(o)}e?m(s=l(a,e)):s=[];for(n=0;n<t.length;n++){var o;if(0===(o=t[n]).refs){for(var r=0;r<o.parts.length;r++)o.parts[r]();delete u[o.id]}}}}function m(e){for(var t=0;t<e.length;t++){var n=e[t],i=u[n.id];if(i){i.refs++;for(var o=0;o<i.parts.length;o++)i.parts[o](n.parts[o]);for(;o<n.parts.length;o++)i.parts.push(g(n.parts[o]));i.parts.length>n.parts.length&&(i.parts.length=n.parts.length)}else{var r=[];for(o=0;o<n.parts.length;o++)r.push(g(n.parts[o]));u[n.id]={id:n.id,refs:1,parts:r}}}}function v(){var e=document.createElement(\"style\");return e.type=\"text/css\",o.appendChild(e),e}function g(t){var n,i,e=document.querySelector(\"style[\"+h+'~=\"'+t.id+'\"]');if(e){if(d)return s;e.parentNode.removeChild(e)}if(f){var o=a++;e=r||(r=v()),n=w.bind(null,e,o,!1),i=w.bind(null,e,o,!0)}else e=v(),n=function(e,t){var n=t.css,i=t.media,o=t.sourceMap;i&&e.setAttribute(\"media\",i);c.ssrId&&e.setAttribute(h,t.id);o&&(n+=\"\\n/*# sourceURL=\"+o.sources[0]+\" */\",n+=\"\\n/*# sourceMappingURL=data:application/json;base64,\"+btoa(unescape(encodeURIComponent(JSON.stringify(o))))+\" */\");if(e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}.bind(null,e),i=function(){e.parentNode.removeChild(e)};return n(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;n(t=e)}else i()}}var b,y=(b=[],function(e,t){return b[e]=t,b.filter(Boolean).join(\"\\n\")});function w(e,t,n,i){var o=n?\"\":i.css;if(e.styleSheet)e.styleSheet.cssText=y(t,o);else{var r=document.createTextNode(o),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(r,a[t]):e.appendChild(r)}}},function(e,t,n){\"use strict\";var i=n(0);n.n(i).a},function(e,t,n){(e.exports=n(3)(!1)).push([e.i,\"\\n.vue-modal-resizer {\\n  display: block;\\n  overflow: hidden;\\n  position: absolute;\\n  width: 12px;\\n  height: 12px;\\n  right: 0;\\n  bottom: 0;\\n  z-index: 9999999;\\n  background: transparent;\\n  cursor: se-resize;\\n}\\n.vue-modal-resizer::after {\\n  display: block;\\n  position: absolute;\\n  content: '';\\n  background: transparent;\\n  left: 0;\\n  top: 0;\\n  width: 0;\\n  height: 0;\\n  border-bottom: 10px solid #ddd;\\n  border-left: 10px solid transparent;\\n}\\n.vue-modal-resizer.clicked::after {\\n  border-bottom: 10px solid #369be9;\\n}\\n\",\"\"])},function(e,t,n){\"use strict\";var i=n(1);n.n(i).a},function(e,t,n){(e.exports=n(3)(!1)).push([e.i,\"\\n.v--modal-block-scroll {\\n  overflow: hidden;\\n  width: 100vw;\\n}\\n.v--modal-overlay {\\n  position: fixed;\\n  box-sizing: border-box;\\n  left: 0;\\n  top: 0;\\n  width: 100%;\\n  height: 100vh;\\n  background: rgba(0, 0, 0, 0.2);\\n  z-index: 999;\\n  opacity: 1;\\n}\\n.v--modal-overlay.scrollable {\\n  height: 100%;\\n  min-height: 100vh;\\n  overflow-y: auto;\\n  -webkit-overflow-scrolling: touch;\\n}\\n.v--modal-overlay .v--modal-background-click {\\n  width: 100%;\\n  min-height: 100%;\\n  height: auto;\\n}\\n.v--modal-overlay .v--modal-box {\\n  position: relative;\\n  overflow: hidden;\\n  box-sizing: border-box;\\n}\\n.v--modal-overlay.scrollable .v--modal-box {\\n  margin-bottom: 2px;\\n}\\n.v--modal {\\n  background-color: white;\\n  text-align: left;\\n  border-radius: 3px;\\n  box-shadow: 0 20px 60px -2px rgba(27, 33, 58, 0.4);\\n  padding: 0;\\n}\\n.v--modal.v--modal-fullscreen {\\n  width: 100vw;\\n  height: 100vh;\\n  margin: 0;\\n  left: 0;\\n  top: 0;\\n}\\n.v--modal-top-right {\\n  display: block;\\n  position: absolute;\\n  right: 0;\\n  top: 0;\\n}\\n.overlay-fade-enter-active,\\n.overlay-fade-leave-active {\\n  transition: all 0.2s;\\n}\\n.overlay-fade-enter,\\n.overlay-fade-leave-active {\\n  opacity: 0;\\n}\\n.nice-modal-fade-enter-active,\\n.nice-modal-fade-leave-active {\\n  transition: all 0.4s;\\n}\\n.nice-modal-fade-enter,\\n.nice-modal-fade-leave-active {\\n  opacity: 0;\\n  transform: translateY(-20px);\\n}\\n\",\"\"])},function(e,t,n){\"use strict\";var i=n(2);n.n(i).a},function(e,t,n){(e.exports=n(3)(!1)).push([e.i,\"\\n.vue-dialog div {\\n  box-sizing: border-box;\\n}\\n.vue-dialog .dialog-flex {\\n  width: 100%;\\n  height: 100%;\\n}\\n.vue-dialog .dialog-content {\\n  flex: 1 0 auto;\\n  width: 100%;\\n  padding: 15px;\\n  font-size: 14px;\\n}\\n.vue-dialog .dialog-c-title {\\n  font-weight: 600;\\n  padding-bottom: 15px;\\n}\\n.vue-dialog .dialog-c-text {\\n}\\n.vue-dialog .vue-dialog-buttons {\\n  display: flex;\\n  flex: 0 1 auto;\\n  width: 100%;\\n  border-top: 1px solid #eee;\\n}\\n.vue-dialog .vue-dialog-buttons-none {\\n  width: 100%;\\n  padding-bottom: 15px;\\n}\\n.vue-dialog-button {\\n  font-size: 12px !important;\\n  background: transparent;\\n  padding: 0;\\n  margin: 0;\\n  border: 0;\\n  cursor: pointer;\\n  box-sizing: border-box;\\n  line-height: 40px;\\n  height: 40px;\\n  color: inherit;\\n  font: inherit;\\n  outline: none;\\n}\\n.vue-dialog-button:hover {\\n  background: rgba(0, 0, 0, 0.01);\\n}\\n.vue-dialog-button:active {\\n  background: rgba(0, 0, 0, 0.025);\\n}\\n.vue-dialog-button:not(:first-of-type) {\\n  border-left: 1px solid #eee;\\n}\\n\",\"\"])},function(e,t,n){\"use strict\";n.r(t);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n(\"transition\",{attrs:{name:t.overlayTransition}},[t.visibility.overlay?n(\"div\",{ref:\"overlay\",class:t.overlayClass,attrs:{\"aria-expanded\":t.visibility.overlay.toString(),\"data-modal\":t.name}},[n(\"div\",{staticClass:\"v--modal-background-click\",on:{mousedown:function(e){return e.target!==e.currentTarget?null:t.handleBackgroundClick(e)},touchstart:function(e){return e.target!==e.currentTarget?null:t.handleBackgroundClick(e)}}},[n(\"div\",{staticClass:\"v--modal-top-right\"},[t._t(\"top-right\")],2),t._v(\" \"),n(\"transition\",{attrs:{name:t.transition},on:{\"before-enter\":t.beforeTransitionEnter,\"after-enter\":t.afterTransitionEnter,\"after-leave\":t.afterTransitionLeave}},[t.visibility.modal?n(\"div\",{ref:\"modal\",class:t.modalClass,style:t.modalStyle},[t._t(\"default\"),t._v(\" \"),t.resizable&&!t.isAutoHeight?n(\"resizer\",{attrs:{\"min-width\":t.minWidth,\"min-height\":t.minHeight,\"max-width\":t.maxWidth,\"max-height\":t.maxHeight},on:{resize:t.handleModalResize}}):t._e()],2):t._e()])],1)]):t._e()])},o=function(){var e=this.$createElement;return(this._self._c||e)(\"div\",{class:this.className})};function r(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){var n=[],i=!0,o=!1,r=void 0;try{for(var a,s=e[Symbol.iterator]();!(i=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);i=!0);}catch(e){o=!0,r=e}finally{try{i||null==s.return||s.return()}finally{if(o)throw r}}return n}(e,t)||function(){throw new TypeError(\"Invalid attempt to destructure non-iterable instance\")}()}function a(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},i=Object.keys(n);\"function\"==typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(n).filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),i.forEach(function(e){s(t,e,n[e])})}return t}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}o._withStripped=i._withStripped=!0;var l=function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:0;return function(){return(e++).toString()}}(),d=function(e,t,n){return n<e?e:t<n?t:n},u=function(){var e=window.innerWidth,t=document.documentElement.clientWidth;return e&&t?Math.min(e,t):t||e},c={name:\"VueJsModalResizer\",props:{minHeight:{type:Number,default:0},minWidth:{type:Number,default:0},maxWidth:{type:Number,default:Number.MAX_SAFE_INTEGER},maxHeight:{type:Number,default:Number.MAX_SAFE_INTEGER}},data:function(){return{clicked:!1,size:{}}},mounted:function(){this.$el.addEventListener(\"mousedown\",this.start,!1)},computed:{className:function(){return{\"vue-modal-resizer\":!0,clicked:this.clicked}}},methods:{start:function(e){this.clicked=!0,window.addEventListener(\"mousemove\",this.mousemove,!1),window.addEventListener(\"mouseup\",this.stop,!1),e.stopPropagation(),e.preventDefault()},stop:function(){this.clicked=!1,window.removeEventListener(\"mousemove\",this.mousemove,!1),window.removeEventListener(\"mouseup\",this.stop,!1),this.$emit(\"resize-stop\",{element:this.$el.parentElement,size:this.size})},mousemove:function(e){this.resize(e)},resize:function(e){var t=this.$el.parentElement;if(t){var n=e.clientX-t.offsetLeft,i=e.clientY-t.offsetTop,o=Math.min(u(),this.maxWidth),r=Math.min(window.innerHeight,this.maxHeight);n=d(this.minWidth,o,n),i=d(this.minHeight,r,i),this.size={width:n,height:i},t.style.width=n+\"px\",t.style.height=i+\"px\",this.$emit(\"resize\",{element:t,size:this.size})}}}};n(5);function h(e,t,n,i,o,r,a,s){var l,u=\"function\"==typeof e?e.options:e;if(t&&(u.render=t,u.staticRenderFns=n,u._compiled=!0),i&&(u.functional=!0),r&&(u._scopeId=\"data-v-\"+r),a?(l=function(e){(e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||\"undefined\"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),o&&o.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(a)},u._ssrRegister=l):o&&(l=s?function(){o.call(this,this.$root.$options.shadowRoot)}:o),l)if(u.functional){u._injectStyles=l;var d=u.render;u.render=function(e,t){return l.call(t),d(e,t)}}else{var c=u.beforeCreate;u.beforeCreate=c?[].concat(c,l):[l]}return{exports:e,options:u}}var f=h(c,o,[],!1,null,null,null);f.options.__file=\"src/Resizer.vue\";var p=f.exports;function m(e){return(m=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&\"function\"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?\"symbol\":typeof e})(e)}var v=\"[-+]?[0-9]*.?[0-9]+\",g=[{name:\"px\",regexp:new RegExp(\"^\".concat(v,\"px$\"))},{name:\"%\",regexp:new RegExp(\"^\".concat(v,\"%$\"))},{name:\"px\",regexp:new RegExp(\"^\".concat(v,\"$\"))}],b=function(e){switch(m(e)){case\"number\":return{type:\"px\",value:e};case\"string\":return function(e){if(\"auto\"===e)return{type:e,value:0};for(var t=0;t<g.length;t++){var n=g[t];if(n.regexp.test(e))return{type:n.name,value:parseFloat(e)}}return{type:\"\",value:e}}(e);default:return{type:\"\",value:e}}},y=function(e){if(\"string\"!=typeof e)return 0<=e;var t=b(e);return(\"%\"===t.type||\"px\"===t.type)&&0<t.value};var w={name:\"VueJsModal\",props:{name:{required:!0,type:String},delay:{type:Number,default:0},resizable:{type:Boolean,default:!1},adaptive:{type:Boolean,default:!1},draggable:{type:[Boolean,String],default:!1},scrollable:{type:Boolean,default:!1},reset:{type:Boolean,default:!1},overlayTransition:{type:String,default:\"overlay-fade\"},transition:{type:String},clickToClose:{type:Boolean,default:!0},classes:{type:[String,Array],default:\"v--modal\"},styles:{type:[String,Array,Object]},minWidth:{type:Number,default:0,validator:function(e){return 0<=e}},minHeight:{type:Number,default:0,validator:function(e){return 0<=e}},maxWidth:{type:Number,default:Number.MAX_SAFE_INTEGER},maxHeight:{type:Number,default:Number.MAX_SAFE_INTEGER},width:{type:[Number,String],default:600,validator:y},height:{type:[Number,String],default:300,validator:function(e){return\"auto\"===e||y(e)}},pivotX:{type:Number,default:.5,validator:function(e){return 0<=e&&e<=1}},pivotY:{type:Number,default:.5,validator:function(e){return 0<=e&&e<=1}}},components:{Resizer:p},data:function(){return{visible:!1,visibility:{modal:!1,overlay:!1},shift:{left:0,top:0},modal:{width:0,widthType:\"px\",height:0,heightType:\"px\",renderedHeight:0},viewport:{width:0,height:0},mutationObserver:null}},created:function(){this.setInitialSize()},beforeMount:function(){var t=this;if(L.event.$on(\"toggle\",this.handleToggleEvent),window.addEventListener(\"resize\",this.handleWindowResize),this.handleWindowResize(),this.scrollable&&!this.isAutoHeight&&console.warn('Modal \"'.concat(this.name,'\" has scrollable flag set to true ')+'but height is not \"auto\" ('.concat(this.height,\")\")),this.isAutoHeight){var e=function(){if(\"undefined\"!=typeof window)for(var e=[\"\",\"WebKit\",\"Moz\",\"O\",\"Ms\"],t=0;t<e.length;t++){var n=e[t]+\"MutationObserver\";if(n in window)return window[n]}return!1}();e?this.mutationObserver=new e(function(e){t.updateRenderedHeight()}):console.warn(\"MutationObserver was not found. Vue-js-modal automatic resizing relies heavily on MutationObserver. Please make sure to provide shim for it.\")}this.clickToClose&&window.addEventListener(\"keyup\",this.handleEscapeKeyUp)},beforeDestroy:function(){L.event.$off(\"toggle\",this.handleToggleEvent),window.removeEventListener(\"resize\",this.handleWindowResize),this.clickToClose&&window.removeEventListener(\"keyup\",this.handleEscapeKeyUp),this.scrollable&&document.body.classList.remove(\"v--modal-block-scroll\")},computed:{isAutoHeight:function(){return\"auto\"===this.modal.heightType},position:function(){var e=this.viewport,t=this.shift,n=this.pivotX,i=this.pivotY,o=this.trueModalWidth,r=this.trueModalHeight,a=e.width-o,s=e.height-r,l=t.left+n*a,u=t.top+i*s;return{left:parseInt(d(0,a,l)),top:parseInt(d(0,s,u))}},trueModalWidth:function(){var e=this.viewport,t=this.modal,n=this.adaptive,i=this.minWidth,o=this.maxWidth,r=\"%\"===t.widthType?e.width/100*t.width:t.width,a=Math.max(i,Math.min(e.width,o));return n?d(i,a,r):r},trueModalHeight:function(){var e=this.viewport,t=this.modal,n=this.isAutoHeight,i=this.adaptive,o=this.minHeight,r=this.maxHeight,a=\"%\"===t.heightType?e.height/100*t.height:t.height;if(n)return this.modal.renderedHeight;var s=Math.max(o,Math.min(e.height,r));return i?d(o,s,a):a},overlayClass:function(){return{\"v--modal-overlay\":!0,scrollable:this.scrollable&&this.isAutoHeight}},modalClass:function(){return[\"v--modal-box\",this.classes]},stylesProp:function(){return\"string\"==typeof this.styles?this.styles.split(\";\").map(function(e){return e.trim()}).filter(Boolean).map(function(e){return e.split(\":\")}).reduce(function(e,t){var n=r(t,2);return a({},e,s({},n[0],n[1]))},{}):this.styles},modalStyle:function(){return[this.stylesProp,{top:this.position.top+\"px\",left:this.position.left+\"px\",width:this.trueModalWidth+\"px\",height:this.isAutoHeight?\"auto\":this.trueModalHeight+\"px\"}]}},watch:{visible:function(e){var t=this;e?(this.visibility.overlay=!0,setTimeout(function(){t.visibility.modal=!0,t.$nextTick(function(){t.addDraggableListeners(),t.callAfterEvent(!0)})},this.delay)):(this.visibility.modal=!1,setTimeout(function(){t.visibility.overlay=!1,t.$nextTick(function(){t.removeDraggableListeners(),t.callAfterEvent(!1)})},this.delay))}},methods:{handleToggleEvent:function(e,t,n){if(this.name===e){var i=void 0===t?!this.visible:t;this.toggle(i,n)}},setInitialSize:function(){var e=this.modal,t=b(this.width),n=b(this.height);e.width=t.value,e.widthType=t.type,e.height=n.value,e.heightType=n.type},handleEscapeKeyUp:function(e){27===e.which&&this.visible&&this.$modal.hide(this.name)},handleWindowResize:function(){this.viewport.width=u(),this.viewport.height=window.innerHeight,this.ensureShiftInWindowBounds()},createModalEvent:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};return a({id:l(),timestamp:Date.now(),canceled:!1},e)}(function(o){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},t=Object.keys(r);\"function\"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),t.forEach(function(e){var t,n,i;t=o,i=r[n=e],n in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i})}return o}({name:this.name,ref:this.$refs.modal},e))},handleModalResize:function(e){this.modal.widthType=\"px\",this.modal.width=e.size.width,this.modal.heightType=\"px\",this.modal.height=e.size.height;var t=this.modal.size;this.$emit(\"resize\",this.createModalEvent({size:t}))},toggle:function(e,t){var n=this.reset,i=this.scrollable,o=this.visible;if(o!==e){var r=o?\"before-close\":\"before-open\";\"before-open\"===r?(\"undefined\"!=typeof document&&document.activeElement&&\"BODY\"!==document.activeElement.tagName&&document.activeElement.blur&&document.activeElement.blur(),n&&(this.setInitialSize(),this.shift.left=0,this.shift.top=0),i&&document.body.classList.add(\"v--modal-block-scroll\")):i&&document.body.classList.remove(\"v--modal-block-scroll\");var a=!1,s=this.createModalEvent({stop:function(){a=!0},state:e,params:t});this.$emit(r,s),a||(this.visible=e)}},getDraggableElement:function(){var e=\"string\"!=typeof this.draggable?\".v--modal-box\":this.draggable;return e?this.$refs.overlay.querySelector(e):null},handleBackgroundClick:function(){this.clickToClose&&this.toggle(!1)},callAfterEvent:function(e){e?this.connectObserver():this.disconnectObserver();var t=e?\"opened\":\"closed\",n=this.createModalEvent({state:e});this.$emit(t,n)},addDraggableListeners:function(){var r=this;if(this.draggable){var e=this.getDraggableElement();if(e){var a=0,s=0,l=0,u=0,d=function(e){return e.touches&&0<e.touches.length?e.touches[0]:e},t=function(e){var t=e.target;if(!t||\"INPUT\"!==t.nodeName&&\"TEXTAREA\"!==t.nodeName){var n=d(e),i=n.clientX,o=n.clientY;document.addEventListener(\"mousemove\",c),document.addEventListener(\"touchmove\",c),document.addEventListener(\"mouseup\",h),document.addEventListener(\"touchend\",h),a=i,s=o,l=r.shift.left,u=r.shift.top}},c=function(e){var t=d(e),n=t.clientX,i=t.clientY;r.shift.left=l+n-a,r.shift.top=u+i-s,e.preventDefault()},h=function e(t){r.ensureShiftInWindowBounds(),document.removeEventListener(\"mousemove\",c),document.removeEventListener(\"touchmove\",c),document.removeEventListener(\"mouseup\",e),document.removeEventListener(\"touchend\",e),t.preventDefault()};e.addEventListener(\"mousedown\",t),e.addEventListener(\"touchstart\",t)}}},removeDraggableListeners:function(){},updateRenderedHeight:function(){this.$refs.modal&&(this.modal.renderedHeight=this.$refs.modal.getBoundingClientRect().height)},connectObserver:function(){this.mutationObserver&&this.mutationObserver.observe(this.$refs.overlay,{childList:!0,attributes:!0,subtree:!0})},disconnectObserver:function(){this.mutationObserver&&this.mutationObserver.disconnect()},beforeTransitionEnter:function(){this.connectObserver()},afterTransitionEnter:function(){},afterTransitionLeave:function(){},ensureShiftInWindowBounds:function(){var e=this.viewport,t=this.shift,n=this.pivotX,i=this.pivotY,o=this.trueModalWidth,r=this.trueModalHeight,a=e.width-o,s=e.height-r,l=t.left+n*a,u=t.top+i*s;this.shift.left-=l-d(0,a,l),this.shift.top-=u-d(0,s,u)}}},x=(n(7),h(w,i,[],!1,null,null,null));x.options.__file=\"src/Modal.vue\";var E=x.exports,_=function(){var n=this,e=n.$createElement,i=n._self._c||e;return i(\"modal\",{attrs:{name:\"dialog\",height:\"auto\",classes:[\"v--modal\",\"vue-dialog\",this.params.class],width:n.width,\"pivot-y\":.3,adaptive:!0,clickToClose:n.clickToClose,transition:n.transition},on:{\"before-open\":n.beforeOpened,\"before-close\":n.beforeClosed,opened:function(e){n.$emit(\"opened\",e)},closed:function(e){n.$emit(\"closed\",e)}}},[i(\"div\",{staticClass:\"dialog-content\"},[n.params.title?i(\"div\",{staticClass:\"dialog-c-title\",domProps:{innerHTML:n._s(n.params.title||\"\")}}):n._e(),n._v(\" \"),n.params.component?i(n.params.component,n._b({tag:\"component\"},\"component\",n.params.props,!1)):i(\"div\",{staticClass:\"dialog-c-text\",domProps:{innerHTML:n._s(n.params.text||\"\")}})],1),n._v(\" \"),n.buttons?i(\"div\",{staticClass:\"vue-dialog-buttons\"},n._l(n.buttons,function(e,t){return i(\"button\",{key:t,class:e.class||\"vue-dialog-button\",style:n.buttonStyle,attrs:{type:\"button\"},domProps:{innerHTML:n._s(e.title)},on:{click:function(e){e.stopPropagation(),n.click(t,e)}}},[n._v(\"\\n      \"+n._s(e.title)+\"\\n    \")])})):i(\"div\",{staticClass:\"vue-dialog-buttons-none\"})])};_._withStripped=!0;var S={name:\"VueJsDialog\",props:{width:{type:[Number,String],default:400},clickToClose:{type:Boolean,default:!0},transition:{type:String,default:\"fade\"}},data:function(){return{params:{},defaultButtons:[{title:\"CLOSE\"}]}},computed:{buttons:function(){return this.params.buttons||this.defaultButtons},buttonStyle:function(){return{flex:\"1 1 \".concat(100/this.buttons.length,\"%\")}}},methods:{beforeOpened:function(e){window.addEventListener(\"keyup\",this.onKeyUp),this.params=e.params||{},this.$emit(\"before-opened\",e)},beforeClosed:function(e){window.removeEventListener(\"keyup\",this.onKeyUp),this.params={},this.$emit(\"before-closed\",e)},click:function(e,t){var n=2<arguments.length&&void 0!==arguments[2]?arguments[2]:\"click\",i=this.buttons[e];i&&\"function\"==typeof i.handler?i.handler(e,t,{source:n}):this.$modal.hide(\"dialog\")},onKeyUp:function(e){if(13===e.which&&0<this.buttons.length){var t=1===this.buttons.length?0:this.buttons.findIndex(function(e){return e.default});-1!==t&&this.click(t,e,\"keypress\")}}}},O=(n(9),h(S,_,[],!1,null,null,null));O.options.__file=\"src/Dialog.vue\";var k=O.exports,T=function(){var n=this,e=n.$createElement,i=n._self._c||e;return i(\"div\",{attrs:{id:\"modals-container\"}},n._l(n.modals,function(t){return i(\"modal\",n._g(n._b({key:t.id,on:{closed:function(e){n.remove(t.id)}}},\"modal\",t.modalAttrs,!1),t.modalListeners),[i(t.component,n._g(n._b({tag:\"component\",on:{close:function(e){n.$modal.hide(t.modalAttrs.name)}}},\"component\",t.componentAttrs,!1),n.$listeners))],1)}))};T._withStripped=!0;var M=h({data:function(){return{modals:[]}},created:function(){this.$root._dynamicContainer=this},methods:{add:function(e){var t=this,n=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{},i=2<arguments.length&&void 0!==arguments[2]?arguments[2]:{},o=3<arguments.length&&void 0!==arguments[3]?arguments[3]:{},r=l(),a=i.name||\"_dynamic_modal_\"+r;this.modals.push({id:r,modalAttrs:function(o){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},t=Object.keys(r);\"function\"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),t.forEach(function(e){var t,n,i;t=o,i=r[n=e],n in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i})}return o}({},i,{name:a}),modalListeners:o,component:e,componentAttrs:n}),this.$nextTick(function(){t.$modal.show(a)})},remove:function(t){var e=this.modals.findIndex(function(e){return e.id===t});-1!==e&&this.modals.splice(e,1)}}},T,[],!1,null,null,null);M.options.__file=\"src/ModalsContainer.vue\";var C=M.exports;function $(e){return($=\"function\"==typeof Symbol&&\"symbol\"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&\"function\"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?\"symbol\":typeof e})(e)}n.d(t,\"getModalsContainer\",function(){return j});var j=function(e,t,n){if(!n._dynamicContainer&&t.injectModalsContainer){var i=(o=document.createElement(\"div\"),document.body.appendChild(o),o);new e({parent:n,render:function(e){return e(C)}}).$mount(i)}var o;return n._dynamicContainer},z={install:function(a){var s=1<arguments.length&&void 0!==arguments[1]?arguments[1]:{};if(!this.installed){this.installed=!0,this.event=new a,this.rootInstance=null;var e=s.componentName||\"Modal\",l=s.dynamicDefaults||{},o=function(e,t,n,i){var o=n&&n.root?n.root:z.rootInstance,r=j(a,s,o);r?r.add(e,t,function(o){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{},t=Object.keys(r);\"function\"==typeof Object.getOwnPropertySymbols&&(t=t.concat(Object.getOwnPropertySymbols(r).filter(function(e){return Object.getOwnPropertyDescriptor(r,e).enumerable}))),t.forEach(function(e){var t,n,i;t=o,i=r[n=e],n in t?Object.defineProperty(t,n,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[n]=i})}return o}({},l,n),i):console.warn(\"[vue-js-modal] In order to render dynamic modals, a <modals-container> component must be present on the page.\")};a.prototype.$modal={show:function(e){for(var t=arguments.length,n=new Array(1<t?t-1:0),i=1;i<t;i++)n[i-1]=arguments[i];switch($(e)){case\"string\":return function(e,t){z.event.$emit(\"toggle\",e,!0,t)}.apply(void 0,[e].concat(n));case\"object\":case\"function\":return s.dynamic?o.apply(void 0,[e].concat(n)):console.warn(\"[vue-js-modal] $modal() received object as a first argument, but dynamic modals are switched off. https://github.com/euvl/vue-js-modal/#dynamic-modals\");default:console.warn(\"[vue-js-modal] $modal() received an unsupported argument as a first argument.\",e)}},hide:function(e,t){z.event.$emit(\"toggle\",e,!1,t)},toggle:function(e,t){z.event.$emit(\"toggle\",e,void 0,t)}},a.component(e,E),s.dialog&&a.component(\"VDialog\",k),s.dynamic&&(a.component(\"ModalsContainer\",C),a.mixin({beforeMount:function(){null===z.rootInstance&&(z.rootInstance=this.$root)}}))}}},L=t.default=z}])});\n\n//# sourceURL=webpack:///./node_modules/vue-js-modal/dist/index.js?");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./components/Filter.vue?vue&type=template&id=482b2c93&":
/*!********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/Filter.vue?vue&type=template&id=482b2c93& ***!
  \********************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    { staticClass: \"activity-finder__step_content container\" },\n    _vm._l(_vm.options, function(item) {\n      return _c(\"div\", { on: { click: _vm.checkExcercise } }, [\n        _c(\"div\", { staticClass: \"today-progress-item\" }, [\n          _c(\"input\", {\n            directives: [\n              {\n                name: \"model\",\n                rawName: \"v-model\",\n                value: _vm.checked,\n                expression: \"checked\"\n              }\n            ],\n            attrs: {\n              type: \"checkbox\",\n              eclass: \"\",\n              name: \"today-progress-checkboxes\"\n            },\n            domProps: {\n              checked: Array.isArray(_vm.checked)\n                ? _vm._i(_vm.checked, null) > -1\n                : _vm.checked\n            },\n            on: {\n              change: function($event) {\n                var $$a = _vm.checked,\n                  $$el = $event.target,\n                  $$c = $$el.checked ? true : false\n                if (Array.isArray($$a)) {\n                  var $$v = null,\n                    $$i = _vm._i($$a, $$v)\n                  if ($$el.checked) {\n                    $$i < 0 && (_vm.checked = $$a.concat([$$v]))\n                  } else {\n                    $$i > -1 &&\n                      (_vm.checked = $$a\n                        .slice(0, $$i)\n                        .concat($$a.slice($$i + 1)))\n                  }\n                } else {\n                  _vm.checked = $$c\n                }\n              }\n            }\n          }),\n          _vm._v(\" \"),\n          _c(\"div\", { staticClass: \"title\" }, [_vm._v(_vm._s(item.label))]),\n          _vm._v(\" \"),\n          _c(\"div\", { staticClass: \"description\" }, [\n            _vm._v(_vm._s(item.description))\n          ])\n        ])\n      ])\n    }),\n    0\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./components/Filter.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./components/NameForm.vue?vue&type=template&id=053476ca&":
/*!**********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/NameForm.vue?vue&type=template&id=053476ca& ***!
  \**********************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"div\", { staticClass: \"introduce-form\" }, [\n    _c(\"div\", [_vm._v(\"Please, introduce yourself:\")]),\n    _vm._v(\" \"),\n    _c(\"input\", {\n      directives: [\n        {\n          name: \"model\",\n          rawName: \"v-model\",\n          value: _vm.username,\n          expression: \"username\"\n        }\n      ],\n      staticClass: \"username\",\n      attrs: { type: \"text\", name: \"username\" },\n      domProps: { value: _vm.username },\n      on: {\n        input: function($event) {\n          if ($event.target.composing) {\n            return\n          }\n          _vm.username = $event.target.value\n        }\n      }\n    }),\n    _vm._v(\" \"),\n    _vm.username !== \"\"\n      ? _c(\"input\", {\n          attrs: { type: \"button\", value: \"Go\" },\n          on: { click: _vm.setLogin }\n        })\n      : _vm._e()\n  ])\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./components/NameForm.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./components/Spinner.vue?vue&type=template&id=cf6853e4&":
/*!*********************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/Spinner.vue?vue&type=template&id=cf6853e4& ***!
  \*********************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"svg\",\n    {\n      staticClass: \"spinner\",\n      attrs: {\n        viewBox: \"0 0 50 50\",\n        \"data-size\": \"small\",\n        \"data-flow\": \"inline\"\n      }\n    },\n    [\n      _c(\"circle\", {\n        staticClass: \"path\",\n        attrs: {\n          cx: \"25\",\n          cy: \"25\",\n          r: \"20\",\n          fill: \"none\",\n          \"stroke-width\": \"5\",\n          stroke: \"#93bfec\"\n        }\n      })\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./components/Spinner.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./components/TodayProgress.vue?vue&type=template&id=0b6d3c43&":
/*!***************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./components/TodayProgress.vue?vue&type=template&id=0b6d3c43& ***!
  \***************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\"main-filter\", { attrs: { options: _vm.excercisesOptions } })\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\n\n\n//# sourceURL=webpack:///./components/TodayProgress.vue?./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options");

/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return normalizeComponent; });\n/* globals __VUE_SSR_CONTEXT__ */\n\n// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).\n// This module is a runtime utility for cleaner component module output and will\n// be included in the final webpack user bundle.\n\nfunction normalizeComponent (\n  scriptExports,\n  render,\n  staticRenderFns,\n  functionalTemplate,\n  injectStyles,\n  scopeId,\n  moduleIdentifier, /* server only */\n  shadowMode /* vue-cli only */\n) {\n  // Vue.extend constructor export interop\n  var options = typeof scriptExports === 'function'\n    ? scriptExports.options\n    : scriptExports\n\n  // render functions\n  if (render) {\n    options.render = render\n    options.staticRenderFns = staticRenderFns\n    options._compiled = true\n  }\n\n  // functional template\n  if (functionalTemplate) {\n    options.functional = true\n  }\n\n  // scopedId\n  if (scopeId) {\n    options._scopeId = 'data-v-' + scopeId\n  }\n\n  var hook\n  if (moduleIdentifier) { // server build\n    hook = function (context) {\n      // 2.3 injection\n      context =\n        context || // cached call\n        (this.$vnode && this.$vnode.ssrContext) || // stateful\n        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional\n      // 2.2 with runInNewContext: true\n      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {\n        context = __VUE_SSR_CONTEXT__\n      }\n      // inject component styles\n      if (injectStyles) {\n        injectStyles.call(this, context)\n      }\n      // register component module identifier for async chunk inferrence\n      if (context && context._registeredComponents) {\n        context._registeredComponents.add(moduleIdentifier)\n      }\n    }\n    // used by ssr in case component is cached and beforeCreate\n    // never gets called\n    options._ssrRegister = hook\n  } else if (injectStyles) {\n    hook = shadowMode\n      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }\n      : injectStyles\n  }\n\n  if (hook) {\n    if (options.functional) {\n      // for template-only hot-reload because in that case the render fn doesn't\n      // go through the normalizer\n      options._injectStyles = hook\n      // register for functional component in vue file\n      var originalRender = options.render\n      options.render = function renderWithStyleInjection (h, context) {\n        hook.call(context)\n        return originalRender(h, context)\n      }\n    } else {\n      // inject component registration as beforeCreate hook\n      var existing = options.beforeCreate\n      options.beforeCreate = existing\n        ? [].concat(existing, hook)\n        : [hook]\n    }\n  }\n\n  return {\n    exports: scriptExports,\n    options: options\n  }\n}\n\n\n//# sourceURL=webpack:///./node_modules/vue-loader/lib/runtime/componentNormalizer.js?");

/***/ }),

/***/ 0:
/*!****************************!*\
  !*** multi ./js/script.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./js/script.js */\"./js/script.js\");\n\n\n//# sourceURL=webpack:///multi_./js/script.js?");

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = Vue;\n\n//# sourceURL=webpack:///external_%22Vue%22?");

/***/ })

/******/ });