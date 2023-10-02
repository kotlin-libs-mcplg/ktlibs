import * as core from 'npm:@actions/core@1.10'
import * as exec from 'npm:@actions/exec@1.1'
// @deno-types="npm:@types/semver@7.5"
import semver from 'npm:semver@7.5'
import { ulid } from 'npm:ulid@2.3'
import { fetchXml } from './net.ts'
import type { MavenMetadata, Project, Versions } from './types.ts'
import { editVersion } from './edit_version.ts'

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
        await exec.exec('git', ['config', '--global', 'user.email', '41898282+github-actions[bot]@users.noreply.github.com'])
        await exec.exec('git', ['config', '--global', 'user.name', 'github-actions[bot]'])

        const now = new Date()

        const id = ulid()

        const time = `${now.getFullYear()}_${now.getUTCMonth()}_${now.getUTCDate()}`

        const commit_msg = `sync(versions) ${time} ${id}`
        const branch_name = `sync_versions_${time}_${id}`
        await exec.exec('git', ['checkout', '-b', branch_name])

        await Deno.writeTextFile(versions_path, versions_text)
        await Deno.writeTextFile(versions_path, '\n', { append: true })

        for (const proj of projects) {
            const vers = versions[proj.name]
            if (vers.length == 0) continue
            const last = vers[vers.length - 1]
            await editVersion(proj.verKey, last)
        }

        await exec.exec('git', ['commit', '-a', '-m', commit_msg])
        await exec.exec('git', ['push', '-u', 'origin', branch_name])

        core.setOutput('versions_change', true)
        core.setOutput('branch_name', branch_name)
        core.setOutput('commit_msg', commit_msg)
    } else {
        console.log(versions_text)
    }
}

async function check(proj: Project) {
    const maven_metadata = await fetchXml<MavenMetadata>(
        new URL('./maven-metadata.xml', proj.maven),
    )
    const existing_versions = new Set<string>()
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
