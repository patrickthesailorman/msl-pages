/**
 * Album box controller.
 */
export default class albumBoxCtrl {
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
  * Checks if state is library.
  * @returns {boolean}
  */
  isLibraryPage () {
    return this.$state.is('msl.library');
  }
}
