import { browser, element, by } from 'protractor';

export class SlideshowPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('slide-root h1')).getText();
  }
}
