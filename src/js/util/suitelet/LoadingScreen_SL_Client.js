/**
 * Helper client script for the loading screen suitelet.
 *
 * @NApiVersion 2.0
 * @NScriptType ClientScript
 */
define(['N/runtime', 'N/https'], function(runtime, https) {
  // GOTCHA -- configure these to files in your File Cabinet
  const LOGO_URL        = 'http://via.placeholder.com/800x300?text=Please configure your logo',
        LOADING_GIF_URL = 'http://via.placeholder.com/600x50?text=Please configure your progress gif';

  var taskID = null;

  function addLoadingElementToPage() {
    const div = document.createElement('div');
    div.id                  = 'loadingScreen';
    div.style.position      = 'fixed';
    div.style.width         = '100%';
    div.style.top           = '250px';
    div.style.textAlign     = 'center';

    const logo = document.createElement('img');
    logo.src            = LOGO_URL;
    logo.style.width    = '800px';
    logo.style.display  = 'block';
    logo.style.margin   = 'auto';
    div.appendChild(logo);

    const loadingGif = document.createElement('img');
    loadingGif.src            = LOADING_GIF_URL;
    loadingGif.style.margin   = 'auto';
    div.appendChild(loadingGif);

    const description = document.createElement('p');
    description.style['font-family'] = 'Arial, Verdana';
    description.innerHTML = 'Please wait while we process your request.';
    div.appendChild(description);

    document.body.appendChild(div);
  }

  function checkProgress() {
    const responseJSON = https.post({ url: window.location.href }).body;
    if (responseJSON && responseJSON.length > 0) {
      const response = JSON.parse(responseJSON);
      if (response.status === 'COMPLETE' || response.status === 'FAILED') {
        // redirect to completed record
        window.location.reload();
      } else {
        setTimeout(checkProgress, 1000);
      }
    } else {
      alert(responseJSON);
    }
  }

  function pageInit(context) {
    // load the script deployment to get the parameter values
    addLoadingElementToPage();
    taskID = context.currentRecord.getValue({ fieldId: 'custpage_taskid' });

    setTimeout(checkProgress, 1000);
  }

  return {
    pageInit: pageInit
  };

});
