/**
 * Spec is a utility module based conceptually on Clojure Spec, used to verify
 * required fields and their respective type values. This library is compatible
 * with RequireJS, CommonJS, and SuiteScript 1.0 and 2.0.
 *
 * @author Kevin Mershon, 2018
 */

/**
 * Example usage:
 *
   var currencySpec = Spec.Specification({
     'id':   Spec.Number,
     'name': Spec.Enumeration(['CAD', 'EUR', 'USD'])
   });
   var itemSpec = Spec.Specification({
     'isactive':     Spec.Boolean,
     'name':         Spec.String,
     'type':         Spec.Enumeration(['assemblyitem', 'inventoryitem']),
     'rate':         Spec.Number,
     'currency':     Spec.ObjectOfSpec(currencySpec),
     'customFields': Spec.Object,
     'subsidiaries:  Spec.Array(Spec.Number)
   });
   var myItem = {
     'name':         'test',
     'isactive':     false,
     'type':         'assemblyitem',
     'rate':         null, // missing!
     'currency':     { 'id': 1, 'name': 'USD' },
     'customFields': {},
     'subsidiares':  [ 1, 2 ]
   };

   // this will throw an exception unless true is passed as the second argument
   var isItem = itemSpec.accepts(myItem, true); // false!
 *
 */

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
    global.Spec = factory();
  }
}(this, (function () {
  'use strict';
  var method = {};

  /** @type {import('./Spec').Enumeration} **/
  method.Enumeration = function(permissableValues) {
    return {
      'description': 'String of value ' + JSON.stringify(permissableValues),
      'accepts':     function(value) {
        return permissableValues.indexOf(value) >= 0;
      }
    };
  };

  /** @type {import('./Spec').Boolean} **/
  method.Boolean = function() {
    return {
      'description': 'Boolean',
      'accepts':     function(value) {
        return (
          value !== undefined &&
          value !== null &&
          (
            (value === true || value === false) ||
            (typeof(value) === 'string' && (
              value.toLowerCase() === 'true' ||
              value.toLowerCase() === 'false'
            ))
          )
        );
      }
    };
  };

  /** @type {import('./Spec').isFinite} **/
  function isFinite(val) {
    return !isNaN(val) && val !== -Infinity && val !== Infinity;
  }

  /** @type {import('./Spec').Number} **/
  method.Number = function() {
    return {
      'description': 'Number',
      'accepts':     function(value) {
        return (
          value !== null &&
          value !== undefined &&
          (
            (typeof(value) === 'number' && isFinite(value)) ||
            (typeof(value) === 'string' && isFinite(parseFloat(value)))
          )
        );
      }
    };
  };

  /** @type {import('./Spec').Array} **/
  method.Array = function() {
    return {
      'description': 'Array',
      'accepts':     function(value) {
        return (
          value !== null &&
          value !== undefined &&
          Array.isArray(value)
        );
      }
    };
  };

  /** @type {import('./Spec').ArrayOfSpec} **/
  method.ArrayOfSpec = function(subSpecification) {
    return {
      'description': 'Array',
      'accepts':     function(value) {
        var isPassing = (
          value !== null &&
          value !== undefined &&
          Array.isArray(value)
        );
        if (!isPassing) {
          // early exit based on type
          return false;
        }

        // Because arrays can be extremely large and we don't want to incur an
        // enormous performance hit for typing arrays, we limit to checking only
        // the first 3 items
        var maxIterations = Math.min(3, value.length);
        var evaluator     = subSpecification;
        if (typeof(evaluator) === 'function') {
          evaluator = evaluator();
        }
        var errorMessages = [];
        for (var i=0; i<maxIterations; i++) {
          if (evaluator.accepts(value[i])) {
            continue;
          }
          errorMessages.push({
            'index': i,
            'error': (
              'Required value of type ' + evaluator.description +
              ', got value: ' + value[i] +
              ' (type = ' + typeof(value[i]) + ')'
            )
          });
        }
        if (errorMessages.length > 0) {
          throw JSON.stringify(errorMessages);
        }

        // the only way to make it here is if the array is valid
        return true;
      }
    };
  };


  /** @type {import('./Spec').Object} **/
  method.Object = function() {
    return {
      'description': 'Object',
      'accepts':     function(value) {
        return (
          value !== null &&
          value !== undefined &&
          typeof(value) === 'object'
        );
      }
    };
  };

  /** @type {import('./Spec').ObjectOfSpec} **/
  method.ObjectOfSpec = function(subSpecification) {
    return {
      'description': 'Object',
      'accepts':     function(value) {
        return (
          value !== null &&
          value !== undefined &&
          typeof(value) === 'object' &&
          subSpecification.accepts(value)
        );
      }
    };
  };

  /** @type {import('./Spec').String} **/
  method.String = function() {
    return {
      'description': 'String',
      'accepts':     function(value) {
        return (
          value !== null &&
          value !== undefined &&
          typeof(value) === 'string'
        );
      }
    };
  };

  /** @type {import('./Spec').Specification} **/
  method.Specification = function(properties) {
    var requiredProperties = Object.keys(properties);
    return {
      'accepts': function(obj, noThrowException) {
        var errorMessages = [];

        if (obj === null || obj === undefined || typeof(obj) !== 'object') {
          errorMessages.push({
            'error':        (
              'Expected an Object but got value: ' + obj +
              ' (type = ' + typeof(obj) + ')'
            )
          });
        } else {
          for (var i=0; i<requiredProperties.length; i++) {
            var key       = requiredProperties[i];
            var evaluator = properties[key];

            // all the types except Enumeration have to be evaluated
            if (typeof(evaluator) === 'function') {
              evaluator = evaluator();
            }

            // If our value is accepted then we are OK, otherwise we will report this
            // and all other validation failures
            if (evaluator.accepts(obj[key])) {
              continue;
            }
            errorMessages.push({
              'propertyName': key,
              'error':        (
                'Required value of type ' + evaluator.description +
                ', got value: ' + obj[key] +
                ' (type = ' + typeof(obj[key]) + ')'
              )
            });
          }
        }

        // If we have any error messages validating the object, we reject the object
        // immediately by throwing an Exception
        if (errorMessages.length > 0) {
          if (noThrowException) {
            // error reason is squelched
            return false;
          } else {
            throw JSON.stringify(errorMessages);
          }
        }

        return true;
      }
    };
  };

  return method;
})));
