/**
 * Helper function for background jobs big enough to require rescheduling and
 * a loading screen.
 *
 * @NApiVersion 2.0
 */
define(['N/redirect', 'N/task', 'N/log'], function(redirect, task, log) {

  function scheduleJob(opts) {
    log.audit({
      title: 'Scheduling Task',
      details: opts.description
    });
    const worker = task.create({ taskType: opts.taskType });
    worker.scriptId     = opts.scriptId;
    worker.deploymentId = opts.deploymentId;
    worker.params       = opts.params || {};
    const taskID = worker.submit();

    // redirect to the loading screen (script and deployment ids must be passed
    // in via options since they vary by customer)
    redirect.toSuitelet({
      scriptId:     opts.loadingScriptId,
      deploymentId: opts.loadingDeploymentId,
      parameters: {
        'custscript_taskid':        taskID,
        'custscript_redirect_type': opts.redirectType,
        'custscript_redirect_id':   opts.redirectId
      }
    });
  }

  return {
    scheduleJob: scheduleJob
  };

});
