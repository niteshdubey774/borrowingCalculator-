const {When, Then, And, Given} = require("cucumber")
const expect = require("chai").expect;
const puppeteer = require("puppeteer")

var {setDefaultTimeout} = require('cucumber');
setDefaultTimeout(60 * 1000);
var page;

Given("The browser is open", async function(){
    browser = await puppeteer.launch({

        rgs: ['--start-fullscreen', '--window-size=1920,1080'],
        headless: false,
        args: [
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process',
            '--start-maximized'
        ],
        defaultViewport: null,
        slowMo: 30,
        devtools: false,

    })
    page = await browser.newPage();
})

When('open the loan calculator', async function () {

    await page.waitForTimeout(2000);
    await page.goto("https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/")
});

When('user fill all details', async function () {


    const applicationType = await page.$("#application_type_single");
    const isRadioSelected = await (await applicationType.getProperty("checked")).jsonValue();

    if(isRadioSelected){
        console.log('Application type is single');
    }
    else
    {

    await page.waitForSelector('#application_type_single');
    await page.click('#application_type_single');
    }

      const ele ='[title="Number of dependants"]'
      await page.select(ele, '0');

    //'borrow_type_home'
    const typeOfProperty = await page.$('#borrow_type_home');
    const isPropertyType = await (await typeOfProperty.getProperty("checked")).jsonValue();
    if(isPropertyType){

        console.log('Type of Property Home to Live in ');
    }
    else
    {

    await page.waitForSelector('#borrow_type_home');
    await page.click('#borrow_type_home');
    }

    await page.waitForTimeout(2000);
    await page.type('div > div:nth-child(2) > div > input[type=text]', '80,000');
    await page.waitForTimeout(2000);
    await page.type('div > div:nth-child(2) > div > div:nth-child(3) > div > input[type=text]', '10,000');
    await page.type('#expenses', '500');
    await page.type('#homeloans', '0');
    await page.type('#otherloans', '100');
    await page.type('#credit', '10000');
});

Then('user can see the loan amount', async function () {
    
    await page.waitForTimeout(2000);

    await page.click('#btnBorrowCalculater');
    
    await page.waitForTimeout(2000);

    let element = await page.$('#borrowResultTextAmount');

    let borrowAmount = await page.evaluate(el => el.textContent, element);

    console.log('User can borrow : '+ borrowAmount.replace(/\$|,/g, '') )

});

Then('user click the start over button clears the form', async function (){
    console.log('restart the app')
    
    await page.click('div > div.borrow__result__action > div > button > span');
    console.log('restart the app')
  });

  Then('user fill only $1 for Living expenses', async function (){
    
    await page.waitForTimeout(2000);
    await page.type('#expenses', '1');

  });

  Then ('user ckick the Work out how much I could borrow button', async function (){

    await page.waitForTimeout(2000);

    await page.click('#btnBorrowCalculater');
    
    
  });
  Then ('user can see the erro message', async function (){

    await page.waitForTimeout(2000);

    const expectedErrorMessage = "Based on the details you've entered, we're unable to give you an estimate of your borrowing power with this calculator. For questions, call us on 1800 035 500.";

    let element = await page.$('.borrow__error__text');

    let actualErrorMessage = await page.evaluate(el => el.textContent, element);
     console.log(actualErrorMessage)
    expect(expectedErrorMessage).to.equal(actualErrorMessage.trim());
    
  })

  