import { useAuth } from 'react-oidc-context';

// ICON: Nút Loading
const LoadingIcon = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);
function App() {
  const auth = useAuth();
  // Giao diện khi đang tải (Loading)
  if (auth.isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <LoadingIcon />
          <p className="text-slate-300 font-medium tracking-wide animate-pulse">
            Đang kết nối hệ thống SSO...
          </p>
        </div>
      </div>
    );
  }

  // Giao diện khi có lỗi
  if (auth.error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 p-6">
        <div className="glass-panel max-w-md w-full rounded-2xl p-8 text-center border-red-500/30">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 mb-6">
            <svg
              className="h-8 w-8 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-red-400 mb-2">Lỗi xác thực</h2>
          <p className="text-slate-400 mb-6">{auth.error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all duration-200"
          >
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Giao diện khi ĐÃ ĐĂNG NHẬP
  if (auth.isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center p-6">
        {/* Background Blobs (Màu sắc ảo diệu) */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div
          className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ animationDelay: '2s' }}
        ></div>
        <div
          className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
          style={{ animationDelay: '4s' }}
        ></div>

        {/* Nội dung chính */}
        <div className="glass-panel relative max-w-3xl w-full rounded-3xl p-10 shadow-2xl z-10">
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-700/50 pb-8 mb-8">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wide mb-3 border border-blue-500/20">
                <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                Evoppa HR System
              </div>
              <h1 className="text-3xl font-bold text-white mb-1">Cổng Nhân Sự</h1>
              <p className="text-slate-400">Bạn đã xác thực thành công qua Keycloak SSO</p>
            </div>

            {/* User Profile Snippet */}
            <div className="mt-6 md:mt-0 flex items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
              <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                {auth.user?.profile.preferred_username?.charAt(0).toUpperCase() || 'U'}
              </div>
              <div className="ml-4 pr-2">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                  Xin chào,
                </p>
                <p className="text-lg font-bold text-white">
                  {auth.user?.profile.preferred_username || 'Ẩn danh'}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50 hover:bg-slate-800/50 transition-colors">
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Email Address
              </h3>
              <p className="text-white font-medium text-lg">
                {auth.user?.profile.email || 'Không có email'}
              </p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50 hover:bg-slate-800/50 transition-colors">
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                Session State
              </h3>
              <p className="text-emerald-400 font-medium text-lg flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                Active & Secured
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3">
              Access Token (Gửi xuống Backend API)
            </h3>
            <div className="relative group cursor-text">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#0b1120] p-5 rounded-xl border border-slate-700/50 overflow-x-auto h-32 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <pre className="text-xs text-slate-300 font-mono leading-relaxed">
                  {auth.user?.access_token}
                </pre>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => void auth.signoutRedirect()}
              className="py-3 px-6 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl border border-slate-700 transition-all duration-200 flex items-center group"
            >
              <svg
                className="w-5 h-5 mr-2 text-slate-400 group-hover:text-white transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              Đăng xuất hệ thống
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Giao diện khi CHƯA ĐĂNG NHẬP (Login Page)
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center p-6">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div
        className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"
        style={{ animationDelay: '2s' }}
      ></div>

      <div className="glass-panel relative max-w-lg w-full rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-center border-t border-slate-700/50 z-10">
        <div className="mx-auto w-20 h-20 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center mb-8 rotate-3 hover:rotate-6 transition-transform duration-300">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>

        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 tracking-tight">
          Evoppa HR
        </h1>
        <p className="text-slate-400 mb-10 text-base leading-relaxed">
          Đăng nhập một lần (SSO) để truy cập toàn bộ hệ sinh thái nội bộ của Evoppa một cách an
          toàn.
        </p>

        <button
          onClick={() => void auth.signinRedirect()}
          className="group relative w-full flex items-center justify-center py-4 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
        >
          <span>Đăng nhập qua Keycloak</span>
          <svg
            className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </button>

        <div className="mt-8 pt-8 border-t border-slate-800/50 text-sm text-slate-500 flex items-center justify-center">
          <svg
            className="w-4 h-4 mr-1.5 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          Secured by Keycloak OAuth 2.0
        </div>
      </div>
    </div>
  );
}

export default App;
