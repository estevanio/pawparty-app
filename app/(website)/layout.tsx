import { Topbar } from "@/app/ui/website";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
      <Topbar/>
        <div id="root"></div>
        <div className='container'>{children}</div>
        
      </>
    );
  }
  