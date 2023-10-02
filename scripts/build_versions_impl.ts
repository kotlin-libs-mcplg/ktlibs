const github_actions = !!Deno.env.get('GITHUB_ACTION')
const github_token = Deno.env.get('GITHUB_TOKEN')!
const github_repository = Deno.env.get('GITHUB_REPOSITORY')!
const github_repository_owner = Deno.env.get('GITHUB_REPOSITORY_OWNER')!
const modrinth_token = !!Deno.env.get('MODRINTH_TOKEN')
