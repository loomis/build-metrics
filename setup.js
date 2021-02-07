const core = require('@actions/core');

var millis = Date.now();
core.setState("jobStart", millis);
console.log("job start timestamp (ms): ", millis);
