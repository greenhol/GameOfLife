import { browser, element, by } from 'protractor';

export class GameOfLifePage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('gol-root h1')).getText();
  }
}
