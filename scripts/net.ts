import * as core from 'npm:@actions/core@1.10'
import { XMLParser } from 'npm:fast-xml-parser@4.3'

let fetch_count = 0

export async function fetchGet(url: URL | string) {
    const fetch_id = fetch_count++
    core.info(`fetch ${fetch_id} GET -> ${url}`)
    const res = await fetch(url)
    if (res.ok) {
        core.info(`fetch ${fetch_id} GET <- ${res.status} ${res.statusText} ${res.type}`)
    } else {
        core.error(`fetch ${fetch_id} GET <- ${res.status} ${res.statusText} ${res.type}`)
    }
    return res
}

export async function fetchXml<T>(url: URL | string): Promise<T> {
    const res = await fetchGet(url)
    const text = await res.text()
    const parser = new XMLParser()
    return parser.parse(text)
}
