import { readTextFile, removeFile, writeTextFile } from "@tauri-apps/api/fs";

export class GameFile {
    
    fileName: string
    path: string
    lines: string[]
    contents: string;

    constructor(path: string) {
        this.path = path;
        this.fileName = "Game.ini";
        this.lines = [];
        this.contents = "";
    }

    public async new() {
        await writeTextFile(this.path + "/" + this.fileName, "none");
        this.contents = await readTextFile(this.path + "/" + this.fileName);
    }

    public write(line: string) {
        this.lines.push(line + "\n")
    }

    public writeMultiple(...line: string[]) {
        for (let entry of line) {
            this.lines.push(entry + "\n")
        }
    }

    public read(): string {
        return this.contents;
    }

    public async update() {
        const update = this.lines.join("");
        await writeTextFile(this.path + "/" + this.fileName, update);
    }

    public async delete() {
        await removeFile(this.path + "/" + this.fileName);
        console.log("Deleted file from system:" + this.path + "/" + this.fileName)
    }
}


export class GameUserFile {
    
    fileName: string
    path: string
    lines: string[]
    contents: string;

    constructor(path: string) {
        this.path = path;
        this.fileName = "GameUserSettings.ini";
        this.lines = [];
    }

    public async new() {
        await writeTextFile(this.path + "/" + this.fileName, "none");
        this.contents = await readTextFile(this.path + "/" + this.fileName);
    }

    public write(line: string) {
        this.lines.push(line + "\n")
    }

    public writeMultiple(...line: string[]) {
        for (let entry of line) {
            this.lines.push(entry + "\n")
        }
    }

    public read(): string {
        return this.contents;
    }

    public async update() {
        const update = this.lines.join("");
        await writeTextFile(this.path + "/" + this.fileName, update);
    }

    public async delete() {
        await removeFile(this.path + "/" + this.fileName);
        console.log("Deleted file from system:" + this.path + "/" + this.fileName)
    }
}