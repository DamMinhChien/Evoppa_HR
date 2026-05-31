import './App.css';
import { useAuth } from 'react-oidc-context';

const App = () => {
  const auth = useAuth();
  // Trạng thái 1: Đang trong quá trình redirect hoặc load token
  if (auth.isLoading) {
    return <div>Đang kết nối hệ thống SSO...</div>;
  }
  // Trạng thái 2: Có lỗi (sai URL, sai ClientID...)
  if (auth.error) {
    return <div>Đã xảy ra lỗi SSO: {auth.error.message}</div>;
  }

  // Trạng thái 3: ĐÃ ĐĂNG NHẬP
  if (auth.isAuthenticated) {
    return (
      <div style={{ padding: '20px', border: '1px solid #4CAF50', borderRadius: '8px' }}>
        <h1 style={{ color: '#4CAF50' }}>[ỨNG DỤNG NHÂN SỰ]</h1>

        {/* Lấy thông tin user từ Token Payload */}
        <h2>Xin chào: {auth.user?.profile.preferred_username || 'Ẩn danh'}</h2>
        <p>Email: {auth.user?.profile.email}</p>

        {/* Các nút Đăng xuất */}
        <button
          onClick={() => void auth.signoutRedirect()}
          style={{ background: '#f44336', color: 'white', marginRight: '10px' }}
        >
          Đăng xuất (Keycloak)
        </button>
        <pre
          style={{
            background: '#eee',
            padding: '10px',
            overflowX: 'auto',
            textAlign: 'left',
            fontSize: '12px',
          }}
        >
          {auth.user?.access_token}
        </pre>
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Chào mừng đến Hệ thống Nhân sự</h1>
      <p>Bạn cần đăng nhập bằng tài khoản nội bộ (Keycloak) để tiếp tục.</p>
      <button
        onClick={() => void auth.signinRedirect()}
        style={{
          padding: '10px 20px',
          fontSize: '18px',
          background: '#2196F3',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Đăng nhập SSO
      </button>
    </div>
  );
};

export default App;
