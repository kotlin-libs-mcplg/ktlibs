import { project, version } from './get_project_and_version.ts'
import { getLoaders, getProjects } from './meta.ts'
import { fetchModrinth } from './modrinth.ts'
import { buildFormData } from './net.ts'
import os from 'node:os'
import type { ModrinthGameVersion, ModrinthVersion } from './types.ts'

const artifact_name = Deno.env.get('ARTIFACT_NAME')!
const jar_name = Deno.env.get('JAR_NAME')!

const loaders = await getLoaders()
const projects = await getProjects()
const proj = projects.find((a) => a.name == project)!

const raw_game_versions = await fetchModrinth<ModrinthGameVersion[]>('https://api.modrinth.com/v2/tag/game_version')

const game_versions = raw_game_versions.filter((a) => a.major && a.version_type == 'release')

const create_version_data = buildFormData({
    data: {
        name: `${proj.verName} ${version}`,
        version_number: version,
        dependencies: [],
        game_versions: game_versions.map((a) => a.version),
        version_type: 'release',
        loaders,
        featured: false,
        status: 'listed',
        requested_status: 'listed',
        project_id: proj.modrinth.id,
        file_parts: [jar_name],
        primary_file: jar_name,
    },
})
const file = await Deno.readFile(`${os.homedir()}/artifact/${artifact_name}/${jar_name}`)
create_version_data.set(jar_name, new Blob([file]), jar_name)

await fetchModrinth<ModrinthVersion>('https://api.modrinth.com/v2/version', {
    method: 'POST',
    body: create_version_data,
})
