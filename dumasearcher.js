/**
 * -Given the next parameters, returns an array with name and url from the teachers who appeared at the results
 * @param {ç} name    Name of the teacher
 * @param {*} surname First Name
 * @param {*} college University College from UMA
 * @returns 
 */
async function dumasearch(nombre, apellido1, centro) {
  // Headles:False to see the process
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();

  await page.goto("https://duma.uma.es/duma/buscador/persona/");

  await page.type("#id_nombre", name);

  // The center should be decoded as the next map, that could be done in this function or the one who calls it
  /*
  {
    "Escuela de Ingenierías Industriales": "a01b01",
    "E. T. S. de Arquitectura": "a01b27",
    "E.T.S. de Ingeniería de Telecomunicación": "a01b07",
    "E. T. S. de Ingeniería Informática": "a01b06",
    "E.U. de Enfermería": "a01b02",
    "Facultad de Bellas Artes": "a01b26",
    "Facultad de Ciencias": "a01b15",
    "Facultad de Ciencias de la Comunicación": "a01b16",
    "Facultad de Ciencias de la Educación": "a01b17",
    "Facultad de Ciencias de la Salud": "a01b08",
    "Facultad de Ciencias Económicas y Empresariales": "a01b19",
    "Facultad de Comercio y Gestión": "a01b11",
    "Facultad de Derecho": "a01b20",
    "Facultad de Estudios Sociales y del Trabajo": "a01b18",
    "Facultad de Filosofía y Letras": "a01b03",
    "Facultad de Medicina": "a01b22",
    "Facultad de Psicología y Logopedia": "a01b23",
    "Facultad de Turismo": "a01b13"
  }
  */
  
  if (college) {
    await page.select("#id_centro", college);
  }

  await page.type("#id_apellido_1", surname);

  await page.keyboard.press("Enter");

  await page.waitForNavigation();

  // Evaluates the page and gets the data from the search

  const teachernames = await page.evaluate(() => {
    const elements = document.querySelectorAll("h4 a");
    const namesfound = [];
    let res;
    let i;

    for (const element of elements) {
      i = 0;
      res = false;
      const title = element.title;
      const url = element.href;
      while (!res && i < namesfound.length) {
        if (title == namesfound[i]) {
          res = true;
        }
        i += 2;
      }
      if (!!element.title && !res) {
        namesfound.push(title);
        namesfound.push(url);
      }
    }

    return namesfound;
  });

  await browser.close();
  return teachernames;
}
