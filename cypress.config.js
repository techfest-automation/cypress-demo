const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');  
const exec = require('child_process').execSync; 
module.exports = {
  watchForFileChanges :false,
  includeShadowDom: true,
  "reporter": "cypress-multi-reporters",  
  "reporterOptions": {  
    "reporterEnabled": "cypress-mochawesome-reporter, mocha-junit-reporter",  
    "cypressMochawesomeReporterReporterOptions": {  
      "reportDir": "cypress/reports",
      "charts": true,  
      "reportPageTitle": "My Test Suite",  
      "embeddedScreenshots": true,  
      "inlineAssets": true  
    },  
    "mochaJunitReporterReporterOptions": {  
      "mochaFile": "cypress/reports/junit/results-[hash].xml"  
    }  
  },  
"video": false,
 
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
 
      on('before:run', async (details) => {  
        console.log('override before:run');  
        await beforeRunHook(details);  
        //If you are using other than Windows remove below two lines  
        await exec("IF EXIST cypress\\screenshots rmdir /Q /S cypress\\screenshots")  
        await exec("IF EXIST cypress\\reports rmdir /Q /S cypress\\reports")  
      });
    on('after:run', async () => {  
        console.log('override after:run');  
        //if you are using other than Windows remove below line starts with await exec  
        await exec("npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml");  
        await afterRunHook();  

 
     });
    },
  },
};