import BottomNav from '@/app/ui/browse/bottom-nav';
import { Container, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from '@/app/ui/theme';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div id='root' className='webApp'>
        <Container sx={{display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center', paddingBottom: 5}}>
          <img className="logo" src="/pawparty-logo.svg" alt="Pawty Time Logo" />
          <Typography sx={{fontFamily: 'Montserrat', color: '#fff', fontWeight: 'bold'}} >FIND YOUR PERFECT MATCH</Typography>          
        </Container> 
        {children}
        <BottomNav />
      </div>
    </ThemeProvider>
  );
}
