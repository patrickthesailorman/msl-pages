/* global describe, it, expect, beforeEach, pending */
describe('add songs to library button', () => {

  describe('When not authenticated', () => {
    beforeEach(() => {
      browser.driver.get(`${ browser.baseUrl }/?tab=songs`);
      browser.driver.sleep(600);
    });

    describe('When try to click on Add To Library', () => {
      it('The link should be disabled', () => {
        const link = element(By.css('[data-pt-id=add-to-library]'));
        expect(link.isPresent()).toBeFalsy();
      });
    });
  });

  describe('When authenticated', () => {
    beforeAll(() => {
      browser.driver.manage().deleteAllCookies();
      browser.driver.get(`${ browser.baseUrl }/login`);
      browser.driver.findElement(By.name('email')).sendKeys('correct@email.com');
      browser.driver.findElement(By.name('password')).sendKeys('12345678A?');
      browser.driver.sleep(600);
      browser.driver.findElement(By.css('form button')).click();
      browser.driver.sleep(600);
    });

    beforeEach(() => {
      browser.driver.get(`${ browser.baseUrl }/?tab=songs`);
      browser.driver.sleep(600);
      const box = browser.driver.findElement(By.css('.media-box-inner-image'));
      browser.driver.actions().mouseMove(box).perform();
      browser.driver.sleep(600);
    });

    it('should enable the Add To Library button', () => {
      const link = element(By.css('[data-pt-id=add-to-library]'));
      expect(link.isPresent()).toBeTruthy();
    });

    it('should stay at the songs tab', () => {
      browser.driver.findElement(By.css('[data-pt-id=add-to-library]')).click();
      browser.driver.sleep(600);
      const currentUrl = browser.driver.getCurrentUrl();
      expect(currentUrl).toBe(`${ browser.baseUrl }/?tab=songs`);
    });

    afterAll(() => {
      browser.driver.findElement(By.css('[data-pt-id=logout]')).click();
      browser.driver.sleep(600);
    });
  });
});


