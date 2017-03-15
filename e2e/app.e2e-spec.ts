import { GameOfLifePage } from './app.po';

describe('game-of-life App', () => {
  let page: GameOfLifePage;

  beforeEach(() => {
    page = new GameOfLifePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('gol works!');
  });
});
