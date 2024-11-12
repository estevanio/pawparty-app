import { default as loader } from '@/app/lib/loader';


export const dynamic = 'force-dynamic'; 
 
export function GET(request: Request) {
  // Call data collectors here
  loader();
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}