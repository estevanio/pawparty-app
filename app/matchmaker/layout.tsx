import BottomNav from '@/app/ui/browse/bottom-nav';
import { Container, Typography } from '@mui/material';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div id="root"></div>
        <Container className="webApp" sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', paddingBottom: 5}}>
          <img className="logo" src="/pawparty-logo.svg" alt="Pawty Time Logo" />
          <Typography sx={{fontFamily: 'Montserrat', color: '#fff', fontWeight: 'bold'}} >FIND YOUR PERFECT MATCH</Typography>
          {children}
        </Container>        
      <BottomNav />
    </>
  );
}
