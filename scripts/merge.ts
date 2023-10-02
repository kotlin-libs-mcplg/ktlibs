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

const res_pr = await octokit.rest.pulls.create({
    owner,
    repo,
    title: commit_msg,
    head: `${owner}:${branch_name}`,
    base: 'main',
})
const res_pr_merge = await octokit.rest.pulls.merge({
    owner,
    repo,
    pull_number: res_pr.data.number,
})

const commit_sha = res_pr_merge.data.sha

core.setOutput('commit_sha', commit_sha)

await octokit.rest.git.deleteRef({
    owner,
    repo,
    ref: branch_name,
})
