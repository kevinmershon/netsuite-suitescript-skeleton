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
 * @NScriptType MapReduceScript
 *
 ******************************************************************************/

define(['N/runtime', 'N/task', 'N/record', 'N/search', 'N/log'], function(
  /** @type import('N/runtime')} **/ runtime,
  /** @type import('N/task')}    **/ task,
  /** @type import('N/record')}  **/ record,
  /** @type import('N/search')}  **/ search,
  /** @type import('N/log')}     **/ log
) {

  /**
   * inputContext.isRestarted
   * inputContext.ObjectRef
   *
   * @type {import('N/types').EntryPoints.MapReduce.getInputData}
   */
  function getInputData(inputContext) {
    // return array, object, search.create/load, file.load
    console.log(inputContext);
    return [];
  }

  /**
   * context.isRestarted
   * context.executionNo
   * context.errors
   * context.key
   * context.value
   * context.write()
   *
   * @type {import('N/types').EntryPoints.MapReduce.map}
   */
  function map(context) {
    // mutate data using context.value and write to shuffle/reduce stage
    //
    // GOTCHA -- context.value probably needs parsed with JSON.parse()
    context.write('value group', context.value);
  }

  /**
   * context.isRestarted
   * context.executionNo
   * context.errors
   * context.key
   * context.values
   * context.write()
   *
   * @type {import('N/types').EntryPoints.MapReduce.reduce}
   */
  function reduce(context) {
    // mutate data using context.key and context.values and write to summary
    // stage
    //
    // data will be grouped by 'value group' due to shuffle stage
    // context.key will equal 'value group' from map stage
    // context.values will be array of strings or JSON values, probably needing
    //   parsed with JSON.parse()
    for (var i=0; i<context.values.length; i++) {
      context.write('value group', context.values[i]);
    }
  }

  /**
   * context.isRestarted
   * context.concurrency
   * context.dateCreated
   * context.seconds
   * context.usage
   * context.yields
   * context.inputSummary
   * context.mapSummary
   * context.reduceSummary
   * context.output.iterator().each()
   *
   * @type {import('N/types').EntryPoints.MapReduce.summarize}
   */
  function summarize(context) {
    // output results
    context.output.iterator().each(function(key, value) {
      // do some logic to summarize results, log, etc.

      // keep outputting summary results
      return true;
    });
  }

  return {
    'getInputData': getInputData,
    'map':          map,
    'reduce':       reduce,
    'summarize':    summarize
  };

});
