const core = require('@actions/core');
const github = require('@actions/github');
const artifact = require ('@actions/artifact');
const io = require('@actions/io');
const fs = require('fs');

const job = github.context.job;
const start = core.getState("jobStart");
const stop = Date.now();
const duration = stop - start;
console.log(`job timing: ${start}, ${stop}, ${duration}`);

metrics = {
  "job": job,
  "start": start,
  "stop": stop,
  "duration": duration,
}

const contents = JSON.stringify(metrics);

// Get the JSON webhook payload for the event that triggered the workflow
// const payload = JSON.stringify(github.context.payload, undefined, 2);
// console.log(`event payload:\n${payload}`);

// save job information as an artifact
const artifactClient = artifact.create();
const dir = `./build-metrics`;
const file = `${jobID}`;
const path = `${dir}/${file}`;

(async function() {
  await io.mkdirP(dir);
}());

try {
  const data = fs.writeFileSync(path, contents);
} catch (err) {
  console.error(err);
}

(async function () {
  const uploadResponse = await artifactClient.uploadArtifact(file, [file], dir);
  console.log(`upload-response: ${uploadResponse}`);
}());

const finalize = core.getInput('finalize')
console.log("finalize: ", finalize);

// now create the trace for the build
if (finalize == "YES") {
  (async function() {
    const downloadResponse = await artifactClient.downloadAllArtifacts();

    for (const response of downloadResponse) {
      console.log(response.downloadPath);
      const timing = JSON.parse(fs.readFileSync(response.downloadPath));
      console.log(timing);
    }
  }());
  
}