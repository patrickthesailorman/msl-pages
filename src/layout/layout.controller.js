/**
 * Layout controller
 */

export default class layoutCtrl {
  /*@ngInject*/

  /**
   * @constructor
   * @param {$rootScope.Scope} $scope
   */
  constructor($scope) {
    this.$scope = $scope;
    this.HOST = process.env.API_HOST;
  }
}
