import { SFToolkitPage } from './app.po';

describe('sftoolkit App', function() {
  let page: SFToolkitPage;

  beforeEach(() => {
    page = new SFToolkitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
