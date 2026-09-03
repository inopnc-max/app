import type {ButtonHTMLAttributes} from 'react';
export function AppButton({children,...props}:ButtonHTMLAttributes<HTMLButtonElement>){return <button {...props} style={{background:'var(--role-primary)',color:'var(--role-on-primary)',border:0,borderRadius:6,padding:'0 18px',fontWeight:600}}>{children}</button>}
