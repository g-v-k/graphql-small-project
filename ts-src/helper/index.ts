export const stringToBase64 = (data:string):string=>{
    return Buffer.from(data).toString('base64');
}
export const base64ToString = (data:string):string=>{
    return Buffer.from(data,'base64').toString('ascii');
}