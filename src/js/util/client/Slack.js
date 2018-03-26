/**
 * Helper function for posting Slack Messages
 *
 * @NApiVersion 2.0
 */
define(['N/https', 'N/log'], function(https, log) {

  function post(opts) {
    if (!opts.url) {
      log.error({
        title:   "Slack post called with no WebHook URL",
        details: "Please specify 'url' argument"
      });
      return null;
    }
    if (!opts.message) {
      log.error({
        title:   "Slack post called with no Message",
        details: "Please specify 'message' argument"
      });
      return null;
    }

    var params = {
      text:       opts.message,
      username:   opts.username || "NetSuite",
      icon_emoji: opts.icon     || ":speech_balloon:"
    };
    if (opts.channel) { params.channel = opts.channel };

    return https.post({
      url:     opts.url,
      body:    JSON.stringify(params),
      headers: { "Content-Type": "application/json" }
    });
  };

  return {
    post: post
  };
});
