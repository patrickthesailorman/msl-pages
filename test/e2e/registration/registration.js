describe('registration', () => {

  beforeEach(() => {
    browser.driver.get(`${ browser.baseUrl }/register`);
    browser.driver.sleep(600);
  });

  describe('When the form is empty', () => {
    it('Should disable the sign up button', () => {
      const button = browser.driver.findElement(By.name('registration'));
      const isDisabled = button.getAttribute('disabled');
      expect(isDisabled).toBe('true');
    });
  });

  describe('When insert data', () => {
    let registrationURL;

    beforeEach(() => {
      browser.driver.findElement(by.name('email')).clear();
      browser.driver.findElement(by.name('password')).clear();
      browser.driver.findElement(by.name('confirmationPassword')).clear();
    });

    describe('when email is invalid', () => {
      beforeEach(() => {
        browser.driver.findElement(By.name('email')).sendKeys('@email.com');
        browser.driver.findElement(By.name('password')).sendKeys('Fake_pass123');
        browser.driver.findElement(By.name('confirmationPassword')).sendKeys('Fake_pass123');
        browser.driver.sleep(600);
      });

      it('Sign up button should be disabled', () => {
        const button = browser.driver.findElement(By.name('registration'));
        const isDisabled = button.getAttribute('disabled');
        expect(isDisabled).toBe('true');
      });

      it('Should display an error message', () => {
        const emailError = browser.driver.findElement(By.css('.input-field-error'));
        const emailErrorHidden = emailError.getAttribute('aria-hidden');
        expect(emailErrorHidden).toBe('false');
      });
    });

    describe('when both passwords do not match', () => {
      beforeEach(() => {
        browser.driver.findElement(By.name('email')).sendKeys('test@email.com');
        browser.driver.findElement(By.name('password')).sendKeys('fake_pass');
        browser.driver.findElement(By.name('confirmationPassword')).sendKeys('fake_pass12');
        browser.driver.sleep(600);
      });

      it('Sign up button should be disabled', () => {
        const button = browser.driver.findElement(By.name('registration'));
        const isDisabled = button.getAttribute('disabled');
        expect(isDisabled).toBe('true');
      });

      it('Should display an error message', () => {
        const passwordError = browser.driver.findElement(By.css('.input-field-error'));
        const passwordErrorHidden = passwordError.getAttribute('aria-hidden');
        expect(passwordErrorHidden).toBe('false');
      });
    });

    xdescribe('when the credentials are incorrect', () => {
      beforeEach(() => {
        registrationURL = browser.driver.getCurrentUrl();
        browser.driver.findElement(By.name('email')).sendKeys('fail@email.com');
        browser.driver.findElement(By.name('password')).sendKeys('1234');
        browser.driver.findElement(By.name('confirmationPassword')).sendKeys('123');
        browser.driver.findElement(By.css('#registration-form button[type=submit]')).click();
      });

      it('should remain on the same page', () => {
        expect(browser.driver.getCurrentUrl()).toMatch(registrationURL);
      });

      it('should display the button disable', () => {
        const button = browser.driver.findElement(By.css('#registration-form button[type=submit]'));
        expect(button.getAttribute('disabled')).toBe('true');
      });
    });

    describe('when the credentials are correct', () => {
      xit('Should redirect to home page', () => {
        browser.driver.findElement(by.name('email')).sendKeys('correct@email.com');
        browser.driver.findElement(by.name('password')).sendKeys('12345678A?');
        browser.driver.findElement(by.name('confirmationPassword')).sendKeys('12345678A?');
        browser.driver.findElement(By.name('registration')).click();
        browser.driver.sleep(600);
        registrationURL = browser.driver.getCurrentUrl();
        expect(registrationURL).toBe(`${ browser.baseUrl }/`);
      });
    });
  });

});
