// @deno-types="npm:@types/semver@7.5"
import semver from 'npm:semver@7.5'
import { fetchXml } from './net.ts'
import type { MavenMetadata, Project, Versions } from './types.ts'

if (!import.meta.main) throw 'Unexpected execution'

const versions_path = './versions.json'
const projects_path = './projects.json'

const last_versions_text = await Deno.readTextFile(versions_path)
const versions: Versions = JSON.parse(last_versions_text)
const projects: Project[] = JSON.parse(await Deno.readTextFile(projects_path))

console.log('projects: ', projects.map((a) => a.name))

await Promise.all(projects.map(check))

const versions_text = JSON.stringify(versions, null, 2)
if (versions_text != last_versions_text) {
    await Deno.writeTextFile(versions_path, versions_text)
    await Deno.writeTextFile(versions_path, '\n', { append: true })

    // todo git commit
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
