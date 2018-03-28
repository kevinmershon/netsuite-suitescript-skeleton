const { loadSuiteScriptModule, NSearch } = require('netsumo');

module.exports = (function() {
  const operators = {
    AFTER:                   'after',
    ALLOF:                   'allof',
    ANY:                     'any',
    ANYOF:                   'anyof',
    BEFORE:                  'before',
    BETWEEN:                 'between',
    CONTAINS:                'contains',
    DOESNOTCONTAIN:          'doesnotcontain',
    DOESNOTSTARTWITH:        'doesnotstartwith',
    EQUALTO:                 'equalto',
    GREATERTHAN:             'greaterthan',
    GREATERTHANOREQUALTO:    'greaterthanorequalto',
    HASKEYWORDS:             'haskeywords',
    IS:                      'is',
    ISEMPTY:                 'isempty',
    ISNOT:                   'isnot',
    ISNOTEMPTY:              'isnotempty',
    LESSTHAN:                'lessthan',
    LESSTHANOREQUALTO:       'lessthanorequalto',
    NONEOF:                  'noneof',
    NOTAFTER:                'notafter',
    NOTALLOF:                'notallof',
    NOTBEFORE:               'notbefore',
    NOTBETWEEN:              'notbetween',
    NOTEQUALTO:              'notequalto',
    NOTGREATERTHAN:          'notgreaterthan',
    NOTGREATERTHANOREQUALTO: 'notgreaterthanorequalto',
    NOTLESSTHAN:             'notlessthan',
    NOTLESSTHANOREQUALTO:    'notlessthanorequalto',
    NOTON:                   'noton',
    NOTONORAFTER:            'notonorafter',
    NOTONORBEFORE:           'notonorbefore',
    NOTWITHIN:               'notwithin',
    ON:                      'on',
    ONORAFTER:               'onorafter',
    ONORBEFORE:              'onorbefore',
    STARTSWITH:              'startswith',
    WITHIN:                  'within'
  };

  function newSearch() {
    const search = {
      id: Math.floor(Math.random() * 10000),
      columns: [],
      filters: [],
      run: function() { /* no-op */ }
    };
    return search;
  }

  function create(opts) {
    const search = newSearch();
    if (opts.columns) {
      columns = opts.columns;
    }
    if (opts.filters) {
      filters = opts.filters;
    }
  }

  function load(opts) {
    const search = newSearch();
    search.id = opts.id;
    return search;
  };

  return {
    Operator: operators,
    load:    load,
    createColumn: function(opts) { return null; },
    createFilter: function(opts) { return null; },
  };

})();
