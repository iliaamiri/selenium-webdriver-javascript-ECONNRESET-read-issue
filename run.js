const {Builder} = require('selenium-webdriver');

(async function run(){
    try {
        let driver = await new Builder()
        .forBrowser('firefox')
        .usingServer(`http://localhost:4444/wd/hub`)
        .build();
        
        console.log("Done");
    } catch(e) {
        console.log(e);
    }
await driver.get('https://google.com');
})();
