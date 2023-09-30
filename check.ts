if (!import.meta.main) throw 'Unexpected execution'
if (Deno.args.length < 2) throw 'No token pass'

type Versions = Record<string, string>
const versions_path = './versions.json'

const versions: Versions = JSON.parse(await Deno.readTextFile(versions_path))

console.log(versions)

// todo

await Deno.writeTextFile(versions_path, JSON.stringify(versions, null, 2))
await Deno.writeTextFile(versions_path, '\n', {append: true})
