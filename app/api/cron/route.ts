import { default as loader } from '@/app/lib/loader';


export const dynamic = 'force-dynamic'; 
 
export async function GET(request: Request) {
  // Call data collectors here
  await loader();
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}