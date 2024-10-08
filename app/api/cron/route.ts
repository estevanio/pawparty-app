export const dynamic = 'force-dynamic'; 
 
export function GET(request: Request) {
  // Call data collectors here
  return new Response(`Hello from ${process.env.VERCEL_REGION}`);
}