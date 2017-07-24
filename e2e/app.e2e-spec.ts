import { SlideshowPage } from './app.po';

describe('slideshow App', () => {
  let page: SlideshowPage;

  beforeEach(() => {
    page = new SlideshowPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('slide works!');
  });
});
