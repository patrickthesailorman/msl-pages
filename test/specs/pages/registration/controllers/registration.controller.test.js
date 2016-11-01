import registrationModule from 'pages/registration/registration.module.js';

describe('Registration Controller', () => {
  let $scope, registrationCtrl, authentication, registrationStore, $state, toastr;

  beforeEach(() => {
    angular.mock.module(registrationModule, ($provide) => {
      authentication = jasmine.createSpyObj('authentication', ['authenticate']);
      registrationStore = jasmine.createSpyObj('registrationStore', ['registration']);
      $state = jasmine.createSpyObj('$state', ['go']);
      toastr = jasmine.createSpyObj('toastr', ['success']);

      $provide.value('authentication', authentication);
      $provide.value('registrationStore', registrationStore);
      $provide.value('$state', $state);
      $provide.value('toastr', toastr);
    });

    inject(($rootScope, _$controller_) => {
      $scope = $rootScope.$new();
      registrationCtrl = _$controller_('registrationCtrl', { $scope });
    });
  });

  afterEach(() => {
    $scope.$destroy();
  });

  describe('submit', () => {
    const email = 'a@a.com';
    const password = 'paSSw0rd!!';
    const confirmationPassword = 'paSSw0rd!!';

    it('should call the registration store', (done) => {
      (async () => {
        registrationStore.registration.and.returnValue(Promise.resolve({message: 'success'}));
        registrationCtrl.email = email;
        registrationCtrl.password = password;
        registrationCtrl.confirmationPassword = confirmationPassword;

        await registrationCtrl.submit();

        expect(registrationStore.registration).toHaveBeenCalledWith(email, password, confirmationPassword);
        done();
      })();
    });

    it('should authenticate the user', (done) => {
      (async () => {
      registrationStore.registration.and.returnValue(Promise.resolve({message: 'success'}));
        authentication.authenticate.and.returnValue(Promise.resolve());
        registrationCtrl.email = email;
        registrationCtrl.password = password;

        await registrationCtrl.submit();

        expect(authentication.authenticate).toHaveBeenCalledWith(email, password);
        done();
      })();
    });

    it('should go to the home page', (done) => {
      (async () => {
        registrationStore.registration.and.returnValue(Promise.resolve({message: 'success'}));
        registrationCtrl.email = email;
        registrationCtrl.password = password;
        registrationCtrl.confirmationPassword = confirmationPassword;
        await registrationCtrl.submit();

        expect($state.go).toHaveBeenCalledWith('msl.home');
        done();
      })();
    });

    it('should set hasError when an error is raised', (done) => {
      (async () => {
        const error = new Error();

        registrationStore.registration.and.throwError(error);
        await registrationCtrl.submit();

        expect(registrationCtrl.hasError).toBeTruthy();
        done();
      })();
    });
  });
});
