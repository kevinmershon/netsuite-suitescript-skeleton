const { expect } = require('Chai');
const { loadSuiteScriptModule, NRecord } = require('netsumo');

// GOTCHA vv instantiate URLParamModule immediately            ------------------------\v
const { mockURL, getURLParam } = loadSuiteScriptModule('src/js/util/client/URLParam.js')();
// GOTCHA ^^ instantiate URLParamModule immediately            ------------------------/^

describe("GetURLParam", function() {

  it("should return correct url values when they are set", function() {
    mockURL("http://www.google.com?asdf=123");
    expect(getURLParam("asdf")).to.equal("123");
  });

  it("should return empty string when url values are not set", function() {
    mockURL("http://www.msn.com");
    expect(getURLParam("asdf")).to.be.empty;
  });

});
