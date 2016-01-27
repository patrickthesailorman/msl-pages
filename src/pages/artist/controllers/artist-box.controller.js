/**
 * Artist box controller.
 */
export default class artistBoxCtrl {
  /*@ngInject*/

  /**
   * @constructor
   * @this {vm}
   * @param {ui.router.state.$state} $state
   * @param {authentication} authentication
   */
  constructor($state, authentication) {
    this.$state = $state;
    this.authentication = authentication;
  }

  /**
  * Checks if state is 'msl.library'.
  * @returns {*}
  */
  isLibraryPage () {
    return this.$state.is('msl.library');
  }
}
