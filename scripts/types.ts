export type Versions = Record<string, string[]>

export type Project = {
    name: string
    maven: string
    minVer: string
    modrinth: {
        id: string
    }
}

export type MavenMetadata = {
    metadata: {
        groupId: string
        artifactId: string
        versioning: {
            latest: string
            release: string
            versions: {
                version: string[]
            }
        }
        lastUpdated: number
    }
}
