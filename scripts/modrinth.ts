import { fetchJson } from './net.ts'

export const modrinth_token = Deno.env.get('MODRINTH_TOKEN')!
export const github_repository = Deno.env.get('GITHUB_REPOSITORY')!

export async function fetchModrinth<T>(url: URL | Request | string, init?: RequestInit): Promise<T> {
    return await fetchJson<T>(url, {
        ...init,
        headers: {
            ...init?.headers,
            Authorization: modrinth_token,
            'User-Agent': github_repository,
        },
    })
}
