const dataJSON = require("../data/urls.json");
const winston = require('winston');

const { test, expect } = require('@playwright/test');
test('log console errors', async ({ page }) => {
    const options = {
        level: "error",
        transports: [
            new winston.transports.File({ filename: 'logs/error.log', level: 'error',  options: { flags: 'w' } })
        ]

    };
   
    const logger = winston.createLogger(options);
    

    for (const data of dataJSON) {
        page.on("console", msg => {
            // console.log(msg.type());
            if (msg.type() == "error") {
                console.log("Console Error found on " + data.url + " " + msg.text());
                logger.error("Console Error found on " + data.url + " " + msg.text());
            }
            else if (msg == "" && msg.type() != "error") {
                console.log("There is no console error found on " + data.url);
                logger.error("There is no console error found on " + data.url);
            }

        })
        
        await page.goto(data.url);
       
       
      }
   
  });