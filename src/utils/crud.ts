'use strict';

import { FileIO } from '../utils/fileIO';
import { basename } from 'path';
const _ = require('lodash');

export class Crud extends FileIO {

    //constructor 
    constructor(fileName: string)
    {
        super(fileName);
    }

    //GetAll 
    public getAll() : any[] {
        return this.getData();
    }
    
    //GetRelationData
    public getByRelationalValue(params: object) : any[] {
        const __objectKeys = Object.keys(params);
        let __result: any[] ;
        let __requestParams: object;
        if (__objectKeys != undefined && typeof(params) === 'object')
        {
            const __targetSchema: string[] = __objectKeys['target'];
            const __id: string = __objectKeys['id'];
            const __params = {'id': __id};
            //first data comes on calling api 
            __result = this.getByValue(__params);
            //relation data 
            __targetSchema.forEach((e) => {
                this.fileName = e.concat('.json');
                this.getFullPath();
                __result[e] = this.getBySearch(__params);
            });
        };
        return __result;
    }

    //GetByValue
    public getByValue(params: object): any {
        return _.filter(this.getData(),params);
        /*try {
            if (typeof(params) === "object"){
                if (Object.keys(params).length > 0)
                {
                    return _.filter(this.getData(), params);
                } else{
                    return {'message': 'object is blank'};
                } 
            } else {
                return {'message': 'object is not valid'};
            }
        }
        catch(err)
        {
            return 'err';
            console.log(err);
        }
       */
    }

    //Search Through Object
    public getBySearch(params: any) : any {
        if (params === undefined)
        {
            return {'error': 'param isnot object'};
        } else {
            return this.getByValue(JSON.parse(params));
        }
    }

    //POST
    public post(params: any) : any {
        const data = this.getAll();
        data.push(params);
        return this.writeData(data);
    }

    //PUT
    public put(params: any, id: string) : any {
        if (id != undefined) {
           const data = this.getAll();
           _.findIndex(data, (r, i) => {
              if (r.id === id) {
                  data[i] = params;
                  return this.writeData(data);
              }
           });
        } else {
            return {'message': 'Id is undefined'};
        } 

    }

    //DELETE
    public delete(id: string) :any {
        if (id != undefined) {
            const data = this.getAll();
            _.findIndex(data, (r, i) => {
               if (r.id === id) {
                   data.splice(i, 1);
                   return this.writeData(data);
               }
            });
         } else {
             return {'message': 'Id is undefined'};
         }
    }
}