import * as core from 'npm:@actions/core@1.10'
import * as exec from 'npm:@actions/exec@1.1'
import * as path from 'https://deno.land/std@0.203.0/path/mod.ts'
import { project, version } from './get_project_and_version.ts'
import type { Meta } from './types.ts'
import { getMeta } from './meta.ts'

const meta: Meta = await getMeta()

await exec.exec('./gradlew', [`:${project}:build`])

const artifact_name = `${project}_${version}`
const root_path = path.resolve(`./${project}/build/libs`)
const jar_name = `${meta.build_output_prefix}${project}-${version}.jar`

core.setOutput('artifact_name', artifact_name)
core.setOutput('artifact_path', root_path)
core.setOutput('jar_name', jar_name)
