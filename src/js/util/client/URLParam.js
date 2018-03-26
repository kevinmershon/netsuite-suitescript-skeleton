// Helper function for getting params out of urls, most commonly
// window.href.location
define([], function() {

  var mockedURL = null;
  function getURL() {
    if (!mockedURL) {
      return window.location.href;
    } else {
      return mockedURL;
    }
  };
  function mockURL(url) {
    mockedURL = url;
  };

  function getURLParam(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexS = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexS);

    var results = regex.exec(getURL());
    if (results === null) {
      return "";
    } else {
      return results[1];
    }
  };

  return {
    mockURL: mockURL,
    getURLParam: getURLParam
  };
});
