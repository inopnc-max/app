export type AdminDecision={ok:boolean;destination:'/admin'|'/admin/mfa'|null};
export function resolveAdminLoginDecision(persona:string|null,status:string,aal:'aal1'|'aal2'|null):AdminDecision{if(persona!=='admin'||status!=='active')return {ok:false,destination:null};return {ok:true,destination:aal==='aal2'?'/admin':'/admin/mfa'};}
export function resolveMfaMode(verifiedTotp:boolean){return verifiedTotp?'challenge':'enrollment';}
