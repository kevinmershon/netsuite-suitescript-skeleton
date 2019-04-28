;(function (global, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals (global is window)
    global.LoadingSpinner = factory();
  }
}(this, (function () {
  'use strict';
  var method = {};

  var assetsPrepared = false;
  function prepareAssets () {
    jQuery('<style>')
      .prop('type', 'text/css')
      .html('\n' +
        'body.spinnerloading {\n' +
        '  overflow: hidden;\n' +
        '}\n' +
        '.spinnermodalwrap {\n' +
        '  display:    none;\n' +
        '  overflow:   hidden;\n' +
        '  position:   fixed;\n' +
        '  z-index:    1000;\n' +
        '  top:        0;\n' +
        '  left:       0;\n' +
        '  height:     100%;\n' +
        '  width:      100%;\n' +
        '  background: rgba(0,0,0, 0.25)\n' +
        '}\n' +
        '.spinnermodal {\n' +
        '  background:    white' +
        '                 url("http://i.stack.imgur.com/FhHRx.gif") '  +
        '                 50% 50% ' +
        '                 no-repeat;\n ' +
        '  position:      absolute;\n' +
        '  width:         300px;\n' +
        '  height:        100px;\n' +
        '  border:        solid red 4px;\n' +
        '  border-radius: 5%;\n' +
        '  top:           calc(50% - 50px);\n' +
        '  left:          calc(50% - 150px);\n' +
        '  padding-top:   68px;\n' +
        '  text-align:    center;\n' +
        '}\n' +
        'body.spinnerloading .spinnermodalwrap {\n' +
        '  display: block;\n' +
        '}')
      .appendTo('head');

    jQuery('<div class="spinnermodalwrap">' +
      '  <div class="spinnermodal"></div>' +
      '</div>').appendTo('body');
    assetsPrepared = true;
  }

  method.show = function(message) {
    if (!assetsPrepared) {
      prepareAssets();
    }
    jQuery('body').addClass('spinnerloading');
    if (!message) {
      message = 'Please wait...';
    }
    jQuery('.spinnermodal').html(message);
  };

  method.hide = function() {
    jQuery('body').removeClass('spinnerloading');
  };

  return method;
})));
