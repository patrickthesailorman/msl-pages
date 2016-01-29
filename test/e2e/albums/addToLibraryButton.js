/* global describe, it, expect, beforeEach, pending */
describe('add albums to library button', () => {

  describe('When not authenticated', () => {
    beforeEach(() => {
      browser.driver.get(`${ browser.baseUrl }/?tab=albums`);
      browser.driver.sleep(600);
    });

    describe('When try to click on Add To Library', () => {
      it('The link should be disabled', () => {
        const link = element(By.css('[data-pt-id=add-to-library]'));
        expect(link.isPresent()).toBeFalsy();
      });
    });
  });
});
