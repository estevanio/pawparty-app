import { default as Topbar } from "@/app/ui/website/Navigation/Topbar/Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
      <>
      <Topbar/>
        <div id="root"></div>
        <div className='container'>{children}</div>
        
      </>
    );
  }
  