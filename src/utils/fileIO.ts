'use strict';

import { appendFileSync, existsSync, writeFileSync, readFileSync } from 'fs';
import { Config }  from '../utils/config';

export class FileIO {
    protected fileName: string;
    public fullPath: string;
    private databasePath: string = Config.databasePath;

    constructor(fileName: string) {
        this.fileName = fileName;
        this.fullPath = this.databasePath.concat(this.fileName);
    }

    public getFullPath() {
        this.fullPath = this.databasePath.concat(this.fileName);
    }
    public writeData(data) : any {
        let __writeFile: boolean = false;
        if (this.checkFile())
        {
            writeFileSync(this.fullPath, JSON.stringify(data), 'utf-8');
            return __writeFile = true;        
        } 
        return __writeFile;
    }

    public getData(): any {
         if (this.checkFile()) {
            return this.getDataWithRead();
         } else {
             this.createJSONFile() 
             return this.getDataWithRead(); 
         }
    }

    public  checkFile() : boolean{
        return existsSync(this.fullPath) ? true : false;
    }

    public createJSONFile() {
        appendFileSync(this.fullPath, '[ ]');
    }

    private getDataWithRead() : any {
        const __data = readFileSync(this.fullPath); 
        return JSON.parse(__data.toString());
    }
}