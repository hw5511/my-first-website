import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from '../utils/supabase';

/**
 * SignupPage 컴포넌트
 * 회원가입 페이지 - 아이디/비밀번호 입력 후 회원가입
 *
 * Example usage:
 * <SignupPage />
 */
function SignupPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .single();

      if (existingUser) {
        setError('이미 사용 중인 아이디입니다.');
        setIsLoading(false);
        return;
      }

      const { error: insertError } = await supabase
        .from('users')
        .insert([{ username, password }]);

      if (insertError) {
        setError('회원가입 중 오류가 발생했습니다.');
        setIsLoading(false);
        return;
      }

      alert('회원가입이 완료되었습니다. 로그인해주세요.');
      navigate('/');
    } catch (err) {
      setError('회원가입 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div">
            회원가입
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          py: { xs: 4, md: 8 },
        }}
      >
        <Container maxWidth="sm">
          <Paper
            elevation={3}
            sx={{
              p: { xs: 3, md: 5 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h2"
              component="h1"
              sx={{
                mb: 3,
                fontSize: { xs: '1.5rem', md: '2rem' },
              }}
            >
              회원가입
            </Typography>

            {error && (
              <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                {error}
              </Alert>
            )}

            <Box
              component="form"
              onSubmit={handleSignup}
              sx={{ width: '100%' }}
            >
              <TextField
                fullWidth
                label="아이디"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                required
                autoFocus
              />
              <TextField
                fullWidth
                label="비밀번호"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={isLoading}
                sx={{ mt: 3, py: 1.5 }}
              >
                {isLoading ? '가입 중...' : '회원가입 하기'}
              </Button>
            </Box>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default SignupPage;
