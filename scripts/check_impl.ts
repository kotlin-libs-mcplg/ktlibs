import * as core from 'npm:@actions/core@1.10'
import * as exec from 'npm:@actions/exec@1.1'
import * as github from 'npm:@actions/github@5.1'
// @deno-types="npm:@types/semver@7.5"
import semver from 'npm:semver@7.5'
import { ulid } from 'npm:ulid@2.3'
import { fetchPost, fetchXml } from './net.ts'
import type { MavenMetadata, Project, Versions } from './types.ts'

const github_actions = !!Deno.env.get('GITHUB_ACTION')
const github_token = Deno.env.get('GITHUB_TOKEN')!
const github_repository = Deno.env.get('GITHUB_REPOSITORY')!
const github_repository_owner = Deno.env.get('GITHUB_REPOSITORY_OWNER')!

console.log({
    github_actions,
    github_token,
    github_repository,
    github_repository_owner,
})

const versions_path = './versions.json'
const projects_path = './projects.json'

const last_versions_text = await Deno.readTextFile(versions_path)
const versions: Versions = JSON.parse(last_versions_text)
const projects: Project[] = JSON.parse(await Deno.readTextFile(projects_path))

core.info(`projects: ${projects.map((a) => a.name).join(', ')}`)

await Promise.all(projects.map(check))

const versions_text = JSON.stringify(versions, null, 2)
if (versions_text != last_versions_text) {
    if (github_actions) {
        const octokit = github.getOctokit(github_token)

        await exec.exec('git', ['config', '--global', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com'])
        await exec.exec('git', ['config', '--global', 'user.name', 'github-actions[bot]'])

        const id = ulid()

        const commit_msg = `sync(versions) ${id}`
        const branch_name = `sync_versions_${id}`
        await exec.exec('git', ['checkout', '-b', branch_name])

        await Deno.writeTextFile(versions_path, versions_text)
        await Deno.writeTextFile(versions_path, '\n', { append: true })

        await exec.exec('git', ['commit', '-a', '-m', commit_msg])
        await exec.exec('git', ['push', '-u', 'origin', branch_name])

        const repo = github_repository.substring(github_repository_owner.length + 1)

        await octokit.request('POST /repos/{owner}/{repo}/pulls', {
            owner: github_repository_owner,
            repo,
            title: commit_msg,
            head: `${github_repository_owner}:${branch_name}`,
            base: 'main',
            headers: {
                'X-GitHub-Api-Version': '2022-11-28',
            },
        })
    } else {
        console.log(versions_text)
    }
}

async function check(proj: Project) {
    const maven_metadata = await fetchXml<MavenMetadata>(
        new URL('./maven-metadata.xml', proj.maven),
    )
    const existing_versions = new Set(versions[proj.name] ?? [])
    for (const version of maven_metadata.metadata.versioning.versions.version) {
        const ver = semver.coerce(version)
        if (ver == null || semver.valid(ver) == null) continue
        const std = semver.valid(ver) != null && semver.valid(version) != null
        if (semver.lt(ver, proj.minVer)) continue
        const ver_name = std ? version : ver.format()
        const pre = semver.prerelease(ver_name)
        if (pre != null) continue
        existing_versions.add(version)
    }
    versions[proj.name] = [...existing_versions].sort((a, b) => semver.compare(semver.coerce(a)!, semver.coerce(b)!))
}
