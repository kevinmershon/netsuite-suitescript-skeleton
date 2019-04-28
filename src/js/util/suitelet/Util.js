/**
 * Helper utilities
 *
 * @NApiVersion 2.0
 * @NModuleScope Public
 */

/* eslint complexity: ["error", 15] */
define(['N/search'], function(
  /** @type {import('N/search')} **/ search
) {

  // Returns a map that consists of the rest of the maps conj-ed onto the first.
  // If a key occurs in more than one map, the mapping from the latter
  // (left-to-right) will be the mapping in the result.
  function merge() {
    const result = {};
    for (var i=0; i<arguments.length; i++) {
      var input = arguments[i];
      if (!input || !(input instanceof Object)) {
        continue;
      }
      var sKeys = Object.keys(input);
      for (var s=0; s<sKeys.length; s++) {
        var sKey = sKeys[s];
        result[sKey] = input[sKey];
      }
    }
    return result;
  }

  function selectKeys(input, keys) {
    var output = {};
    var sKeys = Object.keys(input);
    for (var s=0; s<sKeys.length; s++) {
      var sKey = sKeys[s];
      if (keys.indexOf(sKey) !== -1) {
        output[sKey] = input[sKey];
      }
    }
    return output;
  }

  function stripEmpties(input) { // jshint ignore: line
    var output = {};
    var sKeys = Object.keys(input);
    for (var s=0; s<sKeys.length; s++) {
      var sKey = sKeys[s];
      if (typeof(input[sKey]) === 'object') {
        if (!Array.isArray(input[sKey])) {
          output[sKey] = stripEmpties(input[sKey]);
        } else {
          var outputArr = [];
          for (var i=0; i<input[sKey].length; i++) {
            outputArr.push(stripEmpties(input[sKey][i]));
          }
          output[sKey] = outputArr;
        }
      } else if (input[sKey] !== '') {
        output[sKey] = input[sKey];
      }
    }
    return output;
  }

  function getAllFields(nsRecord) {
    const values = {};
    const recordFields = nsRecord.getFields();
    for (var i=0; i<recordFields.length; i++) {
      if (recordFields[i].substring(0, 1) === '_') {
        continue;
      }
      var fieldName = recordFields[i];
      var value = null;
      switch (fieldName) {
        case 'entityid':
        case 'currency':
        case 'taxschedule':
          value = nsRecord.getText({ fieldId: fieldName });
          break;
        default:
          value = nsRecord.getValue({ fieldId: fieldName });
      }
      if (typeof(value) === 'object') {
        continue;
      }
      if (typeof(value) === 'number' && isNaN(value)) {
        continue;
      }
      if (value === 'F') { value = false; }
      if (value === 'T') { value = true; }
      if (value !== undefined   && value !==  null &&
          value !== 'undefined' && value !== 'null') {
        values[fieldName] = value;
      }
    }
    return values;
  }

  // Helper function for getting the internal ID of a custom list value by its
  // string name
  function getCustomListIdByName(listScriptID, listName) {
    var listID = null;
    var results = search.create({
      type: listScriptID,
      filters: ['name', 'is', listName],
      columns: ['internalid']
    }).run();
    results.each(function(result) {
      listID = result.getValue({ name: 'internalid' });
      return true;
    });
    return listID;
  }

  return {
    'merge':                 merge,
    'selectKeys':            selectKeys,
    'stripEmpties':          stripEmpties,
    'getAllFields':          getAllFields,
    'getCustomListIdByName': getCustomListIdByName
  };

});
