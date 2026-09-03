import {describe, expect, it} from 'vitest';
import {isPersona, personas} from './persona';
describe('persona tokens',()=>{it('contains the five locked personas',()=>expect(personas).toEqual(['admin','site_manager','worker','production_manager','partner']));it('rejects unknown roles',()=>expect(isPersona('approver')).toBe(false));});
