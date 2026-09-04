import type {ButtonHTMLAttributes} from 'react';
type Props=ButtonHTMLAttributes<HTMLButtonElement>&{variant?:'primary'|'secondary'|'ghost'|'danger';size?:'medium'|'large';fullWidth?:boolean;loading?:boolean};
export function AppButton({children,variant='primary',size='medium',fullWidth,loading,disabled,className='',...props}:Props){return <button {...props} className={`app-button app-button--${variant} app-button--${size}${fullWidth?' app-button--full':''} ${className}`} disabled={disabled||loading} aria-busy={loading||undefined}>{loading?'처리 중...':children}</button>}
