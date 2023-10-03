export type Versions = Record<string, string[]>

export type Project = {
    name: string
    verKey: string
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

export type ModrinthVersion = {
    name: string
    version_number: string
    changelog?: string
    dependencies?: ModrinthDependence[]
    game_versions: string[]
    version_type: 'release' | 'beta' | 'alpha'
    loaders: string[]
    featured: boolean
    status?: 'listed' | 'archived' | 'draft' | 'unlisted' | 'scheduled' | 'unknown'
    requested_status?: 'listed' | 'archived' | 'draft' | 'unlisted'
    id: string
    project_id: string
    author_id: string
    date_published: string
    downloads: number
    files: ModrinthFile[]
}

export type ModrinthDependence = {
    version_id?: string
    project_id?: string
    file_name?: string
    dependency_type: 'required' | 'optional' | 'incompatible' | 'embedded'
}

export type ModrinthFile = {
    hashes: { sha512: string; sha1: string }
    url: string
    filename: string
    primary: boolean
    size: number
    file_type?: 'required-resource-pack' | 'optional-resource-pack'
}
