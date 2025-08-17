import { default as loader } from '@/app/lib/loader';
import { default as remover } from '@/app/lib/remover';


export const dynamic = 'force-dynamic'; 
 
export function GET(request: Request) {
  // Call data collectors here
  loader();
  remover();
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}