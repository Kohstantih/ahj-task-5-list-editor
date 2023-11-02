import puppeteer from 'puppeteer';

jest.setTimeout(50000);
describe('creating entries in the product list, editing, deleting', () => {
  let browser;
  let page;

  beforeEach(async () => {
    browser = await puppeteer.launch({
      args: [
        '--start-maximized',
      ],
      headless: false,
      slowMo: 100,
      devtools: true,
    });

    page = await browser.newPage();
  });

  test('checking the creation of a new record, displaying input warnings', async () => {
    await page.goto('http://localhost:9000');

    await page.waitForSelector('.create-item_list');
    const btnAdd = await page.waitForSelector('.btn_add');
    await btnAdd.click();

    const inputName = await page.waitForSelector('.aplecation');
    const inputPrice = await page.waitForSelector('.price');

    const btnSave = await page.waitForSelector('.btn_save');
    const btnCansel = await page.waitForSelector('.btn_cansel');

    await inputName.type('Su');
    await btnSave.click();
    await page.waitForSelector('.toolTip');

    await inputName.type('msung Galaxy S23');

    await inputPrice.type('759');
    await btnSave.click();

    await btnAdd.click();
    await btnSave.click();
    await page.waitForSelector('.toolTip');
    await btnCansel.click();

    const btnEdit = await page.waitForSelector('.btn_edit');
    const btnDel = await page.waitForSelector('.btn_delete');

    await btnEdit.click();
    await inputName.type(' 8GB');
    await inputPrice.type('2');
    await btnSave.click();

    await btnDel.click();
    await page.waitForSelector('.confirmation-box');
    const btnYes = await page.waitForSelector('.confirmation-btn_yes');
    const btnNo = await page.waitForSelector('.confirmation-btn_no');

    await btnNo.click();
    await btnDel.click();
    await btnYes.click();
  });

  afterEach(async () => {
    await browser.close();
  });
});
