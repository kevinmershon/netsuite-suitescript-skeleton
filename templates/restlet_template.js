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

define(['N/runtime', 'N/task', 'N/record', 'N/search', 'N/log'], function(runtime, task, record, search, log) {

  function onDelete(requestParams) {
    // return string or object data
    return '1';
  }

  function onGet(requestParams) {
    // return string or object data
    return '1';
  }

  function onPost(requestParams) {
    // return string or object data
    return '1';
  }

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
