import type { Meta, Project, Versions } from './types.ts'

export const meta_path = './meta.json'
export const versions_path = './versions.json'
export const projects_path = './projects.json'
export const loaders_path = './loaders.json'

export async function getMeta(): Promise<Meta> {
    return JSON.parse(await Deno.readTextFile(meta_path))
}
export async function getVersions(): Promise<Versions> {
    return JSON.parse(await Deno.readTextFile(versions_path))
}
export async function getProjects(): Promise<Project[]> {
    return JSON.parse(await Deno.readTextFile(projects_path))
}
export async function getLoaders(): Promise<string[]> {
    return JSON.parse(await Deno.readTextFile(loaders_path))
}
