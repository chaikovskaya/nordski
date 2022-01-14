!function(global) {
  'use strict';

  function Quantity(elem, params) {
    this.$element = jQuery(elem);
    this.params = params || {};

    this.onInit = this.params.onInit || null;
    this.classReady = this.params.classReady || 'JS-Quantity-ready';
    this.minNumber = this.params.minNumber || 0;
    this.maxNumber = this.params.maxNumber || 1000;

    this.__construct();
  };

  Quantity.prototype.__construct = function __construct() {
    this.$document = jQuery(document);
    this.$minus = this.$element.find('.JS-Quantity-Minus');
    this.$number = this.$element.find('.JS-Quantity-Number');
    this.$plus = this.$element.find('.JS-Quantity-Plus');

    this._init();
  };

  Quantity.prototype._init = function _init() {
    var _this = this;

    if( jQuery.isFunction(this.onInit) ){
      this.onInit.apply(window, []);
    }

    this.$minus.on('click.JS-Quantity', function(e, data) {
      e.stopPropagation();
      _this._decrease.apply(_this, []);
    });

    this.$plus.on('click.JS-Quantity', function(e, data) {
      e.stopPropagation();
      _this._increase.apply(_this, []);
    });

    this._ready();
  };

  Quantity.prototype._ready = function _ready() {
    this.$element
      .addClass('JS-Quantity-ready')
      .addClass(this.classReady);
  };

  Quantity.prototype._decrease = function _decrease() {
    var $numberValue = this.$number.val();

    $numberValue --;
    if ($numberValue > this.minNumber) {
      this.$number.val($numberValue);
    }
  };

  Quantity.prototype._increase = function _increase() {
    var $numberValue = this.$number.val();

    $numberValue ++;
    if ($numberValue <= this.maxNumber) {
      this.$number.val($numberValue);
    }
  };
  /*--/Quantity--*/

  global.Quantity = Quantity;
}(this);
