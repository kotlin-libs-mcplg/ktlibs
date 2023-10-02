import * as core from 'npm:@actions/core@1.10'

try {
    await import(Deno.args[0])
} catch (e) {
    core.setFailed(e)
    throw e
}
