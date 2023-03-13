const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const { connected } = require('process');

// try {
//   // `who-to-greet` input defined in action metadata file
//   const nameToGreet = core.getInput('who-to-greet');
//   console.log(`Hello ${nameToGreet}!`);
//   const time = (new Date()).toTimeString();
//   core.setOutput("time", time);
//   // Get the JSON webhook payload for the event that triggered the workflow
//   const payload = JSON.stringify(github.context.payload, undefined, 2)
//   console.log(`The event payload: ${payload}`);


  async function checkFileExistence(path) {
    return fs.promises.access(path, fs.constants.F_OK)
    .then(() => {
        core.info(`${path} exists`);
        return true;
    })
    .catch(() => {
        core.setFailed(`${path} does not exist`);
        return false;
    });
  }

(async () => {
    try {
   
        checkFileExistence("README.md");
        checkFileExistence("LICENSE");
        
    } catch (error) {
        core.setFailed(error.message);
    }
})();

// } catch (error) {
//   core.setFailed(error.message);
// }
