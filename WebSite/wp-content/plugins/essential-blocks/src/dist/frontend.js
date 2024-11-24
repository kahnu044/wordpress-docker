/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/iconPickerHelper.js":
/*!**************************************!*\
  !*** ./frontend/iconPickerHelper.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EBGetIconClass: () => (/* binding */ EBGetIconClass),
/* harmony export */   EBGetIconType: () => (/* binding */ EBGetIconType),
/* harmony export */   EBRenderIcon: () => (/* binding */ EBRenderIcon)
/* harmony export */ });
var EBGetIconType = function EBGetIconType(value) {
  if (value.includes('fa-')) {
    return 'fontawesome';
  }
  return 'dashicon';
};
var EBRenderIcon = function EBRenderIcon(iconType, className, icon) {
  if (iconType === 'dashicon') {
    // Render Dashicon
    return '<span class="dashicon dashicons ' + icon + ' ' + className + '"></span>';
  } else if (iconType === 'fontawesome') {
    // Render FontAwesome icon
    return '<i class="' + icon + ' ' + className + '"></i>';
  }

  // Handle other icon types or return an error message if needed.
  return 'Invalid icon type';
};
var EBGetIconClass = function EBGetIconClass(value) {
  if (!value) {
    return '';
  }
  if (!value.includes("fa-")) {
    return "dashicon dashicons " + value;
  }
  return value;
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./frontend/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EBGetIconClass: () => (/* reexport safe */ _iconPickerHelper__WEBPACK_IMPORTED_MODULE_0__.EBGetIconClass),
/* harmony export */   EBGetIconType: () => (/* reexport safe */ _iconPickerHelper__WEBPACK_IMPORTED_MODULE_0__.EBGetIconType),
/* harmony export */   EBRenderIcon: () => (/* reexport safe */ _iconPickerHelper__WEBPACK_IMPORTED_MODULE_0__.EBRenderIcon)
/* harmony export */ });
/* harmony import */ var _iconPickerHelper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./iconPickerHelper */ "./frontend/iconPickerHelper.js");



window.eb_frontend = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=frontend.js.map