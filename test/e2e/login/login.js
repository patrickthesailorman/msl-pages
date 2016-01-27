describe('login', () => {

  beforeEach(() => {
    browser.driver.get(`${ browser.baseUrl }/login`);
    browser.driver.sleep(600);
  });

  describe('When the form is empty', () => {
    it('Should disable the sign in button', () => {
      const button = browser.driver.findElement(By.name('login'));
      const isDisabled = button.getAttribute('disabled');
      expect(isDisabled).toBe('true');
    });
  });

  describe('When insert data', () => {
    let loginURL;

    beforeEach(() => {
      browser.driver.findElement(by.name('email')).clear();
      browser.driver.findElement(by.name('password')).clear();
    });

    describe('when email is invalid', () => {
      it('Login button should be disabled', () => {
        browser.driver.findElement(By.name('email')).sendKeys('@email.com');
        browser.driver.sleep(600);
        const button = browser.driver.findElement(By.name('login'));
        const isDisabled = button.getAttribute('disabled');
        expect(isDisabled).toBe('true');
      });
    });

    xdescribe('when the credentials are incorrect', () => {
      beforeEach(() => {
        loginURL = browser.driver.getCurrentUrl();
        browser.driver.findElement(By.name('email')).sendKeys('fail@email.com');
        browser.driver.findElement(By.name('password')).sendKeys('1234');
        browser.driver.findElement(By.css('form button')).click();
      });

      it('should remain on the same page', () => {
        expect(browser.driver.getCurrentUrl()).toMatch(loginURL);
      });

      it('should display the button disable', () => {
        const button = browser.driver.findElement(By.name('login'));
        expect(button.getAttribute('disabled')).toBe('true');
      });
    });

    describe('when the credentials are correct', () => {
      it('Should redirect to home page', () => {
        browser.driver.findElement(By.name('email')).sendKeys('correct@email.com');
        browser.driver.findElement(By.name('password')).sendKeys('12345678A?');
        browser.driver.findElement(By.css('form button')).click();
        browser.driver.sleep(600);
        loginURL = browser.driver.getCurrentUrl();
        expect(loginURL).toBe(`${ browser.baseUrl }/`);
        browser.driver.sleep(600);
        browser.driver.findElement(By.css('[data-pt-id=logout]')).click();
      });
    });
  });

});
