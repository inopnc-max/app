import {z} from 'zod';
export const partnerAccessRequestSchema=z.object({name:z.string().trim().min(1).max(100),company:z.string().trim().min(1).max(200),job_title:z.string().trim().min(1).max(100),contact:z.string().trim().max(200).optional().or(z.literal(''))});
export const rejectionSchema=z.string().trim().min(1).max(500);
