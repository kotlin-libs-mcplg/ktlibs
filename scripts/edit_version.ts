export async function editVersion(verKey: string, ver: string) {
    let properties = await Deno.readTextFile('./gradle.properties')
    properties = properties.split('\n').map((line) => {
        if (line.startsWith(`${verKey}=`)) return `${verKey}=${ver}`
        else return line
    }).join('\n')
    await Deno.writeTextFile('./gradle.properties', properties)
}
