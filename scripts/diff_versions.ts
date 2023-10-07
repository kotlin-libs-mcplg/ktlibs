import * as core from 'npm:@actions/core@1.10'
import type { ModrinthVersion, Project, Versions } from './types.ts'
import { fetchModrinth } from './modrinth.ts'

const versions_path = './versions.json'
const projects_path = './projects.json'

const versions: Versions = JSON.parse(await Deno.readTextFile(versions_path))
const projects: Project[] = JSON.parse(await Deno.readTextFile(projects_path))

const new_versions: Versions = {}

await Promise.all(projects.map(diff))

core.setOutput('vers', new_versions)
core.info(JSON.stringify(new_versions, null, 2))

const matrix = {
    item: Object.entries(new_versions).flatMap(([k, v]) => v.map((v) => `${k}:${v}`)),
}

core.setOutput('matrix', matrix)
if (matrix.item.length > 0) {
    core.setOutput('need_deploy', true)
}

async function diff(proj: Project) {
    const vers = await fetchModrinth<ModrinthVersion[]>(`https://api.modrinth.com/v2/project/${proj.modrinth.id}/version`)
    core.info(JSON.stringify(vers, null, 2))

    const proj_vers = versions[proj.name]
    const exists_vers = new Set(vers.map((a) => a.version_number))
    const new_vers = proj_vers.filter((a) => !exists_vers.has(a))
    new_versions[proj.name] = new_vers
}
