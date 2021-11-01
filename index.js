const puppeteer = require('puppeteer');
const fs = require('fs');


(async() => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    console.log("Robo iniciado");

    await page.goto('https://web.whatsapp.com/');

    await page.waitForNavigation();
    await page.waitForSelector("._3Bc7H");
    await delay(5000);

    //Change to contact you want to send messages to
    const contactName = "Isaac Cabral";
    await page.click(`span[title='${contactName}']`);
    await page.waitForSelector("._1LcQK");

    //Finds the message bar and focuses on it
    const editor = await page.$("div[tabindex='-1']");
    await editor.focus();

    //Amount of messages you want to send
    const amountOfMessages = 500;

    //Loops through cycle of sending message
    for (var i = 0; i < amountOfMessages; i++) {
      await page.evaluate(() => {
        const message = "Não tenho interesse, obrigado. ";
        document.execCommand("insertText", false, message);
      });
      await page.click("span[data-testid='send']");
      await delay(500);
    }

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

})();