const core = require('@actions/core');
const github = require('@actions/github');

const finalize = core.getInput('finalize')
console.log("finalize: ", finalize);

const jobStart = core.getState("jobStart");
const jobStop = Date.now();
const delta = jobStop - jobStart;
console.log(`job timing: ${jobStart}, ${jobStop}, ${delta}`);

// Get the JSON webhook payload for the event that triggered the workflow
const payload = JSON.stringify(github.context.payload, undefined, 2)
console.log(`event payload:\n${payload}`);

