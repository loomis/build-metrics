const core = require('@actions/core');

try {
  console.log(`Cleanup script running!`);
} catch (error) {
  core.setFailed(error.message);
}
