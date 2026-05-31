import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { AuthProvider, type AuthProviderProps } from 'react-oidc-context';

const oidcConfig: AuthProviderProps = {
  authority: import.meta.env.VITE_KEYCLOAK_AUTHORITY,
  client_id: import.meta.env.VITE_KEYCLOAK_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_APP_URL,
  response_type: 'code',
  scope: 'openid profile email offline_access', // Thêm offline_access để xin Refresh Token dài hạn, nếu không thêm thì vẫn có Refresh Token thôi nhưng nó chỉ có thời hạn trong 1 session do Admin quy định, ví dụ 30p
  automaticSilentRenew: true, // Bật tính năng tự động gia hạn Token ngầm

  // Hàm này giúp làm sạch URL trình duyệt sau khi đăng nhập xong
  onSigninCallback: () => {
    window.history.replaceState({}, document.title, window.location.pathname);
  },
};

createRoot(document.getElementById('root')!).render(
  <AuthProvider {...oidcConfig}>
    <App />
  </AuthProvider>
);
