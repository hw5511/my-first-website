import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Paper,
  List,
  ListItemButton,
  Pagination,
  Chip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { supabase } from '../utils/supabase';
import { useAuth } from '../hooks/useAuth';

/**
 * PostListPage 컴포넌트
 * 게시물 목록 페이지 - 게시물 리스트 표시 및 페이지네이션
 *
 * Example usage:
 * <PostListPage />
 */
function PostListPage() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const postsPerPage = 10;

  useEffect(() => {
    fetchPosts();
  }, [page]);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const { count } = await supabase
        .from('posts')
        .select('*', { count: 'exact', head: true });

      setTotalPages(Math.ceil((count || 0) / postsPerPage));

      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .range((page - 1) * postsPerPage, page * postsPerPage - 1);

      if (error) throw error;
      setPosts(data || []);
    } catch (err) {
      console.error('Error fetching posts:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh' }}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: 700 }}>
            hell스터디
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {user?.username}님 환영합니다
            </Typography>
            <Button
              variant="outlined"
              size="small"
              onClick={handleLogout}
            >
              로그아웃
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }}
          >
            게시물 목록
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/posts/create')}
          >
            글쓰기
          </Button>
        </Box>

        {isLoading ? (
          <Typography sx={{ textAlign: 'center', py: 4 }}>
            로딩 중...
          </Typography>
        ) : posts.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography color="text.secondary">
              게시물이 없습니다. 첫 번째 게시물을 작성해보세요!
            </Typography>
          </Paper>
        ) : (
          <Paper elevation={2}>
            <List disablePadding>
              {posts.map((post, index) => (
                <ListItemButton
                  key={post.id}
                  onClick={() => navigate(`/posts/${post.id}`)}
                  divider={index < posts.length - 1}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    py: 2,
                    px: { xs: 2, md: 3 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1rem', md: '1.125rem' },
                      fontWeight: 600,
                      mb: 0.5,
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {post.content}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      width: '100%',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Typography variant="caption" color="text.secondary">
                      {post.author_name}
                    </Typography>
                    <Chip
                      icon={<FavoriteIcon sx={{ fontSize: 14 }} />}
                      label={post.likes_count || 0}
                      size="small"
                      variant="outlined"
                      sx={{ height: 24 }}
                    />
                    <Chip
                      icon={<ChatBubbleOutlineIcon sx={{ fontSize: 14 }} />}
                      label={post.comments_count || 0}
                      size="small"
                      variant="outlined"
                      sx={{ height: 24 }}
                    />
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ ml: 'auto' }}
                    >
                      {formatDate(post.created_at)}
                    </Typography>
                  </Box>
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}

        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default PostListPage;
