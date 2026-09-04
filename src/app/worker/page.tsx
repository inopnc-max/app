import {requirePermission} from '@/core/auth/guards';
export default async function WorkerPage(){await requirePermission('WORKER_HOME_VIEW');return <main><h1>작업자</h1></main>}
