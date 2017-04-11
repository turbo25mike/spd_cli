import { SprucePage } from './app.po';

describe('spruce App', () => {
  let page: SprucePage;

  beforeEach(() => {
    page = new SprucePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
