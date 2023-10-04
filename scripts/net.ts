import * as core from 'npm:@actions/core@1.10'
import { XMLParser } from 'npm:fast-xml-parser@4.3'

let fetch_count = 0

export async function doFetch(url: URL | Request | string, init?: RequestInit) {
    const fetch_id = fetch_count++
    const method = init?.method?.toUpperCase() ?? 'GET'
    core.info(`fetch ${fetch_id} ${method} -> ${url}`)
    const res = await fetch(url, init)
    if (res.ok) {
        core.info(`fetch ${fetch_id} ${method} <- ${res.status} ${res.statusText} ${res.type}`)
    } else {
        core.error(`fetch ${fetch_id} ${method} <- ${res.status} ${res.statusText} ${res.type}`)
        const err = await res.text()
        try {
            throw JSON.parse(err)
        } catch {
            throw err
        }
    }
    return res
}

export async function fetchXml<T>(url: URL | Request | string, init?: RequestInit): Promise<T> {
    const res = await doFetch(url, init)
    const text = await res.text()
    const parser = new XMLParser()
    return parser.parse(text)
}

export async function fetchJson<T>(url: URL | Request | string, init?: RequestInit): Promise<T> {
    const res = await doFetch(url, init)
    const text = await res.text()
    return JSON.parse(text)
}

export function buildFormData<T extends object>(obj: T): FormData {
    const data = new FormData()
    for (const [k, v] of Object.entries(obj)) {
        data.set(k, JSON.stringify(v))
    }
    return data
}
