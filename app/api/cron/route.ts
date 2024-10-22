import { default as crawler } from '@/app/lib/crawler';


export const dynamic = 'force-dynamic'; 
 
export function GET(request: Request) {
  // Call data collectors here
  crawler();
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}