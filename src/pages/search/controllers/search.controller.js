/**
 * Search page controller
 */
export default class searchCtrl {
  /*@ngInject*/

  /**
  * @constructor
  * @param {ui.router.state.$stateParams} $stateParams
  * @param {$log} $log
  */

  constructor($stateParams, $log) {
    // Get search query from $stateParams
    this.searchQuery = $stateParams.query;
    if(this.searchQuery) {
      $log.debug(`searched for: ${ this.searchQuery }`);
    }
    else {
      $log.error('Queried for empty string');
    }
  }
}
