import * as fs from 'fs';
import * as util from 'util'; 
import * as coco from '../artifacts/contracts/CoCo.sol/CoCo.json';
import * as vault from '../artifacts/contracts/Vault.sol/Vault.json';

var config:any;

const configFilePath = './config.json';
const outputAbiPath = './scripts/contract.ts';


export async function initConfig(): Promise<any>{
    config = JSON.parse(((await fs.readFileSync(configFilePath)).toString()));
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
    fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
    const write = `const VAULT_CONTRACT = ${util.inspect(vault.abi, false, 4, false)} as const;

const COCO_CONTRACT = ${util.inspect(coco.abi, false, 4, false)} as const;

export {VAULT_CONTRACT, COCO_CONTRACT}
    `;
    fs.writeFileSync(outputAbiPath, write,);
}