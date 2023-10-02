$env:INPUT_GITHUB_ACTIONS = 'false'
deno task $args[0]
