const ver_key_reg = /^(?<ver_key>[^=\s]+)=/iu

export async function editVersions(vers: Map<string, string>) {
    let properties = await Deno.readTextFile('./gradle.properties')
    properties = properties.split('\n').map((line) => {
        const rg = ver_key_reg.exec(line)
        if (rg == null) return line
        const ver = vers.get(rg.groups!.ver_key)
        if (!ver) return line
        else return `${rg.groups!.ver_key}=${ver}`
    }).join('\n')
    await Deno.writeTextFile('./gradle.properties', properties)
}
