import {promises as fs} from 'fs';

var config:any;

const configFilePath = './config.json';

export async function initConfig(): Promise<any>{
    config = JSON.parse(((await fs.readFile(configFilePath)).toString()));
    return config;
}

export function getConfig(): Promise<any>{
    return config;
}

export function setConfig(path: string, val: string): void{
    const splitPath = path.split('.').reverse();
    var ref = config;
    while (splitPath.length > 1){
        let key = splitPath.pop();
        if(key){
            if(!ref[key]){
                ref[key] = {};
            }
            ref = ref[key]
        }else{
            return;
        }
    }
    let key = splitPath.pop();
    if(key){
        ref[key] = val;
    }
}

export async function updateConfig(){
    return fs.writeFile(configFilePath, JSON.stringify(config, null, 2));
}