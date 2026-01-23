import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
  Paper,
  TextField,
  Alert,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { supabase } from '../utils/supabase';
import { useAuth } from '../hooks/useAuth';

/**
 * PostCreatePage 컴포넌트
 * 게시물 작성 페이지 - 제목/내용 입력 후 게시물 업로드
 *
 * Example usage:
 * <PostCreatePage />
 */
function PostCreatePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!title.trim() || !content.trim()) {
      setError('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsLoading(true);
    try {
      const { error: insertError } = await supabase.from('posts').insert([
        {
          title: title.trim(),
          content: content.trim(),
          author_id: user.id,
          author_name: user.username,
        },
      ]);

      if (insertError) throw insertError;

      navigate('/posts');
    } catch (err) {
      console.error('Error creating post:', err);
      setError('게시물 작성 중 오류가 발생했습니다.');
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
            게시물 작성
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 } }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              mb: 3,
            }}
          >
            새 게시물 작성
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              margin="normal"
              required
              autoFocus
            />
            <TextField
              fullWidth
              label="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
              required
              multiline
              rows={10}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isLoading}
              sx={{ mt: 3, py: 1.5 }}
            >
              {isLoading ? '업로드 중...' : '업로드'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default PostCreatePage;
