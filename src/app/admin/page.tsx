import {requireAdminAal2} from '@/core/auth/guards';
export default async function AdminPage(){await requireAdminAal2();return <main><h1>관리자</h1></main>}
