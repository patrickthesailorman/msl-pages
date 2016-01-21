/**
 * Login page main controller.
 * @param {$rootScope.Scope} $scope
 * @param {authentication} authentication
 * @param {ui.router.state.$state} $state
 */
export default class loginCtrl {
  /*@ngInject*/

  /**
   * User form submit action.
   */

  constructor($scope, authentication, $state) {
    this.submit = async() => {
      delete this.hasError;
      try {
        await authentication.authenticate(this.email, this.password);
        // If authentication is success then redirect user to home page
        $state.go('msl.home');
      } catch(e) {
        this.hasError = true;
        $scope.$evalAsync();
      }
    };
  }

}
