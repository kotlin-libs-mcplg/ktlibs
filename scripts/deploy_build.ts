import * as exec from 'npm:@actions/exec@1.1'

const project_and_version = Deno.env.get('PROJECT_AND_VERSION')!

const split_at = project_and_version.indexOf('')
const project = project_and_version.substring(0, split_at)

await exec.exec('./gradlew', [`:${project}:build`])
