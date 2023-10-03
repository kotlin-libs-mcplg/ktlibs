import * as core from 'npm:@actions/core@1.10'
import { Project } from './types.ts'
import { editVersions } from './edit_versions.ts'

const project_and_version = Deno.env.get('PROJECT_AND_VERSION')!

const split_at = project_and_version.indexOf('')
const project = project_and_version.substring(0, split_at)
const version = project_and_version.substring(split_at + 1)

core.info(`project: ${project}; ${version}: version`)

const projects_path = './projects.json'

const projects: Project[] = JSON.parse(await Deno.readTextFile(projects_path))

const proj = projects.find((a) => a.name == project)!
await editVersions(new Map([[proj.verKey, version]]))
