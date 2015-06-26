readingItemsApp.factory('readingItemsFactory', function($http) {
  var urlBase = '/api/readingItems';
  var _readingItemsService = {};
 
  _readingItemsService.getReadingItems = function() {
    return $http.get(urlBase);
  };
 
  _readingItemsService.saveReadingItem = function(readingItem) {
    return $http.post(urlBase, readingItem);
  };
 
  _readingItemsService.updateReadingItem = function(readingItem) {
    return $http.put(urlBase, readingItem);
  };
 
  _readingItemsService.deleteReadingItem = function(id) {
    return $http.delete(urlBase + '/' + id);
  };
 
  return _readingItemsService;
});