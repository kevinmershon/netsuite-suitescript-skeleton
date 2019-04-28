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

define(['N/runtime', 'N/task', 'N/record', 'N/search', 'N/log'], function(
  /** @type {import('N/runtime')} **/ runtime,
  /** @type {import('N/task')}    **/ task,
  /** @type {import('N/record')}  **/ record,
  /** @type {import('N/search')}  **/ search,
  /** @type {import('N/log')}     **/ log
) {

  /**
   * context.newRecord
   * context.oldRecord
   * context.type
   *
   * @type {import('N/types').EntryPoints.UserEvent.afterSubmit}
   */
  function afterSubmit(context) {
    // no return value
  }

  /**
   * context.newRecord
   * context.type
   * context.form
   * context.request
   *
   * @type {import('N/types').EntryPoints.UserEvent.beforeLoad}
   */
  function beforeLoad(context) {
    // no return value
  }

  /**
   * context.newRecord
   * context.oldRecord
   * context.type
   *
   * @type {import('N/types').EntryPoints.UserEvent.beforeSubmit}
   */
  function beforeSubmit(context) {
    // no return value
  }

  return {
    'afterSubmit':  afterSubmit,
    'beforeLoad':   beforeLoad,
    'beforeSubmit': beforeSubmit
  };

});
