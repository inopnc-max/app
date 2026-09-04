import type {SiteAccess} from './types';
export type PartnerGrant={siteId:string;code:string;name:string;accessLevel:'view'|'collaborate';active:boolean;partnerOrg:boolean};
export function resolvePartnerSiteAccess(grants:PartnerGrant[]):SiteAccess[]{const map=new Map<string,SiteAccess>();for(const g of grants){if(!g.active||!g.partnerOrg)continue;const prev=map.get(g.siteId);if(!prev||prev.accessLevel==='view'&&g.accessLevel==='collaborate')map.set(g.siteId,{siteId:g.siteId,code:g.code,name:g.name,accessLevel:g.accessLevel});}return [...map.values()];}
