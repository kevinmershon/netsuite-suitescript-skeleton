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

define(['N/runtime', 'N/task', 'N/record', 'N/search', 'N/log'], function(runtime, task, record, search, log) {

  /**
   * inputContext.isRestarted
   * inputContext.ObjectRef
   */
  function getInputData(inputContext) {
    // return array, object, search.create/load, file.load
    return [];
  }

  /**
   * context.isRestarted
   * context.executionNo
   * context.errors
   * context.key
   * context.value
   * context.write()
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
   */
  function reduce(context) {
    // mutate data using context.key and context.values and write to summary
    // stage
    //
    // data will be grouped by 'value group' due to shuffle stage
    // context.key will equal 'value group' from map stage
    // context.values will be array of strings or JSON values, probably needing
    //   parsed with JSON.parse()
    context.write(1);
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
   * context.output.each()
   */
  function summarize(context) {
    // output results
    context.output.each(function(key, value) {
      // do some logic to summarize results, log, etc.

      // keep outputting summary results
      return true;
    });
  }

  return {
    getInputData: getInputData,
    map:          map,
    reduce:       reduce,
    summarize:    summarize
  };

});
