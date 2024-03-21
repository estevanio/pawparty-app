import BottomNav from '@/app/ui/browse/bottom-nav';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div id="root"></div>
      <div className="container">{children}</div>
      <BottomNav />
    </>
  );
}
