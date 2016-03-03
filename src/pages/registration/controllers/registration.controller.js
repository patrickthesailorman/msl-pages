/**
 * Registration page main controller.
 */
export default class registrationCtrl {
  /*@ngInject*/

  /**
  * @constructor
  * @param {$rootScope.Scope} $scope
  * @param {authentication} authentication
  * @param {registrationStore} registrationStore
  * @param {ui.router.state.$state} $state
  * @param {toastr} toastr
  */
  constructor($scope, authentication, registrationStore, $state, toastr) {
    this.$scope = $scope;
    this.authentication = authentication;
    this.registrationStore = registrationStore;
    this.$state = $state;
    this.toastr = toastr;
  }

  /**
  * Submit action for the registration form.
  */
  async submit() {
    delete this.hasError;
    try {
      let response = await this.registrationStore.registration(
        this.email,
        this.password,
        this.confirmationPassword
      );

      if(response.message === 'success') {
        this.toastr.success('Successfully create account');
        await this.authentication.authenticate(this.email, this.password);
        this.$state.go('msl.home'); // If login is success then redirect user to home page
      }
      else {
        this.toastr.success('Unable to create account');
      }
    } catch(e) {
      this.hasError = true;
      this.$scope.$evalAsync();
    }
  }
}
