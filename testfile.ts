'use strict';

export class TestFiles {
    public tFile: string = "ram";
    constructor() {
        
    }

    public getFullPath(): any {
        if (this.tFile === "ram") {
            return true;
        }
        return false;
    }
    public writeData() : any {
       return this.getFullPath();   
    }
}