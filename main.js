/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/ProductList.js":
/*!*******************************!*\
  !*** ./src/js/ProductList.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ ProductList; }
/* harmony export */ });
class ProductList {
  constructor(container) {
    this.container = container;
    this.list = this.container.querySelector('.list');
    this.btnAdd = this.container.querySelector('.btn_add');
    this.form = this.container.querySelector('.create-item_list');
    this.inputName = this.form.querySelector('.aplecation');
    this.inputPrice = this.form.querySelector('.price');
    this.btnSave = this.container.querySelector('.btn_save');
    this.btnCansel = this.container.querySelector('.btn_cansel');
    this.inputAplecation = this.form.querySelector('.aplecation');
    this.inputPrice = this.form.querySelector('.price');
    this.confirmationBox = this.container.querySelector('.confirmation-box');
    this.btnYes = this.confirmationBox.querySelector('.confirmation-btn_yes');
    this.btnNo = this.confirmationBox.querySelector('.confirmation-btn_no');
    this.substrate = document.querySelector('.substrate');
    this.listBox = [];
    this.editElements = null;
    this.deleteElement = null;
    this.saveForm = this.saveForm.bind(this);
    this.saveNew = this.saveNew.bind(this);
    this.cansel = this.cansel.bind(this);
    this.editForm = this.editForm.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.canselConfirm = this.canselConfirm.bind(this);
    this.confirmationForm = this.confirmationForm.bind(this);
  }
  activation() {
    this.btnAdd.addEventListener('click', this.saveForm);
    this.btnCansel.addEventListener('click', this.cansel);
    this.inputAplecation.addEventListener('input', ProductList.changeInput);
    this.inputPrice.addEventListener('input', ProductList.changeInput);
    this.btnYes.addEventListener('click', this.deleteItem);
    this.btnNo.addEventListener('click', this.canselConfirm);
  }
  saveForm(e) {
    e.preventDefault();
    this.btnSave.addEventListener('click', this.saveNew);
    this.substrate.classList.remove('hiden');
    this.form.classList.remove('hiden');
  }
  saveNew(e) {
    e.preventDefault();
    if (this.checkInput()) {
      this.addItem();
      this.listRendering();
      this.btnSave.removeEventListener('click', this.saveNew);
      this.form.reset();
      this.substrate.classList.add('hiden');
      this.form.classList.add('hiden');
    } else {
      if (this.inputName.value.length < 3) ProductList.showtoolTip('Название должно содержать не менее трех символов', this.inputName);
      if (+this.inputPrice.value < 0) ProductList.showtoolTip('Стоимость должна быть положительной', this.inputPrice);
      if (this.inputPrice.value.length === 0) ProductList.showtoolTip('Введите стоимость', this.inputPrice);
    }
  }
  cansel(e) {
    e.preventDefault();
    this.btnSave.removeEventListener('click', this.saveNew);
    this.btnSave.removeEventListener('click', this.saveEdit);
    this.form.reset();
    ProductList.changeInput();
    this.form.classList.add('hiden');
    this.substrate.classList.add('hiden');
  }
  addItem() {
    const box = [];
    const productName = document.createElement('div');
    productName.classList.add('product_name', 'list_item');
    productName.textContent = this.inputName.value;
    box.push(productName);
    const price = document.createElement('div');
    price.classList.add('product_price', 'list_item');
    const result = [];
    const limit = Math.ceil(this.inputPrice.value.length / 3);
    for (let i = 1; i <= limit; i += 1) {
      const end = this.inputPrice.value.length - 3 * (i - 1);
      const start = -3 * i;
      result.unshift(this.inputPrice.value.slice(start, end));
    }
    price.textContent = result.join(' ');
    box.push(price);
    const actions = document.createElement('div');
    actions.classList.add('actions', 'list_item');
    const btnEdit = document.createElement('button');
    btnEdit.classList.add('btn_edit');
    btnEdit.addEventListener('click', this.editForm);
    const btnDelete = document.createElement('button');
    btnDelete.classList.add('btn_delete');
    btnDelete.addEventListener('click', this.confirmationForm);
    actions.append(btnEdit, btnDelete);
    box.push(actions);
    this.listBox.push(box);
  }
  editForm(e) {
    e.preventDefault();
    this.editElements = this.listBox.find(element => element.find(el => el === e.target.parentElement));
    this.inputName.value = `${this.editElements[0].textContent}`;
    this.inputPrice.value = `${this.editElements[1].textContent}`.split(' ').join('');
    this.form.classList.remove('hiden');
    this.substrate.classList.remove('hiden');
    this.btnSave.addEventListener('click', this.saveEdit);
  }
  saveEdit(e) {
    e.preventDefault();
    if (this.checkInput()) {
      for (let i = 0; i < this.listBox.length; i += 1) {
        if (this.editElements === this.listBox[i]) {
          this.listBox[i][0].textContent = this.inputName.value;
          const result = [];
          const limit = Math.ceil(this.inputPrice.value.length / 3);
          for (let j = 1; j <= limit; j += 1) {
            const end = this.inputPrice.value.length - 3 * (j - 1);
            const start = -3 * j;
            result.unshift(this.inputPrice.value.slice(start, end));
          }
          this.listBox[i][1].textContent = result.join(' ');
        }
      }
      this.listRendering();
      this.editElements = null;
      this.btnSave.removeEventListener('click', this.saveEdit);
      this.form.reset();
      this.form.classList.add('hiden');
      this.substrate.classList.add('hiden');
    } else {
      if (this.inputName.value.length < 3) ProductList.showtoolTip('Название должно содержать не менее трех символов', this.inputName);
      if (+this.inputPrice.value < 0) ProductList.showtoolTip('Стоимость должна быть положительной', this.inputPrice);
      if (this.inputPrice.value.length === 0) ProductList.showtoolTip('Введите стоимость', this.inputPrice);
    }
  }
  confirmationForm(e) {
    e.preventDefault();
    this.deleteElement = e.target;
    this.confirmationBox.classList.remove('hiden');
    this.substrate.classList.remove('hiden');
  }
  canselConfirm(e) {
    e.preventDefault();
    this.deleteElement = null;
    this.confirmationBox.classList.add('hiden');
    this.substrate.classList.add('hiden');
  }
  deleteItem(e) {
    e.preventDefault();
    const deleteElements = this.listBox.find(element => element.find(el => el === this.deleteElement.parentElement));
    this.listBox = this.listBox.filter(element => element !== deleteElements);
    this.confirmationBox.classList.add('hiden');
    this.substrate.classList.add('hiden');
    this.deleteElement = null;
    this.listRendering();
  }
  listRendering() {
    this.list.querySelectorAll('.list_item').forEach(el => {
      if (!el.classList.contains('product_title')) el.remove();
    });
    for (let i = 0; i < this.listBox.length; i += 1) {
      this.list.append(...this.listBox[i]);
    }
  }
  static showtoolTip(message, element) {
    const toolTip = document.createElement('div');
    toolTip.classList.add('toolTip');
    toolTip.textContent = message;
    document.body.append(toolTip);
    const {
      bottom,
      left
    } = element.getBoundingClientRect();
    const offsetHorizont = (toolTip.offsetWidth - element.offsetWidth) / 2;
    toolTip.style.left = `${left - offsetHorizont}px`;
    toolTip.style.top = `${bottom + 5}px`;
  }
  checkInput() {
    if (this.inputName.value.length > 2 && +this.inputPrice.value > 0 && this.inputPrice.value.length > 0) return true;
    return false;
  }
  static changeInput() {
    document.querySelectorAll('.toolTip').forEach(el => el.remove());
  }
}

/***/ }),

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ProductList__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ProductList */ "./src/js/ProductList.js");

const containerList = document.querySelector('.container-list');
const productList = new _ProductList__WEBPACK_IMPORTED_MODULE_0__["default"](containerList);
productList.activation();

/***/ }),

/***/ "./src/index.html":
/*!************************!*\
  !*** ./src/index.html ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// Module
var code = "<!DOCTYPE html>\n<html lang=\"ru\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\">\n    <title>Список товаров</title>\n</head>\n<body>\n  <div class=\"container-list\">\n    <div class=\"header-list\">\n        <h4 class=\"list-title\">Товары</h4>\n        <button class=\"btn_add\"></button>\n    </div>\n    <div class=\"list\">\n        <div class=\"product_name product_title list_item\">Название</div>\n        <div class=\"product_price product_title list_item\">Стоимость</div>\n        <div class=\"actions product_title list_item\">Действия</div>\n    </div>\n    <form class=\"create-item_list hiden\">\n    <div class=\"form_title\">Название</div>\n    <input type=\"text\" class=\"input_create aplecation\">\n    <div class=\"form_title\">Стоимость</div>\n    <input type=\"number\" class=\"input_create price\">\n    <div class=\"buttons_create-box\">\n        <button type=\"submit\" class=\"buttons_create btn_save\">Сохранить</button>\n        <button class=\"buttons_create btn_cansel\">Отмена</button>\n    </div>    \n  </form>\n  <div class=\"confirmation-box hiden\">\n    <div class=\"confirmation-title\">Вы действительно хотите удалить запись?</div>\n    <div class=\"confirmation-btns_box\">\n        <button class=\"confirmation-btns confirmation-btn_yes\">ДА</button>\n        <button class=\"confirmation-btns confirmation-btn_no\">НЕТ</button>\n    </div>\n  </div>\n  </div>\n  <div class=\"substrate hiden\"></div>\n</body>\n</html>\n";
// Exports
/* harmony default export */ __webpack_exports__["default"] = (code);

/***/ }),

/***/ "./src/css/style.css":
/*!***************************!*\
  !*** ./src/css/style.css ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/licenses.txt":
/*!**************************!*\
  !*** ./src/licenses.txt ***!
  \**************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

module.exports = __webpack_require__.p + "licenses.txt";

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	!function() {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	!function() {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _js_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./js/app */ "./src/js/app.js");
/* harmony import */ var _index_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.html */ "./src/index.html");
/* harmony import */ var _css_style_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./css/style.css */ "./src/css/style.css");
/* harmony import */ var _licenses_txt__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./licenses.txt */ "./src/licenses.txt");




}();
/******/ })()
;
//# sourceMappingURL=main.js.map