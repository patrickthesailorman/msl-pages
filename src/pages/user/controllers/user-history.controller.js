/**
 * My page history state controller
 */
export default class historyCtrl {
  /*@ngInject*/

  /**
  * @constructor
  * @param {$rootScope.Scope} $scope
  * @param {recentSongsStore} recentSongsStore
  */
  constructor($scope, recentSongsStore) {
    /**
     * Fetch content from my history store.
     * This is not angular event so we need to digest scope manually.
     */
    (async () => {
      this.content = await recentSongsStore.fetch();
      this.display = true;
      $scope.$evalAsync();
    })();
  }

}
