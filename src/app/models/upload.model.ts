export class Upload {
    $key?: string;
    file: File;
    url: string;
    name: string;
    progress: number;
    createdOn: Date = new Date();

    constructor(file: File) {
        this.file = file;
    }
}