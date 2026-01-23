import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import PostListPage from './pages/PostListPage';
import PostDetailPage from './pages/PostDetailPage';
import PostCreatePage from './pages/PostCreatePage';

/**
 * ProtectedRoute 컴포넌트
 * 인증된 사용자만 접근 가능한 라우트
 *
 * Props:
 * @param {ReactNode} children - 자식 컴포넌트 [Required]
 *
 * Example usage:
 * <ProtectedRoute><PostListPage /></ProtectedRoute>
 */
function ProtectedRoute({ children }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

/**
 * AppRoutes 컴포넌트
 * 앱 라우팅 설정
 *
 * Example usage:
 * <AppRoutes />
 */
function AppRoutes() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null;
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/posts" replace /> : <LoginPage />}
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/posts"
        element={
          <ProtectedRoute>
            <PostListPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/create"
        element={
          <ProtectedRoute>
            <PostCreatePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts/:id"
        element={
          <ProtectedRoute>
            <PostDetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

/**
 * App 컴포넌트
 * 메인 앱 컴포넌트 - AuthProvider로 전체 앱 감싸기
 *
 * Example usage:
 * <App />
 */
function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
