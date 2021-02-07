const core = require('@actions/core');
const github = require('@actions/github');
const artifact = require ('@actions/artifact');
const io = require('@actions/io');
const fs = require('fs');

const finalize = core.getInput('finalize')
console.log("finalize: ", finalize);

const jobStart = core.getState("jobStart");
const jobStop = Date.now();
const delta = jobStop - jobStart;
console.log(`job timing: ${jobStart}, ${jobStop}, ${delta}`);

const contents = `${jobStart}, ${jobStop}, ${delta}\n`;

// Get the JSON webhook payload for the event that triggered the workflow
// const payload = JSON.stringify(github.context.payload, undefined, 2);
// console.log(`event payload:\n${payload}`);

// save job information as an artifact
const artifactClient = artifact.create();
const artifactName = 'build-metrics-job-info';
const jobID = github.context.job;
const path = `./${jobID}`;
const file = `${jobID}-${artifactName}`;

console.log("context: ", github.context);
console.log("job:", github.context.job);
console.log("job_id", github.context.job.job_id);

(async function() {
  await io.mkdirP(path);
}());

try {
  const data = fs.writeFileSync(file, contents);
} catch (err) {
  console.error(err);
}

(async function () {
  const uploadResponse = await artifactClient.uploadArtifact(artifactName, [file], ".");
}());
