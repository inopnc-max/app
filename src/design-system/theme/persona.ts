export const personas = ['admin','site_manager','worker','production_manager','partner'] as const;
export type Persona = typeof personas[number];
export function isPersona(value: string): value is Persona { return (personas as readonly string[]).includes(value); }
