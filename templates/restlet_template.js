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
 * @NScriptType Restlet
 *
 ******************************************************************************/

define(['N/runtime', 'N/task', 'N/record', 'N/search', 'N/log'], function(
  /** @type {import('N/runtime') **/ runtime,
  /** @type {import('N/task')    **/ task,
  /** @type {import('N/record')  **/ record,
  /** @type {import('N/search')  **/ search,
  /** @type {import('N/log')     **/ log
) {

  /**
   * @type {import('N/types').EntryPoints.RESTlet.delete_}
   */
  function onDelete(requestParams) {
    // return string or object data
    return '1';
  }

  /**
   * @type {import('N/types').EntryPoints.RESTlet.get}
   */
  function onGet(requestParams) {
    // return string or object data
    return '1';
  }

  /**
   * @type {import('N/types').EntryPoints.RESTlet.post}
   */
  function onPost(requestParams) {
    // return string or object data
    return '1';
  }

  /**
   * @type {import('N/types').EntryPoints.RESTlet.put}
   */
  function onPut(requestParams) {
    // return string or object data
    return '1';
  }

  return {
    'delete': onDelete,
    'get':    onGet,
    'post':   onPost,
    'put':    onPut
  };

});
