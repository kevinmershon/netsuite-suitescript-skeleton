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
 * @NScriptType UserEventScript
 *
 ******************************************************************************/

define(['N/runtime', 'N/task', 'N/record', 'N/search', 'N/log'], function(runtime, task, record, search, log) {

  /**
   * context.newRecord
   * context.oldRecord
   * context.type
   */
  function afterSubmit(context) {
    // no return value
  }

  /**
   * context.newRecord
   * context.type
   * context.form
   * context.request
   */
  function beforeLoad(context) {
    // no return value
  }

  /**
   * context.newRecord
   * context.oldRecord
   * context.type
   */
  function beforeSubmit(context) {
    // no return value
  }

  return {
    afterSubmit:  afterSubmit,
    beforeLoad:   beforeLoad,
    beforeSubmit: beforeSubmit
  };

});
