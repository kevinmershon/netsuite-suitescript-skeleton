/*******************************************************************************
{{ScriptHeader}} *
 * Company:                  {{Company}}
 * Author:                   {{Name}} - {{Email}}
 * File:                     {{ScriptFileName}}
 * Script:                   {{ScriptTitle}}
 * Script ID:                {{ScriptID}}
 * Version:                  1.0
 *
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 *
 ******************************************************************************/

define(['N/runtime', 'N/ui/dialog', 'N/record', 'N/search', 'N/log'], function(runtime, dialog, record, search, log) {

  /**
   * context.currentRecord
   * context.sublistId
   * context.fieldId
   * context.line
   * context.column
   */
  function fieldChanged(context) {
    // no return value
  }

  /**
   * context.currentRecord
   * context.sublistId
   */
  function lineInit(context) {
    // no return value
  }

  /**
   * context.currentRecord
   * context.mode // [copy, paste, create]
   */
  function pageInit(context) {
    // no return value
  }

  /**
   * context.currentRecord
   * context.sublistId
   * context.fieldId
   */
  function postSourcing(context) {
    // no return value
  }

  /**
   * context.currentRecord
   */
  function saveRecord(context) {
    // return true if record is valid, false to reject
    return true;
  }

  /**
   * context.currentRecord
   * context.sublistId
   */
  function sublistChanged(context) {
    // no return value
  }

  /**
   * context.currentRecord
   * context.sublistId
   */
  function validateDelete(context) {
    // return true if delete is permitted, false to reject
    return true;
  }

  /**
   * context.currentRecord
   * context.sublistId
   * context.fieldId
   * context.line
   * context.column
   */
  function validateField(context) {
    // return true if field is valid, false to reject
    return true;
  }

  /**
   * context.currentRecord
   * context.sublistId
   */
  function validateInsert(context) {
    // return true if insert is permitted, false to reject
    return true;
  }

  /**
   * context.currentRecord
   * context.sublistId
   */
  function validateLine(context) {
    // return true if line is valid, false to reject
    return true;
  }


  return {
    'fieldChanged':   fieldChanged,
    'lineInit':       lineInit,
    'pageInit':       pageInit,
    'postSourcing':   postSourcing,
    'saveRecord':     saveRecord,
    'sublistChanged': sublistChanged,
    'validateDelete': validateDelete,
    'validateField':  validateField,
    'validateInsert': validateInsert,
    'validateLine':   validateLine
  };

});
