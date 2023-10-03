const project_and_version = Deno.env.get('PROJECT_AND_VERSION')!

const split_at = project_and_version.indexOf(':')
export const project = project_and_version.substring(0, split_at)
export const version = project_and_version.substring(split_at + 1)
