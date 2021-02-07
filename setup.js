const core = require('@actions/core');

var millis = Date.now();
core.saveState("jobStart", millis);
console.log("job start timestamp (ms): ", millis);
