/**
 * My page library state controller.
 */
export default class libraryCtrl {

  /*@ngInject*/

  /**
  * @constructor
  * @param {$rootScope.Scope} $scope
  * @param {myLibraryStore} myLibraryStore
  */
  constructor($scope, myLibraryStore) {
    /**
     * Fetch content from my library store.
     * This is not angular event so we need to digest scope manually.
     */
    (async () => {
      this.content = await myLibraryStore.fetch();
      this.display = true;
      $scope.$evalAsync();
    })();
  }

}
