export async function readonlyBlobFromFsFile(name: string, path: string, type = ''): Promise<Blob> {
    const file = await Deno.open(path)
    const info = await file.stat()
    return new FsFileBlob(name, path, file, info, type)
}

class FsFileBlob implements File {
    constructor(public name: string, public path: string, public file: Deno.FsFile, public info: Deno.FileInfo, public type: string) {}
    get lastModified(): number {
        return this.info.mtime?.getMilliseconds() ?? 0
    }
    get size(): number {
        return this.info.size
    }
    async arrayBuffer(): Promise<ArrayBuffer> {
        const data = await Deno.readFile(this.path)
        return data.buffer
    }
    slice(start?: number | undefined, end?: number | undefined, contentType?: string | undefined): Blob {
        return new Blob([this]).slice(start, end, contentType)
    }
    stream(): ReadableStream<Uint8Array> {
        return this.file.readable
    }
    text(): Promise<string> {
        return Deno.readTextFile(this.path)
    }
}
