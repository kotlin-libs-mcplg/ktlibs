export type Meta = {
    build_output_prefix: string
}

export type Versions = Record<string, string[]>

export type Project = {
    name: string
    verKey: string
    verName: string
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

export type ModrinthProject = {
    slug: string
    title: string
    description: string
    categories: string[]
    client_side: 'required' | 'optional' | 'unsupported'
    server_side: 'required' | 'optional' | 'unsupported'
    body: string
    status: 'approved' | 'archived' | 'rejected' | 'draft' | 'unlisted' | 'processing' | 'withheld' | 'scheduled' | 'private' | 'unknown'
    requested_status?: 'approved' | 'archived' | 'unlisted' | 'private' | 'draft'
    additional_categories?: string[]
    issues_url?: string
    source_url?: string
    wiki_url?: string
    discord_url?: string
    donation_urls?: {
        id?: string
        platform?: string
        url?: string
    }[]
    project_type: 'mod' | 'modpack' | 'resourcepack' | 'shader'
    downloads: number
    icon_url?: string
    color?: number
    thread_id: string
    monetization_status: 'monetized' | 'demonetized' | 'force-demonetized'
    id: string
    team: string
    published?: string
    updated?: string
    approved?: string
    queued?: string
    followers: number
    license?: {
        id?: string
        name?: string
        url?: string
    }
    versions?: string[]
    game_versions?: string[]
    loaders?: string[]
    gallery?: {
        url: string
        featured: boolean
        title?: string
        description?: string
        created: string
        ordering: number
    }[]
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

export type ModrinthGameVersion = {
    version: string
    version_type: 'release' | 'snapshot' | 'alpha' | 'beta'
    date: string
    major: boolean
}
