import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import ButtonSection from './components/sections/button-section';
import InputSection from './components/sections/input-section';
import NavigationSection from './components/sections/navigation-section';
import CardSection from './components/sections/card-section';
import RadioSection from './components/sections/radio-section';

/**
 * App 컴포넌트
 * 16개 UI 요소를 섹션 단위로 추가할 수 있는 기본 레이아웃
 */
function App() {
  return (
    <Box sx={{
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      py: { xs: 2, md: 4 }
    }}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          sx={{
            textAlign: 'center',
            mb: 4,
            fontWeight: 600,
            fontSize: { xs: '1.5rem', md: '2rem' }
          }}
        >
          UI Components Test
        </Typography>

        {/* 섹션들이 여기에 순차적으로 추가됩니다 */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <ButtonSection />
          <InputSection />
          <NavigationSection />
          <CardSection />
          <RadioSection />
        </Box>
      </Container>
    </Box>
  );
}

export default App;
