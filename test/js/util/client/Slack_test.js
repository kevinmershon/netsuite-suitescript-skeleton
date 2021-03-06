const { expect } = require('Chai');
const { loadSuiteScriptModule, NRecord, NLog } = require('netsumo');

const SlackModule = loadSuiteScriptModule('src/js/util/client/Slack.js');
const request = require('request');

const fakeHttps = {
  'post': function(opts) {
    return {
      'body': {
        success: true
      },
      'code': 200,
      'headers': {
        'Content-Type': 'application/json'
      }
    };
  }
};

describe("Slack post", function() {
  it("should require a URL", function() {
    const slack = SlackModule({
      'N/https': fakeHttps,
      'N/log': new NLog()
    });
    const response = slack.post({
      message: "Hello World!"
    });
    expect(response).to.be.null;
  });


  it("should require a Message", function() {
    const slack = SlackModule({
      'N/https': fakeHttps,
      'N/log': new NLog()
    });
    const response = slack.post({
      url: "https://testing-123.com",
    });
    expect(response).to.be.null;
  });


  it("should return success true when posting message to url", function() {
    const slack = SlackModule({
      'N/https': fakeHttps,
      'N/log': new NLog()
    });
    const response = slack.post({
      url: "https://testing-123.com",
      message: "Hello World!"
    });
    expect(response.body.success).to.be.true;
  });

});
