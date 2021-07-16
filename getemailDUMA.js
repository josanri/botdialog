 /*
 * Gets the email from a PDI or PAS from DUMA.
 * @param {*} url url de DUMA
 * @returns correo del profesor
 */
/*
async function getemail(url) {
  // Could be false if you want to see the whole process
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  await page.goto(url);

  // Waits for data to be loaded in order to collect it
  await page.waitForSelector("div.col-md-10");

  const telf = await page.evaluate(() => {
    return document.querySelectorAll("div.col-md-10")[1].innerHTML;
  });
  await browser.close();

  // The result would be "Name Surname<br>", so this removes the last part
  return telf.substring(0, datos.indexOf("<br>"));
}
