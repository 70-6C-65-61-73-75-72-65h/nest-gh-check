const core = require('@actions/core');
const github = require('@actions/github');

async(()=>{ 
try {
    const token = core.getInput('token');
    const title = core.getInput('title');
    const body = core.getInput('body');
    const assignees = core.getInput('assignees');
    //   core.setSecret(name);
    //   // console.log(`Hello ${name}`);
    //   core.debug(`Hello ${name}`);
    //   core.warning(`Hello ${name}`);
  
    //   const time = new Date();
    const octokit = new github.GitHub(token);
  
    const response = await octokit.issues.create({
      // owner: github.context.repo.owner,
      // repo: github.context.repo.repo,
      ...github.context.repo,
      title,
      body,
      assignees: assignees ? assignees.split('\n') : undefined,
    });
  
    core.setOutput('issue', JSON.stringify(response.data, null, 2));
  
    core.startGroup('Loggin github object');
    console.log(JSON.stringify(github, null, 2));
    core.endGroup();
    core.exportVariable('Hello', 'hello');
  } catch (error) {
    core.setFailed(`error: ${error.message}`);
  }
  
})()