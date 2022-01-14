!function(global) {
    'use strict';

    function DropSearch(elem, params) {
        this.$element = jQuery(elem);
        this.params = params || {};

        this.onInit = this.params.onInit || null;
        this.classReady = this.params.classReady || 'JS-DropSearch-ready';
        this.classActive = this.params.classActive || 'dropsearch-active';
        this.classShow = this.params.classShow || '';
        this.eventName = this.params.eventName || 'focus';
        this.backgroundDisabled = this.params.backgroundDisabled || false;

        this.__construct();
    };

    DropSearch.prototype.__construct = function __construct() {
        this.$document = jQuery(document.body);
        this.$menu = this.$element.find('.JS-DropSearch-Menu').eq(0);
        this.$switcher = this.$element.find('.JS-DropSearch-Switcher').eq(0);
        this.$close = this.$element.find('.JS-DropSearch-Close');

        this._init();
    };

    DropSearch.prototype._init = function _init() {
        var _this = this;

        if( jQuery.isFunction(this.onInit) ){
            this.onInit.apply(window, []);
        }

        this.$switcher.on(this.eventName + '.JS-DropSearch', function(e, data) {
            _this._active.apply(_this, []);
        });

        jQuery(document).on('mouseup.JS-DropSearch', function (e, data) {
            _this._outside.apply(_this, [e]);
        });

        this._ready();
    };

    DropSearch.prototype._ready = function _ready() {
        this.$element
            .addClass('JS-DropSearch-ready')
            .addClass(this.classReady);
    };

    DropSearch.prototype._active = function _active() {
        this.$element.addClass(this.classActive);
        if (this.classShow != '') {
            this.$document.addClass(this.classShow);
        }
    };

    DropSearch.prototype._outside = function _outside(e) {
        if (!this.backgroundDisabled && (this.$element.has(e.target).length === 0)){
            this.$element.removeClass(this.classActive);
            this.$document.removeClass(this.classShow);
        }
    };
    /*--/DropSearch--*/

    global.DropSearch = DropSearch;
}(this);
