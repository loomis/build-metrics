const core = require('@actions/core');

const finalize = core.getInput('finalize')
console.log("finalize: ", finalize);

const state = core.getState("state");
console.log("state: ", state);
