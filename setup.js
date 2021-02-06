const core = require('@actions/core');
const github = require('@actions/github');
const artifact = require('@actions/artifact');
const artifactClient = artifact.create()
const artifactName = 'opentelemetry-context'

const fs = require('fs');

try {
  const rootDirectory = '.' // Also possible to use __dirname
  const options = {
      continueOnError: false
  }

  fs.writeFile('context', 'my context');
  const files = ['context']
  const uploadResponse = artifactClient.uploadArtifact(artifactName, files, rootDirectory, options)
    
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput('who-to-greet');
  console.log(`Hello ${nameToGreet}!`);
  const time = (new Date()).toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
