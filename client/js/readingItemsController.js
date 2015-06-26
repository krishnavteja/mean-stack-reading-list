readingItemsApp.controller('readingItemsCtrl', function($rootScope, $scope, readingItemsFactory) {
 
  $scope.readingItems = [];
  $scope.isEditable = [];
 
  // get all readingItems on Load
  readingItemsFactory.getReadingItems().then(function(data) {
    $scope.readingItems = data.data;
  });
 
  // Save a readingItem to the server
  $scope.save = function($event) {
    if ($event.which == 13 && $scope.readingItemInput) {
 
      readingItemsFactory.saveReadingItem({
        "readingItem": $scope.readingItemInput,
        "isCompleted": false
      }).then(function(data) {
        $scope.readingItems.push(data.data);
      });
      $scope.readingItemInput = '';
    }
  };
 
  //update the status of the readingItem
  $scope.updateStatus = function($event, _id, i) {
    var cbk = $event.target.checked;
    var _t = $scope.readingItems[i];
    readingItemsFactory.updateReadingItem({
      _id: _id,
      isCompleted: cbk,
      readingItem: _t.readingItem
    }).then(function(data) {
      if (data.data.ok && data.data.nModified) {
        _t.isCompleted = cbk;
      } else {
        alert('Oops something went wrong!');
      }
    });
  };
 
  // Update the edited readingItem
  $scope.edit = function($event, i) {
    if ($event.which == 13 && $event.target.value.trim()) {
      var _t = $scope.readingItems[i];
      readingItemsFactory.updateReadingItem({
        _id: _t._id,
        readingItem: $event.target.value.trim(),
        isCompleted: _t.isCompleted
      }).then(function(data) {
        if (data.data.ok && data.data.nModified) {
          _t.readingItem = $event.target.value.trim();
          $scope.isEditable[i] = false;
        } else {
          alert('Oops something went wrong!');
        }
      });
    }
  };
 
  // Delete a readingItem
  $scope.delete = function(i) {
    readingItemsFactory.deleteReadingItem($scope.readingItems[i]._id).then(function(data) {
      if (data.data) {
        $scope.readingItems.splice(i, 1);
      }
    });
  };
 
});