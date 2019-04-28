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

define(['N/runtime', 'N/ui/dialog', 'N/record', 'N/search', 'N/log'], function(
  /** @type import('N/runtime')   **/ runtime,
  /** @type import('N/ui/dialog') **/ dialog,
  /** @type import('N/record')    **/ record,
  /** @type import('N/search')    **/ search,
  /** @type import('N/log')       **/ log
) {

  /**
   * context.currentRecord
   * context.sublistId
   * context.fieldId
   * context.line
   * context.column
   *
   * @type {import('N/types').EntryPoints.Client.fieldChanged}
   */
  function fieldChanged(context) {
    // no return value
  }

  /**
   * context.currentRecord
   * context.sublistId
   *
   * @type {import('N/types').EntryPoints.Client.lineInit}
   */
  function lineInit(context) {
    // no return value
  }

  /**
   * context.currentRecord
   * context.mode // [copy, paste, create]
   *
   * @type {import('N/types').EntryPoints.Client.pageInit}
   */
  function pageInit(context) {
    // no return value
  }

  /**
   * context.currentRecord
   * context.sublistId
   * context.fieldId
   *
   * @type {import('N/types').EntryPoints.Client.postSourcing}
   */
  function postSourcing(context) {
    // no return value
  }

  /**
   * context.currentRecord
   *
   * @type {import('N/types').EntryPoints.Client.saveRecord}
   */
  function saveRecord(context) {
    // return true if record is valid, false to reject
    return true;
  }

  /**
   * context.currentRecord
   * context.sublistId
   *
   * @type {import('N/types').EntryPoints.Client.sublistChanged}
   */
  function sublistChanged(context) {
    // no return value
  }

  /**
   * context.currentRecord
   * context.sublistId
   *
   * @type {import('N/types').EntryPoints.Client.validateDelete}
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
   *
   * @type {import('N/types').EntryPoints.Client.validateField}
   */
  function validateField(context) {
    // return true if field is valid, false to reject
    return true;
  }

  /**
   * context.currentRecord
   * context.sublistId
   *
   * @type {import('N/types').EntryPoints.Client.validateInsert}
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
