/**
 * Helper utilities
 *
 * @NApiVersion 2.0
 */
define(['N/search'], function(search) {

  // Helper function for getting the internal ID of a custom list value by its
  // string name
  function getCustomListIdByName(listScriptID, listName) {
    var listID = null;
    var results = search.create({
      type: listScriptID,
      filters: ['name', 'is', listName],
      columns: ['internalid']
    }).run();
    results.each(function(result) {
      //log.debug(JSON.stringify(result));
      listID = result.getValue({ name: 'internalid' });
      return true;
    });
    return listID;
  }

  return {
    'getCustomListIdByName': getCustomListIdByName
  };

});
