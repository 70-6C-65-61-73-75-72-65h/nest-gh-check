const core = require('@actions/core');
const github = require('@actions/github');

try {
  const name = core.getInput('who-to-greet');
  core.setSecret(name);
  // console.log(`Hello ${name}`);
  core.debug(`Hello ${name}`);
  core.warning(`Hello ${name}`);

  const time = new Date();

  core.setOutput('time', time.toTimeString());

  core.startGroup('Loggin github object');
  console.log(JSON.stringify(github, null, 2));
  core.endGroup();
  core.exportVariable('Hello', 'hello');
} catch (error) {
  core.setFailed(`if error occured you may see that, ${error.message}`);
}
