import * as core from 'npm:@actions/core@1.10'
import * as exec from 'npm:@actions/exec@1.1'
import * as path from 'https://deno.land/std@0.203.0/path/mod.ts'
import { project, version } from './get_project_and_version.ts'
// import { Meta } from './types.ts'

// const meta_path = './meta.json'
// const meta: Meta = JSON.parse(await Deno.readTextFile(meta_path))

await exec.exec('./gradlew', [`:${project}:build`])

const artifact_name = `${project}_${version}`
const root_path = path.resolve(`./${project}/build/libs`)
// const file = `${root_path}/${meta.build_output_prefix}${project}-${version}.jar`

core.setOutput('artifact_name', artifact_name)
core.setOutput('artifact_path', root_path)
