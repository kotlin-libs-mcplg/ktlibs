import * as exec from 'npm:@actions/exec@1.1'
import { project } from './get_project_and_version.ts'

await exec.exec('./gradlew', [`:${project}:build`])
