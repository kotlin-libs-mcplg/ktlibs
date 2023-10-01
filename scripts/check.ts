import * as core from 'npm:@actions/core@1.10'

try {
    await import('./check_impl.ts')
} catch (e) {
    core.setFailed(e)
    throw e
}
