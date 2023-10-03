import * as core from 'npm:@actions/core@1.10'
import { Project } from './types.ts'
import { editVersions } from './edit_versions.ts'
import { project, version } from './get_project_and_version.ts'

core.info(`project: ${project}; ${version}: version`)

const projects_path = './projects.json'

const projects: Project[] = JSON.parse(await Deno.readTextFile(projects_path))

const proj = projects.find((a) => a.name == project)!
await editVersions(new Map([[proj.verKey, version]]))
