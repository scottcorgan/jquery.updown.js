;(function ( $, window, document, undefined ) {

  // Create the defaults once
  var pluginName = "updown",
      defaults = {
        trigger: null,
        item: null,
        highlightClass: 'ud-selected',
        startingIndex: 0,
        onSelect: function () {}
      };

  // The actual plugin constructor
  function Plugin( element, options ) {
    this.element = element;
    this.options = $.extend( {}, defaults, options) ;
    this._defaults = defaults;
    this._name = pluginName;
    
    //
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      this._resetCurrentyKeyIdx();
      this.$trigger = $(this.options.trigger);
      this.$element = $(this.element);
      
      this.$trigger.on('keyup', $.proxy(function (e) {
        this._keySearchSelect(e);
        this._keySearchBlur(e);
        this._keyNavigate(e);
      }, this));
    },
    
    _currentKeyNavSelected: null,
    
    _resetCurrentyKeyIdx: function () {
      this._currentKeyIdx = this.options.startingIndex - 1;
    },
    
    getListItems: function () {
      return this.$element.find(this.options.item);
    },
    
    toggleItemAsSelectedByIdx: function (itemIdx, isSelected) {
      if (itemIdx !== undefined) {
        return this.getListItems().eq(itemIdx).toggleClass(this.options.highlightClass, isSelected);
      }
      
      return $();
    },
    
    _keyNavigate: function (e) {
      var shouldNavigate = false;
      var prevIdx;
      
      if (this._isDownKey(e) && this.hasNextItem()) {
        this._incrementCurrentKeyIdx();
        shouldNavigate = true;
        prevIdx = (this._currentKeyIdx > 0) ? this._currentKeyIdx - 1 : undefined;
      }
      
      if (this._isUpKey(e) && this.hasPreviousItem()) {
        this._decrementCurrentKeyIdx();
        shouldNavigate = true;
        prevIdx = this._currentKeyIdx + 1;
      }
      
      if (shouldNavigate) {
        this.$element.find('.' + this.options.highlightClass).removeClass(this.options.highlightClass);
        this._currentKeyNavSelected = this.toggleItemAsSelectedByIdx(this._currentKeyIdx, true);
        this.toggleItemAsSelectedByIdx(prevIdx, false);
      }
      else{
        this.reset();
      }
    },
    
    hasNextItem: function () {
      return this._currentKeyIdx < this.getListItems().length;
    },
    
    hasPreviousItem: function () {
      return this._currentKeyIdx - 1 >= 0;
    },
    
    _incrementCurrentKeyIdx: function () {
      if (this._currentKeyIdx + 1 < this.getListItems().length) {
        this._currentKeyIdx += 1;
      }
    },
    
    _decrementCurrentKeyIdx: function () {
      if (this._currentKeyIdx - 1 >= 0) {
        this._currentKeyIdx -= 1;
      }
    },
    
    _isDownKey: function (e) {
      return e.keyCode === 40;
    },
    
    _isUpKey: function (e) {
      return e.keyCode === 38;
    },
    
    _isEnterKey: function (e) {
      return e.keyCode === 13;
    },
    
    _isEscapeKey: function (e) {
      return e.keyCode === 27;
    },
    
    _keySearchSelect: function (e) {
      if (this._isEnterKey(e)) {
        var $element = this.getListItems().eq(this._currentKeyIdx);
        this.options.onSelect.call($element,  $element);
        this._resetTrigger();
      }
    },
    
    _keySearchBlur: function (e) {
      if (this._isEscapeKey(e)) {
        this._resetTrigger();
      }
    },
    
    _resetTrigger: function () {
      this.$trigger.val('').blur();
      this.reset();
    },
    
    reset: function () {
      if (this._currentKeyNavSelected) {
        this._currentKeyNavSelected.removeClass(this.options.highlightClass);
      }
      
      this._currentKeyNavSelected = null;
      this._resetCurrentyKeyIdx();
      
      return this;
    }
  };
  
  //
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, "plugin_" + pluginName)) {
        $.data(this, "plugin_" + pluginName,
        new Plugin( this, options ));
      }
    });
  };
})( jQuery, window, document );