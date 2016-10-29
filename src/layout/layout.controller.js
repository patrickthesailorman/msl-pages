/**
 * Layout controller
 */

export default class layoutCtrl {
  /*@ngInject*/

  /**
   * @constructor
   * @param {$rootScope.Scope} $scope
   * @param {object} $location
   */
  constructor($scope, $location) {
    this.$scope = $scope;
    this.HOST = 'http://' + $location.host();
  }
}
