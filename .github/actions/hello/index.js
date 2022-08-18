const core = require('@actions/core');
const github = require('@actions/github');

try {
  const name = core.getInput('who-to-greet');

  console.log(`Hello ${name}`);

  const time = new Date();

  core.setOutput('time', time.toTimeString());

  console.log(JSON.stringify(github, null, 2));
} catch (error) {
  core.setFailed(`if error occured you may see that, ${error.message}`);
}
