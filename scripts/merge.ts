import * as core from 'npm:@actions/core@1.10'
import * as github from 'npm:@actions/github@5.1'

const github_token = Deno.env.get('GITHUB_TOKEN')!
const github_repository = Deno.env.get('GITHUB_REPOSITORY')!
const github_repository_owner = Deno.env.get('GITHUB_REPOSITORY_OWNER')!
const branch_name = Deno.env.get('BRANCH_NAME')!
const commit_msg = Deno.env.get('COMMIT_MSG')!

const octokit = github.getOctokit(github_token)

const owner = github_repository_owner
const repo = github_repository.substring(github_repository_owner.length + 1)

const res = await octokit.rest.repos.merge({
    owner,
    repo,
    base: 'main',
    head: branch_name,
    commit_message: commit_msg,
})
const commit_sha = res.data.sha

core.setOutput('commit_sha', commit_sha)

await octokit.rest.git.deleteRef({
    owner,
    repo,
    ref: branch_name,
})
