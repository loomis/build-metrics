const core = require('@actions/core');

var millis = Date.now();
core.setOutput("jobStartTimestamp", millis);
console.log("job start timestamp (ms): ", millis)