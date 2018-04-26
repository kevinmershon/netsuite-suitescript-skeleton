/**
 * Helper suitelet for loading screens, intended to be used as an interstitial
 * page for tasks requiring a background job and loading screen
 *
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */
define(['N/redirect', 'N/ui/serverWidget', 'N/task', 'N/log'], function(redirect, ui, task, log) {

  function renderPage(context) {
    const form = ui.createForm({ title: 'Loading...' });

    const taskIDField = form.addField({
      id:        'custpage_taskid',
      type:      ui.FieldType.TEXT,
      label:     'Task ID'
    });
    taskIDField.updateDisplayType({ displayType: ui.FieldDisplayType.HIDDEN });
    form.updateDefaultValues({
      'custpage_taskid': context.request.parameters.custscript_taskid
    });

    form.clientScriptModulePath = './LoadingScreen_SL_Client.js';
    context.response.writePage(form);
  }

  function checkProgress(context) {
    const summary = task.checkStatus({
      'taskType': task.TaskType.MAP_REDUCE,
      'taskId':   context.request.parameters.custscript_taskid
    });

    // PENDING | PROCESSING | COMPLETE | FAILED
    context.response.write("{\"status\": \"" + summary.status + "\"}");
  }

  function maybeRedirectToRecord(context) {
    const summary = task.checkStatus({
      'taskType': task.TaskType.MAP_REDUCE,
      'taskId':   context.request.parameters.custscript_taskid
    });
    if (summary.status === 'COMPLETE' || summary.status === 'FAILED') {
      // redirect to the intended record
      redirect.toRecord({
        type: context.request.parameters.custscript_redirect_type,
        id:   context.request.parameters.custscript_redirect_id
      });
      return true;
    }
    return false;
  }

  function onRequest(context) {
    if (context.request.method === 'GET') {
      if (!maybeRedirectToRecord(context)) {
        renderPage(context);
      }
    } else {
      checkProgress(context);
    }
  }

  return {
    onRequest: onRequest
  };

});
