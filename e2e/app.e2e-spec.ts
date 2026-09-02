import { OshopPage } from './app.po';

describe('oshop App', () => {
  let page: OshopPage;

  beforeEach(() => {
    page = new OshopPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});
