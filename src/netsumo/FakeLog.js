const console = require('console');

module.exports = (function(){
  return {
    'debug':     console.debug,
    'audit':     console.log,
    'emergency': console.warn,
    'error':     console.error
  };
})();
