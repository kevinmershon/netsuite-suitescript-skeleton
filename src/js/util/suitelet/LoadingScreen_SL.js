/**
 * Helper suitelet for loading screens, intended to be used as an interstitial
 * page for tasks requiring a background job and loading screen
 *
 * @NApiVersion 2.0
 * @NScriptType Suitelet
 */
define(['N/redirect', 'N/ui/serverWidget', 'N/task'], function(
  /** @type {import('N/redirect')}        **/ redirect,
  /** @type {import('N/ui/serverWidget')} **/ ui,
  /** @type {import('N/task')}            **/ task
) {

  /**
   * @param {import('N/types').EntryPoints.Suitelet.onRequestContext} context
   */
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

  /**
   * @param {import('N/types').EntryPoints.Suitelet.onRequestContext} context
   */
  function checkProgress(context) {
    const summary = task.checkStatus({
      'taskId': context.request.parameters.custscript_taskid
    });

    // PENDING | PROCESSING | COMPLETE | FAILED
    context.response.write('{"status": "' + summary.status + '"}');
  }

  /**
   * @param {import('N/types').EntryPoints.Suitelet.onRequestContext} context
   */
  function maybeRedirectToRecord(context) {
    const summary = task.checkStatus({
      'taskId': context.request.parameters.custscript_taskid
    });
    if (summary.status === task.TaskStatus.COMPLETE || summary.status === task.TaskStatus.FAILED) {
      // redirect to the intended record
      redirect.toRecord({
        type: context.request.parameters.custscript_redirect_type,
        id:   context.request.parameters.custscript_redirect_id
      });
      return true;
    }
    return false;
  }

  /**
   * context.request
   * context.response
   *
   * @type {import('N/types').EntryPoints.Suitelet.onRequest}
   */
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
    'onRequest': onRequest
  };

});
