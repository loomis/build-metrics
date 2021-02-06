const core = require('@actions/core');

try {
  console.log(`Setup script running!`);
} catch (error) {
  core.setFailed(error.message);
}
