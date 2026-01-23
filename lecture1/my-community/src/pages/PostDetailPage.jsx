import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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
  Divider,
  List,
  ListItem,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { supabase } from '../utils/supabase';
import { useAuth } from '../hooks/useAuth';

/**
 * PostDetailPage 컴포넌트
 * 게시물 상세 페이지 - 게시물 내용, 좋아요, 댓글 표시
 *
 * Example usage:
 * <PostDetailPage />
 */
function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchComments();
    checkLikeStatus();
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (err) {
      console.error('Error fetching post:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setComments(data || []);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const checkLikeStatus = async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('likes')
        .select('id')
        .eq('post_id', id)
        .eq('user_id', user.id)
        .single();

      setIsLiked(!!data);
    } catch (err) {
      setIsLiked(false);
    }
  };

  const handleLike = async () => {
    if (!user) return;

    try {
      if (isLiked) {
        await supabase
          .from('likes')
          .delete()
          .eq('post_id', id)
          .eq('user_id', user.id);

        await supabase
          .from('posts')
          .update({ likes_count: (post.likes_count || 1) - 1 })
          .eq('id', id);

        setPost((prev) => ({
          ...prev,
          likes_count: (prev.likes_count || 1) - 1,
        }));
        setIsLiked(false);
      } else {
        await supabase
          .from('likes')
          .insert([{ post_id: id, user_id: user.id }]);

        await supabase
          .from('posts')
          .update({ likes_count: (post.likes_count || 0) + 1 })
          .eq('id', id);

        setPost((prev) => ({
          ...prev,
          likes_count: (prev.likes_count || 0) + 1,
        }));
        setIsLiked(true);
      }
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    setIsSubmitting(true);
    try {
      const { error } = await supabase.from('comments').insert([
        {
          content: newComment,
          post_id: id,
          author_id: user.id,
          author_name: user.username,
        },
      ]);

      if (error) throw error;

      await supabase
        .from('posts')
        .update({ comments_count: (post.comments_count || 0) + 1 })
        .eq('id', id);

      setPost((prev) => ({
        ...prev,
        comments_count: (prev.comments_count || 0) + 1,
      }));

      setNewComment('');
      fetchComments();
    } catch (err) {
      console.error('Error adding comment:', err);
    } finally {
      setIsSubmitting(false);
    }
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

  if (isLoading) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>로딩 중...</Typography>
      </Box>
    );
  }

  if (!post) {
    return (
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography>게시물을 찾을 수 없습니다.</Typography>
      </Box>
    );
  }

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
            게시물 상세
          </Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 }, mb: 3 }}>
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '1.5rem', md: '2rem' },
              fontWeight: 700,
              mb: 2,
            }}
          >
            {post.title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mb: 3,
              color: 'text.secondary',
            }}
          >
            <Typography variant="body2">{post.author_name}</Typography>
            <Typography variant="body2">
              {formatDate(post.created_at)}
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          <Typography
            variant="body1"
            sx={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              mb: 3,
            }}
          >
            {post.content}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Button
              variant={isLiked ? 'contained' : 'outlined'}
              startIcon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              onClick={handleLike}
              color="error"
            >
              좋아요 {post.likes_count || 0}
            </Button>
          </Box>
        </Paper>

        <Paper elevation={2} sx={{ p: { xs: 2, md: 4 } }}>
          <Typography variant="h3" sx={{ fontSize: '1.25rem', mb: 2 }}>
            댓글 {comments.length}개
          </Typography>

          <Box
            component="form"
            onSubmit={handleCommentSubmit}
            sx={{ display: 'flex', gap: 1, mb: 3 }}
          >
            <TextField
              fullWidth
              placeholder="댓글을 입력하세요"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              size="small"
            />
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting || !newComment.trim()}
            >
              등록
            </Button>
          </Box>

          {comments.length === 0 ? (
            <Typography color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
              댓글이 없습니다. 첫 번째 댓글을 작성해보세요!
            </Typography>
          ) : (
            <List disablePadding>
              {comments.map((comment, index) => (
                <ListItem
                  key={comment.id}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    py: 2,
                    px: 0,
                    borderBottom:
                      index < comments.length - 1
                        ? '1px solid'
                        : 'none',
                    borderColor: 'divider',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 1,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {comment.author_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(comment.created_at)}
                    </Typography>
                  </Box>
                  <Typography variant="body2">{comment.content}</Typography>
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default PostDetailPage;
