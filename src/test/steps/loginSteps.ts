import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { Browser, chromium, expect, Page } from '@playwright/test';
setDefaultTimeout(20000); // Increase the timeout to 20000 milliseconds (20 seconds)
let browser: Browser;
let page: Page;

const cheerio = require('cheerio');
const jsdom = require('jsdom');

const emailField = '[name="customer[email]"][id="CustomerEmail"]';
const passwordField = '[name="customer[password]"][id="CustomerPassword"]';
const signInButton = 'input[type="submit"][value="Sign In"]';
const searchField = '[id="searchInput]';
Given('User navigates to the application', async function () {
  console.log('Launching browser...');
  browser = await chromium.launch({ headless: false });

  console.log('Creating new page...');
  page = await browser.newPage();

  console.log('Navigating to URL...');
  await page.goto('https://telfar.net/');
});

// 1) Scenario: User can login with valid credentials # src\test\features\login.feature:8
//    × Given User navigates to the application
//        Multiple step definitions match:
//          User navigates to the application - src\test\steps\loginSteps.ts:3
//          User navigates to the application - src\test\steps\searchClothing.ts:3
//    ? Given User Clicks on the Login Button

Then('User Clicks on the Login Button', async function () {
  // Write code here that turns the phrase above into concrete actions
  await page.waitForSelector('#customer_login_link');
  await page.click('#customer_login_link'); // Click the link with id="customer_login_link"
});

//    ? And User enters the username "lavoti5445@djpich.com"

Then('User enters the username {string}', async function (username) {
  // Write code here that turns the phrase above into concrete actions
  await page.waitForSelector(emailField); // Wait for the input element to show up
  // Replace with the desired username string
  await page.fill(emailField, username); // Type the username string into the input element
});
//    ? And User enters the username "typescript123"

Then('User enters the password {string}', async function (password) {
  await page.waitForSelector(passwordField); // Wait for the input element to show up
  // Replace with the desired username string
  await page.fill(passwordField, password);
});

//    ? When User clicks the login Button

Then('User clicks the login Button', async function () {
  // Write code here that turns the phrase above into concrete actions
  await page.click(signInButton);
});

//    ? Then Login should be successful
//        Undefined. Implement with the following snippet:
When('Login is successful', async function () {
  // Write code here that turns the phrase above into concrete actions
  // Check if the element exists
  const accountLink = await page.locator('a[href="/account"]');
  await expect(accountLink).toBeVisible();
});
Then('Login should be successful', async function () {
  // Write code here that turns the phrase above into concrete actions
  // Check if the element exists
  const accountLink = await page.locator('a[href="/account"]');
  await expect(accountLink).toBeVisible();
  await browser.close();
});

// 2) Scenario: User cannot login with invalid credentials # src\test\features\login.feature:14
//    × Given User navigates to the application
//        Multiple step definitions match:
//          User navigates to the application - src\test\steps\loginSteps.ts:3
//          User navigates to the application - src\test\steps\searchClothing.ts:3
//    ? Given User Clicks on the Login Button

//    ? When User clicks the login Button

When('But Login is unsuccessful', async function () {
  // Write code here that turns the phrase above into concrete actions
  const errorElement = await page.locator(
    'div.errors ul li:has-text("Incorrect")'
  );
  const shopifyChallengeMessage = await page.locator(
    '.shopify-challenge__message'
  );

  try {
    await expect(errorElement).toBeVisible();
  } catch {
    await expect(shopifyChallengeMessage).toBeVisible();
  }

  await browser.close();
});

//    ? When User clicks the search icon

When('User clicks the search form', async function () {
  // Write code here that turns the phrase above into concrete actions
  await page.click('#searchInput');
});

//  ? And User enters the search-term "red"

When('User enters the search-term {string}', async function (color) {
  // Write code here that turns the phrase above into concrete actions
  await page.fill('#searchInput', color);
});

When('User presses enter', async function () {
  // Write code here that turns the phrase above into concrete actions
  await page.keyboard.press('Enter');
});

//    ? Then there is atleast one result
When('I grab the HTML table', async function () {
  const html = await this.page.content();
  const dom = new jsdom(html);
  const table = dom.window.document.querySelector('table');
  const tableHtml = table.outerHTML;
  const $ = cheerio.load(tableHtml);
  const rows = $('tr');
  rows.each((i: number, row:object) => {
    const columns = $(row).find('td');
    columns.each((j: number, column:object) => {
      console.log($(column).text());
    });
  });
});
Then('there is atleast one result', async function () {
  // Write code here that turns the phrase above into concrete actions
  await page.waitForLoadState('domcontentloaded');
  
  await page.waitForSelector('.product__title');
  const title = await page.$('.product__title');
  const titleText = await title?.textContent();

  await page.waitForSelector('.product__price');
  const price = await page.$('.product__price');
  const priceText = await price?.textContent()
  console.log(titleText,priceText);
  
});

//   ? But there are no results
When('User checks results pop up with no result', async function () {
  // Write code here that turns the phrase above into concrete actions
   await page.$('.list-group-item:has-text("No Results")');

});


